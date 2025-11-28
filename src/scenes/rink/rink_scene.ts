// src/scenes/rink/rink_scene.ts
import * as ex from 'excalibur';
import { RinkActor } from './actors/rink';
import { PuckActor } from './actors/puck';
import { CameraControllerActor } from './actors/cameracontroller';
import { getResolutionProfile } from '../../config/resolution';
import { RINK_LAYOUT } from '../../config/rink_layout';
import { PlayerActor } from './actors/player';

export class RinkScene extends ex.Scene {
    private puck: PuckActor;
    private cameraController: CameraControllerActor;
    private player: PlayerActor;

    constructor() {
        super();
        
        const profile = getResolutionProfile();
        const { internalWidth, internalHeight } = profile;

        const rink = new RinkActor(internalWidth, internalHeight);
        this.add(rink);

        this.player = new PlayerActor(RINK_LAYOUT.center.x, RINK_LAYOUT.center.y);
        this.add(this.player);

        this.puck = new PuckActor(RINK_LAYOUT.center.x, RINK_LAYOUT.center.y);
        this.add(this.puck);

        this.cameraController = new CameraControllerActor(this.player);
        this.add(this.cameraController);
    }

    public getCameraController(): CameraControllerActor {
        return this.cameraController;
    }
}