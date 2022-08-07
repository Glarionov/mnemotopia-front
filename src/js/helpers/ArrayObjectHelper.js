export default class ArrayObjectHelper
{
    static getLastArrayIndex(array)
    {
        return array.length - 1;
    }

    static getLastArrayElement(array)
    {
        return array[ArrayObjectHelper.getLastArrayIndex(array)];
    }

    static checkIfIndexIsLast(array, index)
    {
        return index === ArrayObjectHelper.getLastArrayIndex(array);
    }

    static checkIfElementIsLast(array, element)
    {
        return element === ArrayObjectHelper.getLastArrayElement(array);
    }
}