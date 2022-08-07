export default class RandomHelper
{
    static gerRandomArrayIndex(array)
    {
        return Math.floor(Math.random()*array.length);
    }

    static getRandomArrayElement(array)
    {
        return array[RandomHelper.gerRandomArrayIndex(array)];
    }

    static getRandomObjectKeyAndValue(object)
    {
        let keys = Object.keys(object);
        let key = keys[Math.floor(Math.random()*keys.length)];
        let value = object[key];
        return {key, value};
    }

    static getRandomObjectKey(object)
    {
        let keys = Object.keys(object);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    static getRandomInt(min, max)
    {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    static getOneOrMinusOne()
    {
        return -1 + 2 * Math.round(Math.random());
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    static shuffleObject(object, limit = 0, injectValue = 0)
    {
        let objectKeys = Object.keys(object);

        let shuffledKeys = RandomHelper.shuffleArray(objectKeys);

        /*s*/console.log('shuffledKeys=', shuffledKeys); //todo r
        if (injectValue) {

        }
        if (limit) {
            shuffledKeys = shuffledKeys.slice(0, limit);
        }

        /*s*/console.log('shuffledKeys=', shuffledKeys); //todo r
        /*s*/console.log('injectValue=', injectValue); //todo r
        if (injectValue && !shuffledKeys.includes(injectValue)) {
            let key = RandomHelper.gerRandomArrayIndex(shuffledKeys);
            /*s*/console.log('key=', key); //todo r
            shuffledKeys[key] = injectValue;
        }

        let elements = [];
        for (let key in shuffledKeys) {
            /*s*/console.log('shuffledKeys[key]=', shuffledKeys[key]); //todo r
            elements.push(object[shuffledKeys[key]]);
        }

        return elements;
    }

    static getShuffledObjectKeys(object)
    {
        return RandomHelper.shuffleArray(Object.keys(object));
    }

}
