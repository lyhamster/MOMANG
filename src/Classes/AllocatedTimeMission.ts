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

    override initializeCompletion(onCompletedMission: Function, onProgression: Function) {
        this.completionCriteriaCount = this.completionCriteria;
        this.timer = setInterval(() => {
            if (typeof this.completionCriteriaCount === "number") {
                this.completionCriteriaCount--;
                onProgression();
                if (this.completionCriteriaCount === 0) {
                    onCompletedMission();
                    this.resetMission();
                }
            }
        }, this.missionTick);
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onCompletedMission: Function) {
        if (currentActivity === this.activityRelated) {
            playerScore += this.bonusPoint;
            onCompletedMission();
            this.resetMission();
        }
    }

    resetMission() {
        clearInterval(this.timer);
        this.timer = 0;
        return;
    }

    displayMissionProgression(): string {
        return `${this.completionCriteriaCount}`;
    }
}