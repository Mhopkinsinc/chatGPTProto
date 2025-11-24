import * as ex from 'excalibur';

import { RinkActor } from './actors/rink';
import { BoardsActor } from './actors/boards';
import { PuckActor } from './actors/puck';
import { CameraControllerActor } from './actors/cameracontroller';

import { getResolutionProfile } from '../../config/resolution';
import { Resources } from '../../resources';

export class RinkScene extends ex.Scene {
    private puck!: PuckActor;

    public onInitialize(engine: ex.Engine): void {
        const profile = getResolutionProfile();
        const { internalWidth, internalHeight } = profile;

        const rink = new RinkActor(internalWidth, internalHeight);
        this.add(rink);

        const boards = new BoardsActor(internalWidth, internalHeight);
        this.add(boards);

        this.puck = new PuckActor(internalWidth / 2, internalHeight / 2);
        this.add(this.puck);

        const cameraController = new CameraControllerActor(this.puck);
        this.add(cameraController);

        this.camera.pos = new ex.Vector(internalWidth / 2, internalHeight / 2);
    }
}