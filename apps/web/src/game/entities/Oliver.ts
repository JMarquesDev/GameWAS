import Phaser from 'phaser';
import { usePreferences } from '../preferences';
import { breathScale, facingForMovement, type Facing } from './oliverMotion';

function casualScene(scene: Phaser.Scene) { return ['cenario-07', 'cenario-08'].includes(String(scene.sys.settings.key)); }

export function preloadOliver(scene: Phaser.Scene) {
  const casual = casualScene(scene);
  const sideKey = casual ? 'oliver-casual' : 'oliver-ciano';
  const frontKey = casual ? 'oliver-casual-front' : 'oliver-front';
  const backKey = casual ? 'oliver-casual-back' : 'oliver-back';
  if (!scene.textures.exists(sideKey)) {
    scene.load.image(sideKey, casual ? '/assets/characters/oliver-casual-walk-v1.png' : '/assets/characters/oliver-ciano-walk-v1.png');
  }
  if (!scene.textures.exists(frontKey)) scene.load.image(frontKey, casual ? '/assets/characters/oliver-casual-front-v1.png' : '/assets/characters/oliver-front-v1.png');
  if (!scene.textures.exists(backKey)) scene.load.image(backKey, casual ? '/assets/characters/oliver-casual-back-v1.png' : '/assets/characters/oliver-back-v1.png');
  if (!casual && !scene.textures.exists('oliver-side-idle')) scene.load.image('oliver-side-idle', '/assets/characters/oliver-side-idle-v1.png');
}

export function createOliver(scene: Phaser.Scene) {
  const casual = casualScene(scene);
  const textureKey = casual ? 'oliver-casual' : 'oliver-ciano';
  const frontKey = casual ? 'oliver-casual-front' : 'oliver-front';
  const backKey = casual ? 'oliver-casual-back' : 'oliver-back';
  const texture = scene.textures.get(textureKey);
  // Recortes da folha original; trim alinha o corpo sem modificar a arte.
  const frames = casual
    ? [0, 1, 2].map(index => ({ x: index * 512, width: 512, offset: 104 }))
    : [{ x: 0, width: 450, offset: 115 }, { x: 450, width: 495, offset: 50 }, { x: 945, width: 591, offset: 105 }];
  frames.forEach((frame, index) => {
    if (!texture.has(String(index))) {
      texture.add(String(index), 0, frame.x, 0, frame.width, 1024)
        ?.setTrim(720, 1024, frame.offset, 0, frame.width, 1024);
    }
  });
  const sideWalkKey = `${textureKey}-walk`;
  if (!scene.anims.exists(sideWalkKey)) {
    scene.anims.create({ key: sideWalkKey, frames: ['0', '1', '0', '2'].map(frame => ({ key: textureKey, frame })), frameRate: 7, repeat: -1 });
  }
  const directionalOffsets = casual ? [104, 104, 104] : undefined;
  for (const [key, offsets] of [[frontKey, directionalOffsets ?? [57, 105, 145]], [backKey, directionalOffsets ?? [72, 100, 149]]] as const) {
    const sheet = scene.textures.get(key);
    offsets.forEach((offset, index) => {
      if (!sheet.has(String(index))) sheet.add(String(index), 0, index * 512, 0, 512, 1024)?.setTrim(720, 1024, offset, 0, 512, 1024);
    });
    if (!scene.anims.exists(`${key}-walk`)) {
      scene.anims.create({ key: `${key}-walk`, frames: ['1', '0', '2', '0'].map(frame => ({ key, frame })), frameRate: 7, repeat: -1 });
    }
  }
  const shadow = scene.add.ellipse(0, -3, 65, 12, 0x241b16, 0.24);
  const sprite = scene.add.sprite(0, 0, casual ? textureKey : 'oliver-side-idle', casual ? '0' : undefined).setOrigin(0.5, 0.975).setScale(0.165);
  const container = scene.add.container(170, 490, [shadow, sprite]);
  container.setData('sprite', sprite);
  container.setData('outfit', casual ? 'casual' : 'medical');
  container.setData('facing', 'right');
  container.setData('breathTime', 0);
  return container;
}

export function animateOliver(oliver: Phaser.GameObjects.Container, dx: number, dy = 0, delta = 16, paused = false) {
  const sprite = oliver.getData('sprite') as Phaser.GameObjects.Sprite;
  const casual = oliver.getData('outfit') === 'casual';
  const sideKey = casual ? 'oliver-casual' : 'oliver-ciano';
  const frontKey = casual ? 'oliver-casual-front' : 'oliver-front';
  const backKey = casual ? 'oliver-casual-back' : 'oliver-back';
  const previous = oliver.getData('facing') as Facing;
  const facing = facingForMovement(dx, dy, previous);
  oliver.setData('facing', facing);
  const texture = facing === 'front' ? frontKey : facing === 'back' ? backKey : sideKey;
  const animation = texture === sideKey ? `${sideKey}-walk` : `${texture}-walk`;
  const moving = Math.hypot(dx, dy) >= 0.01;
  sprite.setFlipX(facing === 'left');
  if (moving) {
    sprite.setOrigin(0.5, 0.955).setScale(0.30);
    sprite.play(animation, true);
    sprite.anims.timeScale = usePreferences.getState().speed / 180;
    oliver.setData('breathTime', 0);
  } else {
    sprite.stop();
    const lateral = facing === 'left' || facing === 'right';
    const idleTexture = lateral ? (casual ? sideKey : 'oliver-side-idle') : texture;
    const idleFrame = lateral && !casual ? undefined : '0';
    if (sprite.texture.key !== idleTexture || (idleFrame !== undefined && sprite.frame.name !== idleFrame)) sprite.setTexture(idleTexture, idleFrame);
    // A pose lateral tem resolução maior; normaliza altura e apoio dos pés.
    const baseScale = lateral ? 0.165 : 0.30;
    sprite.setOrigin(0.5, lateral ? 0.975 : 0.955);
    const elapsed = (oliver.getData('breathTime') as number) + Math.min(delta, 50);
    oliver.setData('breathTime', elapsed);
    const scale = breathScale(elapsed, !paused && !usePreferences.getState().reducedMotion);
    sprite.setScale(baseScale * scale.x, baseScale * scale.y);
  }
}
