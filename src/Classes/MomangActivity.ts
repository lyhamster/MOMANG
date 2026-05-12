import CommonActivity from "./CommonActivity.js";

export default class MomangActivity extends CommonActivity  {
    givenDuration: number;

    constructor(label: string, senses: string[], givenDuration: number) {
        super(label, senses);
        this.givenDuration = givenDuration;
    }
}