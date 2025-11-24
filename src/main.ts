import * as ex from 'excalibur';
import { RinkScene } from './scenes/rink/rink_scene';
import { loader } from './resources';

export const BASE_WIDTH = 320;
export const BASE_HEIGHT = 224;

const engine = new ex.Engine({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  displayMode: ex.DisplayMode.Fixed,
  antialiasing: false,
  pixelArt: true,
  suppressHiDPIScaling: true
});

function applyBestIntegerScale() {
  const canvas = engine.canvas;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const maxScaleX = Math.floor(screenW / BASE_WIDTH);
  const maxScaleY = Math.floor(screenH / BASE_HEIGHT);
  let scale = Math.min(maxScaleX, maxScaleY);
  if (scale < 1) scale = 1;

  canvas.style.width = `${BASE_WIDTH * scale}px`;
  canvas.style.height = `${BASE_HEIGHT * scale}px`;
  canvas.style.imageRendering = 'pixelated';
}

applyBestIntegerScale();
window.addEventListener('resize', applyBestIntegerScale);

engine.add('rink', new RinkScene());
engine.goToScene('rink');
engine.start(loader);