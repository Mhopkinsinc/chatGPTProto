// src/resources.ts
import * as ex from 'excalibur';


export const Resources = {
  puck: new ex.ImageSource('./images/puck.png'),
  rinkBg: new ex.ImageSource('./images/rink_full_map.png')
};

export const loader = new ex.Loader();

for (const res of Object.values(Resources)) {
  loader.addResource(res);
}