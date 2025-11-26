// src/scenes/rink/actors/cameracontroller.ts
import * as ex from 'excalibur';
import { PuckActor } from './puck';
import { RINK_LAYOUT } from '../../../config/rink_layout';

export class CameraControllerActor extends ex.Actor {
    private lerpFactor = 0.1;
    
    // Camera Y offset system
    private yLeader = 60;                    // Initial offset (pixels behind puck)
    private readonly MAX_Y_LEADER = 40;
    private readonly MIN_Y_LEADER = -40;
    private readonly Y_LEADER_ADJUST_SPEED = 1;  // How fast yLeader changes per frame
    
    // Which goal is being attacked: true = top goal, false = bottom goal
    private attackingTopGoal = false;

    constructor(private target: PuckActor) {
        super({ x: 0, y: 0 });
    }

    public setAttackingTopGoal(attacking: boolean): void {
        this.attackingTopGoal = attacking;
    }

    public onPostUpdate(engine: ex.Engine): void {
        if (!this.target) return;

        const scene = engine.currentScene;
        const cam = scene.camera;
        const targetPos = this.target.getExactPos();
        const currentPos = cam.pos;

        // Update yLeader based on which goal is being attacked
        if (this.attackingTopGoal) {
            // Attacking top goal: increase yLeader toward MAX
            if (this.yLeader < this.MAX_Y_LEADER) {
                this.yLeader += this.Y_LEADER_ADJUST_SPEED;
            }
        } else {
            // Attacking bottom goal: decrease yLeader toward MIN
            if (this.yLeader > this.MIN_Y_LEADER) {
                this.yLeader -= this.Y_LEADER_ADJUST_SPEED;
            }
        }

        // Calculate camera target with Y offset
        const cameraTargetX = targetPos.x;
        const cameraTargetY = targetPos.y + this.yLeader;

        const cameraTarget = new ex.Vector(cameraTargetX, cameraTargetY);
        const newPos = currentPos.add(cameraTarget.sub(currentPos).scale(this.lerpFactor));

        // Get viewport size
        const halfW = engine.drawWidth / 2;
        const halfH = engine.drawHeight / 2;

        // Calculate camera bounds
        const minX = RINK_LAYOUT.xMin + halfW;
        const maxX = RINK_LAYOUT.xMax - halfW;
        const minY = RINK_LAYOUT.yMin + halfH;
        const maxY = RINK_LAYOUT.yMax - halfH;

        // Clamp camera position
        if (minX < maxX) {
            cam.pos.x = Math.max(minX, Math.min(maxX, newPos.x));
        } else {
            cam.pos.x = 0;
        }

        if (minY < maxY) {
            cam.pos.y = Math.max(minY, Math.min(maxY, newPos.y));
        } else {
            cam.pos.y = 0;
        }
    }

    // Call this on faceoffs to reset the offset
    public resetYLeader(): void {
        this.yLeader = 60;
    }
}