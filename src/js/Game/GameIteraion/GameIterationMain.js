import Box from "../Objects/ConcreteObjects/Box";
import GameFieldInfo from "../GameFieldInfo";
import BoxCreator from "./BoxCreator";
import QuestionsMain from "../Questions/QuestionsMain";
export default class GameIterationMain {




    constructor() {
        this.gameFieldInfo = new GameFieldInfo();
        this.boxCreator = new BoxCreator();
        this.questionHelper = new QuestionsMain();

        this.boxCreator.addTimeout = this.addTimeout.bind(this);
        this.boxCreator.destroyGameObject = this.destroyGameObject.bind(this);

        this.settings = {
            timeScale: 1,
            incrementDifficulty: true
        }

        this.lastObjectId = 1;
        this.lastTimoutId = 1;

        this.gameObjects = {
            // 1: new Box('ititial', 100, 0, 0, 40)
        }

        // this.timeouts = {
        //     1: {
        //         action: this.createBox.bind(this),
        //         payload: {},
        //         timeLeft: 10,
        //         repeat: true,
        //         repeatTime: 10
        //     },
        //     2: {
        //         action: this.questionHelper.randomlyChangeCurrentQuestion.bind(this.questionHelper),
        //         payload: {},
        //         timeLeft: 100,
        //         repeat: true,
        //         repeatTime: 100
        //     }
        // };

        // randomlyChangeBoxAppearType

        this.timeouts = {};

        this.addTimeout(this.createBox.bind(this), 10, true);
        this.addTimeout(this.questionHelper.randomlyChangeCurrentQuestion.bind(this.questionHelper), 100, true);
        this.addTimeout(this.boxCreator.randomlyChangeBoxAppearType.bind(this.boxCreator), 100, true);

        if (this.settings.incrementDifficulty) {
            // this.addTimeout(this.boxCreator.incrementDifficulty.bind(this.boxCreator), 400, true);
            this.addTimeout(this.boxCreator.incrementDifficulty.bind(this.boxCreator), 200, true);
        }

        this.gameState = {
            // boxAppearType: 'falling'
            boxAppearType: 'static'
        };
    }

    createBox()
    {
        this.gameObjects = this.boxCreator.createBox(this.gameObjects, this);
    }

    destroyGameObject(payload)
    {
        delete this.gameObjects[payload.id];
    }

    startMainIteration() {
        this.gameObjects = {
            1: new Box(true)
        }
    }

    addTimeout(action, timeLeft, repeat = false, repeatTime = false, payload = {})
    {
        this.lastTimoutId++;

        if (repeat && repeatTime === false) {
            repeatTime = timeLeft;
        }

        this.timeouts[this.lastTimoutId] = {
            action: action.bind(this),
            payload,
            timeLeft,
            repeat,
            repeatTime
        };
    }

    handleTimeouts()
    {
        for (let intervalIndex in this.timeouts) {
            if (!this.timeouts.hasOwnProperty(intervalIndex)) {
                continue;
            }
            let currentTimeout = this.timeouts[intervalIndex];

            currentTimeout.timeLeft -= 1 * this.settings.timeScale;
            if (currentTimeout.timeLeft < 1) {
                currentTimeout.action(currentTimeout.payload);
                if (currentTimeout.repeat) {
                    if (!this.timeouts.hasOwnProperty(intervalIndex) || !this.timeouts[intervalIndex].hasOwnProperty('timeLeft')) {
                        continue;
                    }
                    this.timeouts[intervalIndex].timeLeft = currentTimeout.repeatTime;
                } else {
                    delete this.timeouts[intervalIndex];
                }
            }
        }
    }

    applyGameIteration() {
            let newGameObjects = {};

            // let gameObjects = this.gameObjects;

            this.handleTimeouts();
            for (let boxIndex in this.gameObjects) {
                // let boxProto = this.gameObjects[boxIndex];
                //
                // let box = Object.assign(Object.create(Object.getPrototypeOf(this.gameObjects[boxIndex])), boxProto)

                this.gameObjects[boxIndex].applyGameIteration();
                if (this.gameObjects[boxIndex].willBeDestroyed) {
                    delete this.gameObjects[boxIndex];
                } else {
                    newGameObjects[boxIndex] = this.gameObjects[boxIndex];
                }
            }



            let newQuestionText = this.questionHelper.currentQuestion.text;
            return {newGameObjects, newQuestionText};
        //
        //     /*s*/console.log('newGameObjects=', JSON.stringify(newGameObjects[1].physicalProperties.x)); //todo r
        //     // gameObjects = newGameObjects;
        //     gameData.gameObjects = newGameObjects;
        //     //
        //     return gameData;
        // return gameObjects;
    }
}
