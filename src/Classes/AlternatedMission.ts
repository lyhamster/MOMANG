import Mission from "./Mission";

export default class AlternateMission extends Mission {
    missionCompleted = 0;
    isValidated = false;
    
    constructor (activityLabel: string, completionCriteria: string, bonusPoint: number, activityRelated: object) {
        super(activityLabel, completionCriteria, "alternateMission", bonusPoint, activityRelated);
    } 

    getInstruction() {
        return `${this.activityLabel} puis ${this.completionCriteria} à la suite.`;
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onMissionCompleted: Function, onProgressionUpdate: Function) {
        if (this.missionCompleted === 1) {
            if (this.activityRelated[this.completionCriteria as keyof typeof this.activityRelated] === currentActivity) {
                this.missionCompleted++;
                onProgressionUpdate();
                playerScore += this.bonusPoint;
                onMissionCompleted();
                this.resetMission();
            } else {
                this.missionCompleted = 0;
            }
        }
        if (this.activityRelated[this.activityLabel as keyof typeof this.activityRelated] === currentActivity) {
            this.missionCompleted++; 
            onProgressionUpdate();
        } else {
            this.missionCompleted = 0;
        }
    }

    displayMissionProgression(): string {
        return `${this.missionCompleted} / 2` as string;
    }

    resetMission() {
        this.missionCompleted = 0;
        this.isValidated = false;
        return;
    }
}