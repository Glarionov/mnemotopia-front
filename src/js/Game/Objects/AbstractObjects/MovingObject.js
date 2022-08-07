import BaseObject from "./BaseObject";
import gameFieldInfo from "../../GameFieldInfo";
import GameFieldInfo from "../../GameFieldInfo";

export default class MovingObject extends BaseObject{
    constructor() {
        super();

        this.gameFieldInfo = new GameFieldInfo();

        this.settings = {
            ...this.settings,
            moving: true,
            affectedByGravity: true,
            bouncing: true,
            bouncingSpeed: -30,
            floor: this.gameFieldInfo.y,
            destroyWhenOutside: true,
            destroyOnTouch: true,
            initialAnimationX: false,
            initialAnimationY: false
        }


        this.physicalProperties = {
            ...this.physicalProperties,
            xspeed: 0,
            yspeed: 0,
            terminalVelocity: 10
        }
    }

    moveByCurrentSpeed() {
        this.physicalProperties.x += this.physicalProperties.xspeed;
        this.physicalProperties.y += this.physicalProperties.yspeed;

        this.changeStyleByPhysicalProperties();
    }

    isOutSide() {
        if (this.physicalProperties.x > this.gameFieldInfo.x ||
            this.physicalProperties.x + this.physicalProperties.window < 0 ||
            this.physicalProperties.y > this.gameFieldInfo.y ||
            this.physicalProperties.y + this.physicalProperties.height < 0) {
            return true;
        }
        return false;
    }

    applyGameIteration() {

        super.applyGameIteration();
        if (this.settings.affectedByGravity) {
            if (this.physicalProperties.yspeed < this.physicalProperties.terminalVelocity) {
                this.physicalProperties.yspeed += 1;
            }
        }

        this.moveByCurrentSpeed();

        if (this.settings.bouncing) {
            // /*s*/console.log('this.physicalProperties.y=', this.physicalProperties.y); //todo r
            // /*s*/console.log('this.physicalProperties.height=', this.physicalProperties.height); //todo r
            // /*s*/console.log('this.physicalProperties.y + this.physicalProperties.height=', this.physicalProperties.y + this.physicalProperties.height); //todo r
            //
            // /*s*/console.log('this.settings.floor=', this.settings.floor); //todo r
            //
            // /*s*/console.log('this.style.marginTop=', this.style.marginTop); //todo r
            // /*s*/console.log('this.style.height=', this.style.height); //todo r
            if (this.physicalProperties.y + this.physicalProperties.height> this.settings.floor) {
                // /*s*/console.log('this.scaleHelper.yScale=', this.scaleHelper.yScale); //todo r
                // alert("BOUNCE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                this.physicalProperties.yspeed = this.settings.bouncingSpeed;
            }
        }

        if (this.settings.destroyWhenOutside && this.isOutSide()) {
            this.willBeDestroyed = true;
        }
    }

// {text: 'text', style: {width: 100, height: 100, backgroundColor: 'orange'}}
}