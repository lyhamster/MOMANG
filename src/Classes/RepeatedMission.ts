import Debugger from "./Debugger";
import Mission from "./Mission";

export default class RepeatedMission extends Mission {
    repeatedActivity = 0; 

    constructor (activityLabel: string, completionCriteria: number, bonusPoint: number, activityRelated: string) {
        super(activityLabel, completionCriteria, "repeatedMission", bonusPoint, activityRelated);
    }

    getInstruction() {
        return `${this.activityLabel} ${this.completionCriteria} fois de suite.`;
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onMissionCompleted: Function, onProgressionUpdate: Function) {
        if (currentActivity === this.activityRelated) {
            this.repeatedActivity++
            onProgressionUpdate();
            if (this.repeatedActivity === this.completionCriteria) {
                playerScore += this.bonusPoint;
                Debugger.log("playerScore", playerScore);
                onMissionCompleted();
                this.resetMission();
                return;
            }
        } else {
            this.resetMission();
        }
    }

    displayMissionProgression(): string {
        return `${this.repeatedActivity} / ${this.completionCriteria}`;
    }

    resetMission() {
        this.repeatedActivity = 0;
    }
}