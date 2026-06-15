export default abstract class Mission {
    missionLabel: string;
    completionCriteria: number | string; 
    type: string;
    bonusPoint: number; 
    activityRelated: string | object;

    static allocatedTimeMission = "allocatedTimeMission";
    static repeatedMission = "repeatedMission";
    static alternateMission = "alternateMission";

    constructor(missionLabel: string, completionCriteria: number | string, type: string, bonusPoint: number, activityRelated: string | object) {
        this.missionLabel = missionLabel;
        this.completionCriteria = completionCriteria;
        this.type = type;
        this.bonusPoint = bonusPoint;
        this.activityRelated = activityRelated;
    }

    abstract displayInstruction(): string;
    initializeCompletion(_callabck: Function): void {};
    abstract checkCompletion(_currentActivity: string | null, _playerScore: number, _callback: Function): void;
    abstract displayMissionProgression(): void;
}