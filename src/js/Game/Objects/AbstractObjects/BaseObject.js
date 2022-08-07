import GameFieldInfo from "../../GameFieldInfo";

// class ScaleHelper {
//     xScale = 1;
//     yScale = 1;
// }

export default class BaseObject {
    constructor() {

        this.scaleHelper = new GameFieldInfo();

        this.willBeDestroyed = false;

        this.settings = {
            constantSize: true,
            simpleSize: true,
            affectedByGravity: true,
        }

        this.style = {
            position: 'absolute',
        };

        this.pStyle = {
            marginTop: 0,
            marginLeft: 0,
        }

        // this.x = x;
        // this.y = y;

        this.physicalProperties = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            xspeed: 0,
            yspeed: 0
        }



        this.doInitialActions();


        // this.speed = {
        //     horizontal: 0,
        //     vertical: 0
        // };
    }

    doInitialActions() {
        if (this.settings.constantSize) {
            this.style.width = this.physicalProperties.width * this.scaleHelper.xScale;
            this.style.height = this.physicalProperties.height * this.scaleHelper.yScale;
        }

        // this.style.marginLeft = this.physicalProperties.x * this.scaleHelper.xScale;
        // this.style.marginTop = this.physicalProperties.y * this.scaleHelper.yScale;
        this.changeStyleByPhysicalProperties();
    }

    changeStyleByPhysicalProperties() {
        let newStyle = {...this.style};



        newStyle.marginLeft = Math.round(this.physicalProperties.x * this.scaleHelper.xScale);
        newStyle.marginTop = Math.round(this.physicalProperties.y * this.scaleHelper.yScale);

        // todo u
        this.pStyle = newStyle;

        // this.text = newStyle.marginTop;
        // TweenLite.to(this.movingBoxesRefs[boxKey],
        //     this.data.animationFrequencyMs,
        //     {
        //         marginLeft: newStyle.marginLeft,marginTop: newStyle.marginTop, ease: "linear"});


        // this.style.marginLeft = this.physicalProperties.x * this.scaleHelper.xScale;
        // this.style.marginTop = this.physicalProperties.y * this.scaleHelper.yScale;
    }

    applyGameIteration() {
    }

// {text: 'text', style: {width: 100, height: 100, backgroundColor: 'orange'}}
}