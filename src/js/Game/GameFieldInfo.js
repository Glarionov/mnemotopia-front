import {Dimensions} from "react-native";

export default class {
    screenWidth = Dimensions.get('screen').width;
    screenHeight = Dimensions.get('screen').height;

    constructor() {
        this.xScale = Dimensions.get('window').width / 1000;
        this.yScale = Dimensions.get('window').height / 1000;

        this.x = 950;
        this.y = 800;

        this.width = this.x * this.xScale;
        this.height = this.y * this.yScale;
    }

    getRandomX(rightBorderLimit = 0) {
        return Math.floor(Math.random() * (this.x - rightBorderLimit));
    }

    getRandomY(bottomBorderLimit = 0) {
        return Math.floor(Math.random() * (this.y - bottomBorderLimit));
    }
}
