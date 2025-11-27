
import * as ex from 'excalibur';
import { RinkScene } from './scenes/rink/rink_scene';
import { loader } from './resources';
import { applyBestIntegerScale, getResolutionProfile } from './config/resolution';

const profile = getResolutionProfile();
const gameEngine = new ex.Engine({
  width: profile.internalWidth,
  height: profile.internalHeight,
  displayMode: ex.DisplayMode.Fixed,
  antialiasing: false,
  pixelArt: true,
  suppressHiDPIScaling: true
});

//gameEngine.toggleDebug()
//gameEngine.debug.entity.showName = true

// Apply best integer scale using the resolution config logic
applyBestIntegerScale(gameEngine);
window.addEventListener('resize', () => applyBestIntegerScale(gameEngine));

gameEngine.add('rink', new RinkScene());
gameEngine.goToScene('rink');
gameEngine.start(loader);