import ActivityOwner from "./ActivityOwner.js";
import Debugger from "./Debugger.js";
import type PlayerActivity from "./PlayerActivity.js";

export default class Player extends ActivityOwner <PlayerActivity> {
    seconds = 0;
    playerScore = 0;
    health = 3;
    currentActivity: string | null = null;
    activityCurrentTimeout: number = 0;
    activityTick: number = 1000;
    formerActivity: string | null = null;
    currentSenses: string[] = [];

    constructor(listActivities: PlayerActivity[]) {
        super(listActivities);
    }

    doActivity (activityName: string): void {
        Debugger.log("playerHealth", this.health);

        this.listActivities.forEach((activity) => {
            if (activity.label === activityName) {
                this.formerActivity = this.currentActivity;
                this.currentActivity = activityName;
                this.currentSenses = activity.sensesArr;
                Debugger.log("playerCurrentActivity", activityName);
                Debugger.log("playerSenses", activity.sensesArr);
                Debugger.log("playerFullDuration", activity.fixedDuration);
                this.activityCurrentTimeout = setInterval(() => {
                    this.seconds++;
                    Debugger.log("playerCurrentTimer", this.seconds)
                    if (this.seconds === activity.fixedDuration) {
                        this.stopActivity();
                        this.playerScore += activity.score;
                        Debugger.log("playerScore", this.playerScore);
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
            clearInterval(this.activityCurrentTimeout); 
            this.currentActivity = null;
            this.activityCurrentTimeout = 0;
        } 
    }

    stopActivity (): void {
        clearInterval(this.activityCurrentTimeout); 
        this.currentActivity = null;
        this.activityCurrentTimeout = 0;
        this.seconds = 0;
    }

    getCaught(onEndGame: Function): void {
        if (this.health === 0) {
        console.log(this.health)

            console.log("Hello")
            onEndGame();
            this.stopActivity();
            return;
        } else {
            this.health--;
            this.stopActivity(); 
            Debugger.log("playerHealth", this.health);   
        }
    }

    getCurrentSenses() {
        return this.currentSenses;
    }
}