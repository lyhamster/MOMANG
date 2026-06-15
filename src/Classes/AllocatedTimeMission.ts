import Mission from "./Mission";

export default class AllocatedTimeMission extends Mission {
    missionTick = 1000;
    chrono =  0;
    constructor (missionLabel: string, completionCriteria: number, bonusPoint: number, activityRelated: string) {
        super(missionLabel, completionCriteria, "allocatedTimeMission", bonusPoint, activityRelated);
    }

    displayInstruction() {
        return `${this.missionLabel} dans les ${this.completionCriteria} prochaines secondes.`
    }

    override initializeCompletion(onEnd: Function) {
        this.chrono = setInterval(() => {
            if (typeof this.completionCriteria === "number") {
                this.completionCriteria--;
                if (this.completionCriteria === 0) {
                    onEnd();
                    this.resetMission();
                }
            }
        }, this.missionTick);
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onFinish: Function) {
        if (currentActivity === this.activityRelated) {
            playerScore += this.bonusPoint;
            onFinish();
            this.resetMission();
        }
    }

    resetMission() {
        clearInterval(this.chrono);
        this.chrono = 0;
        return;
    }

    displayMissionProgression() {
        return this.completionCriteria;
    }
}