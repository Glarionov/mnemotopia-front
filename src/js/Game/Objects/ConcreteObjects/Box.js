import BaseObject from "../AbstractObjects/BaseObject";
import MovingObject from "../AbstractObjects/MovingObject";
import gameFieldInfo from "../../GameFieldInfo";
import GameFieldInfo from "../../GameFieldInfo";

export default class Box extends MovingObject{
    text = 'classText';
    static defaultWidth = 200;
    static defaultHeight = 100;

    constructor(text, x, y, xspeed = 0, yspeed = 0) {
        super();

        let gameFieldInfo = new GameFieldInfo();

        if (gameFieldInfo.xScale * Box.defaultWidth > 150) {
            Box.defaultWidth = 150 / gameFieldInfo.xScale;
        }

        if (gameFieldInfo.yScale * Box.defaultHeight > 100) {
            Box.defaultHeight = 100 / gameFieldInfo.yScale;
        }

        this.targetX = (xspeed * 100 + x) * gameFieldInfo.xScale;
        this.targetY = (yspeed * 100 + y) * gameFieldInfo.yScale;

        this.style = {
            ...this.style,
            // width: 100, height: 100,
            backgroundColor: '#ffcd83',
            // backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            flex: 1,
            display: 'flex',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'rgba(0,0,0, 0.1)',
            zIndex: 1
            // border: 1px solid rgba(0,0,0, 0.1);
            // marginTop: 10,
            // marginRight: 10,
        };

        this.physicalProperties = {
            ...this.physicalProperties,
            x,
            y,
            xspeed,
            yspeed,
            width: Box.defaultWidth,
            height: Box.defaultHeight
        }

        this.doInitialActions();

        this.settings.affectedByGravity = false;
        this.settings.bouncing = false;
        this.text = text;

        // this.text = this.settings.floor.toString() + '|' + this.scaleHelper.height;
    }

    applyGameIteration() {
        super.applyGameIteration();
        // this.text = this.physicalProperties.y + '|' + this.style.marginTop + '|' + this.scaleHelper.yScale;
        // this.text = this.style.marginTop;
    }

    touchAction() {
        if (this.settings.destroyOnTouch) {
            this.willBeDestroyed = true;
        }
    }
}