"""Reduce global head sway, then encode a seamless eased ping-pong cover loop.
Usage: python tools/prepare-cover.py path/to/source.mp4
Requires opencv-python, numpy, imageio-ffmpeg (optional tools/.video-deps).
"""
import sys
from pathlib import Path
import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).parent / '.video-deps'))
import imageio_ffmpeg

source = cv2.VideoCapture(sys.argv[1])
fps = source.get(cv2.CAP_PROP_FPS) or 24
frames = []
while True:
    ok, frame = source.read()
    if not ok:
        break
    frames.append(frame)
source.release()
if not frames:
    raise SystemExit('Could not read source video')
h, w = frames[0].shape[:2]
reference = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY)
points = cv2.goodFeaturesToTrack(reference, 160, .02, 12)
processed = []
for frame in frames:
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    tracked, status, _ = cv2.calcOpticalFlowPyrLK(reference, gray, points, None)
    valid = status.ravel() == 1
    transform, _ = cv2.estimateAffinePartial2D(tracked[valid], points[valid], method=cv2.RANSAC)
    if transform is not None:
        # Apply 65% of the correction: preserve natural motion without freezing it.
        identity = np.array([[1., 0., 0.], [0., 1., 0.]])
        correction = identity + .65 * (transform - identity)
        frame = cv2.warpAffine(frame, correction, (w, h), borderMode=cv2.BORDER_CONSTANT)
    processed.append(frame)
output = Path(__file__).resolve().parents[1] / 'apps/web/public/assets/video/was-cover-loop.mp4'
output.parent.mkdir(parents=True, exist_ok=True)
writer = imageio_ffmpeg.write_frames(str(output), (w, h), fps=fps, codec='libx264',
    pix_fmt_in='rgb24', pix_fmt_out='yuv420p', quality=8,
    output_params=['-movflags', '+faststart', '-an'])
writer.send(None)
count = 2 * (len(processed) - 1)
for i in range(count):
    position = (1 - np.cos(2 * np.pi * i / count)) * .5 * (len(processed) - 1)
    lo = int(position)
    hi = min(lo + 1, len(processed) - 1)
    frame = cv2.addWeighted(processed[lo], 1 - (position - lo), processed[hi], position - lo, 0)
    writer.send(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
writer.close()
cv2.imwrite(str(output.with_suffix('.jpg')), processed[0])
print(f'{output}: {count} frames at {fps} fps; {count / fps:.2f}s')
