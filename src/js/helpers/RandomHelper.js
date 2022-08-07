export default class ArrayHelper
{
    static getRandomArrayElement(array)
    {
        return array[Math.floor(Math.random()*array.length)];
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
}
