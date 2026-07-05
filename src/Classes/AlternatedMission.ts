import Mission from "./Mission";

export default class AlternateMission extends Mission {
    missionCompleted = 0;
    isValidated = false;
    
    constructor (missionLabel: string, completionCriteria: string, bonusPoint: number, activityRelated: object) {
        super(missionLabel, completionCriteria, "alternateMission", bonusPoint, activityRelated);
    } 

    displayInstruction() {
        return `${this.missionLabel} puis ${this.completionCriteria} à la suite.`;
    }

    checkCompletion(currentActivity: string | null, playerScore: number, onCompletion: Function) {
        if (this.missionCompleted === 1) {
            if (this.activityRelated[this.completionCriteria as keyof typeof this.activityRelated] === currentActivity) {
                this.missionCompleted++;
                playerScore += this.bonusPoint;
                onCompletion();
                this.resetMission();
            } else {
                this.missionCompleted = 0;
            }
        }
        
        if (this.activityRelated[this.missionLabel as keyof typeof this.activityRelated] === currentActivity) {
            this.missionCompleted++; 
        } else {
            this.missionCompleted = 0;
        }
    }

    displayMissionProgression() {
        return `${this.missionCompleted} / 2`;
    }

    resetMission() {
        this.missionCompleted = 0;
        this.isValidated = false;
        return;
    }
}