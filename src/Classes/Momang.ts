import ActivityOwner from "./ActivityOwner.js";
import type MomangActivity from "./MomangActivity.js";

class Momang extends ActivityOwner <MomangActivity> {
    seconds = 0;
    currentActivity: string | null = null;
    activityTimeout: number = 0;
    constructor(listActivities: MomangActivity[]) {
        super(listActivities);
    }

    doActivity(activityName: string): void {
        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.currentActivity = activityName;
                this.activityTimeout = setInterval(() => {
                    this.seconds++;

                    if (this.seconds >= activity.givenDuration) {
                        this.stopActivity();
                    }
                }, 1000);        
            }        
        })         
    }

    stopActivity(): void {
        if (this.currentActivity) {
            clearInterval(this.activityTimeout); 
            this.currentActivity = null;
            this.activityTimeout = 0;
            this.seconds = 0;
        }
    }

    noticePlayer() {
        this.stopActivity();
    }
}