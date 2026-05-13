import ActivityOwner from "./ActivityOwner.js";
import type PlayerActivity from "./PlayerActivity.js";

class Player extends ActivityOwner <PlayerActivity> {
    seconds = 0;
    playerScore = 0;
    health = 3;
    currentActivity: string | null = null;
    activityTimeout: number = 0;

    constructor(listActivities: PlayerActivity[]) {
        super(listActivities);
    }

    doActivity (activityName: string): void {
        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.currentActivity = activityName;
                this.activityTimeout = setInterval(() => {
                    this.seconds++;

                    if (this.seconds >= activity.fixedDuration) {
                        this.stopActivity();
                        this.playerScore += activity.score;
                    } 
                }, 1000)
            }
        })
    }

    stopActivity (): void {
        if (this.currentActivity) {
            clearInterval(this.activityTimeout); 
            this.currentActivity = null;
            this.activityTimeout = 0;
            this.seconds = 0;
        } 
    }

    getCaught(): void {
        if (this.health === 0) {
            this.stopActivity();
            return;
        }
        this.health--;
        this.stopActivity(); 
    }
}