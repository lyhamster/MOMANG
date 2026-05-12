export default abstract class ActivityOwner <T> {
    listActivities: T[];

    constructor(listActivities: T[]) {
        this.listActivities = listActivities;
    }

    abstract doActivity(activity: string): void;
}