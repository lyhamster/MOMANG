export default class CommonActivity {
    label: string; 
    #senses: string[];

    constructor (label: string, senses: string[]) {
        this.label = label;
        this.#senses = senses;
    }
    
    public get sensesArr() {
        return this.#senses;
    }
}