import Mission from "./Mission";

export default class AllocatedTimeMission extends Mission {
    missionTick = 1000;
    timer =  0;
    completionCriteriaCount: string | number = 0;

    constructor (activityLabel: string, completionCriteria: number, bonusPoint: number, activityRelated: string) {
        super(activityLabel, completionCriteria, "allocatedTimeMission", bonusPoint, activityRelated);
    }

    getInstruction() {
        return `${this.activityLabel} dans les ${this.completionCriteria} prochaines secondes.`;
    }

    override initializeCompletion(onCompletion: Function) {
        this.completionCriteriaCount = this.completionCriteria;
        this.timer = setInterval(() => {
            if (typeof this.completionCriteriaCount === "number") {
                this.completionCriteriaCount--;
                if (this.completionCriteriaCount === 0) {
                    this.resetMission();
                    onCompletion();
                }
            }
        }, this.missionTick);
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onCompletion: Function) {
        if (currentActivity === this.activityRelated) {
            this.resetMission();
            playerScore += this.bonusPoint;
            onCompletion();
        }
    }

    resetMission() {
        clearInterval(this.timer);
        this.timer = 0;
        return;
    }

    displayMissionProgression() {
        return this.completionCriteria;
    }
}