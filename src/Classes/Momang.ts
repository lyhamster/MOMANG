import ActivityOwner from "./ActivityOwner.js";
import Debugger from "./Debugger.js";
import type MomangActivity from "./MomangActivity.js";

export default class Momang extends ActivityOwner <MomangActivity> {
    seconds = 0;
    currentActivity: string | null = null;
    activityTimeout: number = 0;
    currentSensesArr: string[] = []
    constructor(listActivities: MomangActivity[]) {
        super(listActivities);
    }

    doActivity(activityName: string, onActivityEnd: Function): void {
        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.currentActivity = activityName;
                this.currentSensesArr = activity.sensesArr;
                Debugger.log("momangSenses", this.currentSensesArr);

                this.activityTimeout = setInterval(() => {
                    this.seconds++;
                    Debugger.log("momangCurrentTimer", this.seconds);
                    if (this.seconds >= activity.givenDuration) {
                        this.stopActivity();
                        onActivityEnd()
                    }
                }, 1000);   
            }        
        })         
    }

    stopActivity(): void {
        // if (this.currentActivity) {
        clearInterval(this.activityTimeout); 
        this.currentActivity = null;
        this.activityTimeout = 0;
        this.seconds = 0;
        // }
    }

    noticePlayer() {
        this.stopActivity();
    }

    getCurrentSenses() {
        return this.currentSensesArr;
    }
}