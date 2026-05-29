import type CommonActivity from "./CommonActivity";

export default abstract class ActivityOwner <T extends CommonActivity> {
    listActivities: T[];
    currentActivity: string | null = null;
    seconds = 0;
    currentActivityTimeout: number = 0; 
    formerActivity: string | null = null;
    activityTick: number = 1000;

    constructor(listActivities: T[]) {
        this.listActivities = listActivities;
    }

    abstract doActivity(activity: string, onActivityEnd: Function): void;

    getCurrentActivity(): T {
        return this.listActivities.find((activity) => activity.label ===  this.currentActivity) as T;
    }

    stopActivity(): void {
        clearInterval(this.currentActivityTimeout);
        this.currentActivity = null;
        this.currentActivityTimeout = 0;
        this.seconds = 0;
    }
}