import ActivityOwner from "./ActivityOwner.js";
import type MomangActivity from "./MomangActivity.js";

class Momang extends ActivityOwner <MomangActivity> {
    seconds = 0;
    currentActivity: string | null = null;
    activityTimeout: number = 0;
    sensesArr: string[] = [];
    constructor(listActivities: MomangActivity[]) {
        super(listActivities);
    }

    doActivity(activity: string): void {
        this.listActivities.forEach((eachActivity) => {
            if (eachActivity.label === activity) {
                this.currentActivity = activity;
                this.activityTimeout = setInterval(() => {
                    this.seconds++;
                    
                    this.sensesArr = eachActivity.senses;

                    if (this.seconds >= eachActivity.givenDuration) {
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
    
    public get senses() {
        return this.sensesArr; 
    }
    
    noticePlayer() {
        this.stopActivity();
    }
}