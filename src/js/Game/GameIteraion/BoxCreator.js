import Box from "../Objects/ConcreteObjects/Box";
import GameFieldInfo from "../GameFieldInfo";
import QuestionsMain from "../../Questions/QuestionsMain";
import RandomHelper from "../../helpers/RandomHelper";

export default class BoxCreator {

    static boxCreatingMods = {
        falling: 'Falling boxes',
        static: 'Random & static',
        randomMoving: 'Random & moving'
    };

    lastObjectId = 1;
    boxAppearType = 'randomMoving';

    static _instance;

    constructor() {
        if (BoxCreator._instance) {
            return BoxCreator._instance
        }

        BoxCreator._instance = this;

        this.dificulty = 1;
        this.maxDiffuculty = 30;

        this.gameFieldInfo = new GameFieldInfo();
        this.questionsHelper = new QuestionsMain();
    }

    setBoxAppearType(mode = 'static')
    {
        this.boxAppearType = mode;
    }

    createBox(gameObjects, callerContext)
    {
        this.lastObjectId++;

        let box, x, y, xspeed, yspeed;

        let questionOptions = this.questionsHelper.options;
        let {key, value} = RandomHelper.getRandomObjectKeyAndValue(questionOptions)

        let boxText = value.text;

        switch (this.boxAppearType) {
            case 'falling':
                x = this.gameFieldInfo.getRandomX(Box.defaultWidth);

                yspeed = 40 + Math.sqrt(this.dificulty) * 2;
                box = new Box(boxText, x, 0, 0, yspeed);
                box.settings.initialAnimationX = false;
                box.settings.initialAnimationY = true;
                box.doInitialActions();

                break;
            case 'static':
                x = this.gameFieldInfo.getRandomX(Box.defaultWidth);
                y = this.gameFieldInfo.getRandomY(Box.defaultHeight);
                box = new Box(boxText, x, y, 0, 0);
                box.settings.initialAnimationX = false;
                box.settings.initialAnimationY = false;
                box.doInitialActions();
                let evadeTime = Math.floor(13 + 25 / (2 + this.dificulty));
                callerContext.addTimeout(callerContext.destroyGameObject, evadeTime, false, false, {id: this.lastObjectId});
                break;
            case 'randomMoving':
                x = this.gameFieldInfo.getRandomX(Box.defaultWidth);
                y = this.gameFieldInfo.getRandomY(Box.defaultHeight);

                let maxSpeed = 4 + Math.sqrt(this.dificulty);
                xspeed = RandomHelper.getRandomInt(3, maxSpeed) * RandomHelper.getOneOrMinusOne();
                yspeed = RandomHelper.getRandomInt(3, maxSpeed) * RandomHelper.getOneOrMinusOne();
                box = new Box(boxText, x, y, xspeed, yspeed);
                box.settings.initialAnimationX = false;
                box.settings.initialAnimationY = false;
                box.doInitialActions();
                callerContext.addTimeout(callerContext.destroyGameObject, 30, false, false, {id: this.lastObjectId});

                break;
        }

        box.optionId = value.id;

        return {...gameObjects, [this.lastObjectId]: box}
    }

    randomlyChangeBoxAppearType()
    {
        this.setBoxAppearType(RandomHelper.getRandomObjectKey(BoxCreator.boxCreatingMods));
    }

    incrementDifficulty()
    {
        if (this.dificulty < this.maxDiffuculty) {
            this.dificulty++;
        }
    }
}
