import Debugger from "./Debugger";
import Mission from "./Mission";

export default class RepeatedMission extends Mission {
    repeatedActivity = 0; 

    constructor (missionLabel: string, completionCriteria: number, bonusPoint: number, activityRelated: string) {
        super(missionLabel, completionCriteria,  "repeatedMission", bonusPoint, activityRelated)
    }

    displayInstruction() {
        return `${this.missionLabel} ${this.completionCriteria} fois de suite.`;
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onFinish: Function) {
        if (currentActivity === this.activityRelated) {
            this.repeatedActivity++;
            console.log(this.repeatedActivity)
            if (this.repeatedActivity === this.completionCriteria) {
                playerScore += this.bonusPoint;
                Debugger.log("playerScore", playerScore);
                onFinish();
                this.resetMission();
                return
            }
        } else {
            this.resetMission();
        }
    }

    displayMissionProgression() {
        return `${this.repeatedActivity} / ${this.completionCriteria}`;
    }

    resetMission() {
        this.repeatedActivity = 0;
    }
}