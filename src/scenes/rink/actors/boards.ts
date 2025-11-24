import * as ex from 'excalibur';

export class BoardsActor extends ex.Actor {
    constructor(
        private rinkWidth: number,
        private rinkHeight: number
    ) {
        super({ x: 0, y: 0 });
    }

    public onInitialize(engine: ex.Engine): void {
        const scene = engine.currentScene;

        const t = 10;
        const halfT = t / 2;

        scene.add(new ex.Actor({
            x: this.rinkWidth / 2,
            y: halfT,
            width: this.rinkWidth,
            height: t,
            collisionType: ex.CollisionType.Fixed
        }));

        scene.add(new ex.Actor({
            x: this.rinkWidth / 2,
            y: this.rinkHeight - halfT,
            width: this.rinkWidth,
            height: t,
            collisionType: ex.CollisionType.Fixed
        }));

        scene.add(new ex.Actor({
            x: halfT,
            y: this.rinkHeight / 2,
            width: t,
            height: this.rinkHeight,
            collisionType: ex.CollisionType.Fixed
        }));

        scene.add(new ex.Actor({
            x: this.rinkWidth - halfT,
            y: this.rinkHeight / 2,
            width: t,
            height: this.rinkHeight,
            collisionType: ex.CollisionType.Fixed
        }));
    }
}