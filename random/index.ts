export function getRandomNumber(minValue:number = 0, maxValue:number = 100) {
    const min:number = Math.ceil(minValue);
    const max:number = Math.ceil(maxValue);
    return Math.floor(Math.random() * (max - min + 1) + min);
}