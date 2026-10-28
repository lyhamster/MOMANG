export default class SensesComparator{
    sensesA: string[];
    sensesB: string[];
    
    constructor(sensesA: string[],  sensesB: string[]) {
        this.sensesA = sensesA;
        this.sensesB = sensesB;
    }

    makeComparison () {
        return this.sensesA.some(sense => this.sensesB?.includes(sense));
    }
}