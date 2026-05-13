export default class SensesComparator{
    sensesA: [];
    sensesB: [];
    constructor(sensesA: [],  sensesB: []) {
        this.sensesA = sensesA;
        this.sensesB = sensesB;
    }

    makeComparison () {
        return this.sensesA.some(sense => this.sensesB.includes(sense));
    }
}