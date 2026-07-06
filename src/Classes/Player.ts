import ActivityOwner from "./ActivityOwner.js";
import Debugger from "./Debugger.js";
import PlayerActivity from "./PlayerActivity.js";

export default class Player extends ActivityOwner <PlayerActivity> {
    score = 0;
    health = 3;
    
    constructor(listActivities: PlayerActivity[]) {
        super(listActivities);
    }

    doActivity (activityName: string, onMission: Function): void {
        Debugger.log("playerHealth", this.health);

        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.formerActivity = this.currentActivity;
                this.currentActivity = activityName;
                Debugger.log("playerCurrentActivity", activityName);
                Debugger.log("playerFullDuration", activity.fixedDuration);
                this.currentActivityTimeout = setInterval(() => {
                    this.seconds++;
                    Debugger.log("playerCurrentTimer", this.seconds)
                    if (this.seconds === activity.fixedDuration) {
                        this.stopActivity();
                        this.score += activity.score;
                        Debugger.log("playerScore", this.score);
                        onMission();  
                    } 
                }, this.activityTick);
            }
            return;
        })
    }

    pauseActivity (): void {
        if (this.currentActivity) {
            this.formerActivity = this.currentActivity;
            Debugger.log("formerActivity", this.formerActivity);
            clearInterval(this.currentActivityTimeout); 
            this.currentActivity = null;
            this.currentActivityTimeout = 0;
        } 
    }

    getCaught(): void {
        if (this.health === 0) {
            this.stopActivity();
            return;
        }
        this.health--;
        this.stopActivity(); 
        Debugger.log("playerHealth", this.health);   
    }
}
