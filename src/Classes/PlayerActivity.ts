import CommonActivity from "./CommonActivity.js";

export default class PlayerActivity extends CommonActivity {
    score: number;
    fixedDuration: number;

    constructor(label: string, senses: string[], score: number, fixedDuration: number) {
        super(label, senses);
        this.score = score;
        this.fixedDuration = fixedDuration;
    }
} 
