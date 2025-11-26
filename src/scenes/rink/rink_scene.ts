// src/scenes/rink/rink_scene.ts
import * as ex from 'excalibur';
import { RinkActor } from './actors/rink';
import { PuckActor } from './actors/puck';
import { CameraControllerActor } from './actors/cameracontroller';
import { getResolutionProfile } from '../../config/resolution';
import { RINK_LAYOUT } from '../../config/rink_layout';

export class RinkScene extends ex.Scene {
    private puck: PuckActor;
    private cameraController: CameraControllerActor;

    constructor() {
        super();
        
        const profile = getResolutionProfile();
        const { internalWidth, internalHeight } = profile;

        const rink = new RinkActor(internalWidth, internalHeight);
        this.add(rink);

        this.puck = new PuckActor(RINK_LAYOUT.center.x, RINK_LAYOUT.center.y);
        this.add(this.puck);

        this.cameraController = new CameraControllerActor(this.puck);
        this.add(this.cameraController);
    }

    public getCameraController(): CameraControllerActor {
        return this.cameraController;
    }
}