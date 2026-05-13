import ActivityOwner from "./ActivityOwner.js";
import type PlayerActivity from "./PlayerActivity.js";

class Player extends ActivityOwner <PlayerActivity> {
    seconds = 0;
    playerScore = 0;
    health = 3;
    currentActivity: string | null = null;
    activityTimeout: number = 0;
    sensesArr: string[] = []; 
    constructor(listActivities: PlayerActivity[]) {
        super(listActivities);
    }

    doActivity (activityName: string): void {
        this.listActivities.forEach((eachActivity) => {
            if (eachActivity.label === activityName) {
                this.currentActivity = activityName;
                this.activityTimeout = setInterval(() => {
                    this.seconds++;
    
                    this.sensesArr = eachActivity.senses;
                    
                    if (this.seconds >= eachActivity.fixedDuration) {
                        this.stopActivity();
                        this.playerScore += eachActivity.score;
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

    public get senses() {
        return this.sensesArr; 
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