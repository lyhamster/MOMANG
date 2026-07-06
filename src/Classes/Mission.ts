export default abstract class Mission {
    activityLabel: string;
    completionCriteria: number | string; 
    type: string;
    bonusPoint: number; 
    activityRelated: string | object;

    static allocatedTimeMission = "allocatedTimeMission";
    static repeatedMission = "repeatedMission";
    static alternateMission = "alternateMission";

    constructor(activityLabel: string, completionCriteria: number | string, type: string, bonusPoint: number, activityRelated: string | object) {
        this.activityLabel = activityLabel;
        this.completionCriteria = completionCriteria;
        this.type = type;
        this.bonusPoint = bonusPoint;
        this.activityRelated = activityRelated;
    }

    abstract getInstruction(): string;
    initializeCompletion(_callabck: Function): void {};
    abstract checkCompletion(_currentActivity: string | null, _playerScore: number, _callback: Function): void;
    abstract displayMissionProgression(): void;
}