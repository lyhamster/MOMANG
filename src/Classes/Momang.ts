import ActivityOwner from "./ActivityOwner.js";
// import Debugger from "./Debugger.js";
import type MomangActivity from "./MomangActivity.js";

export default class Momang extends ActivityOwner <MomangActivity> {
    constructor(listActivities: MomangActivity[]) {
        super(listActivities);
    }

    doActivity(activityName: string, onActivityEnd: Function): void {
        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.currentActivity = activityName;
                this.currentActivityTimeout = setInterval(() => {
                    this.seconds++;
                    if (this.seconds >= activity.givenDuration) {
                        this.stopActivity();
                        onActivityEnd()
                    }
                }, this.activityTick);   
            }        
        })         
    }
}