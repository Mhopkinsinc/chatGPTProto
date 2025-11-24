import * as ex from 'excalibur';

import { RinkActor } from './actors/rink';
import { BoardsActor } from './actors/boards';
import { PuckActor } from './actors/puck';
import { CameraControllerActor } from './actors/cameracontroller';

import { BASE_WIDTH, BASE_HEIGHT } from '../../main';

export class RinkScene extends ex.Scene {
    private puck!: PuckActor;

    public onInitialize(engine: ex.Engine): void {
        const rink = new RinkActor(BASE_WIDTH, BASE_HEIGHT);
        this.add(rink);

        const boards = new BoardsActor(BASE_WIDTH, BASE_HEIGHT);
        this.add(boards);

        this.puck = new PuckActor(BASE_WIDTH / 2, BASE_HEIGHT / 2);
        this.add(this.puck);

        const cameraController = new CameraControllerActor(this.puck);
        this.add(cameraController);

        this.camera.pos = new ex.Vector(BASE_WIDTH / 2, BASE_HEIGHT / 2);
    }
}