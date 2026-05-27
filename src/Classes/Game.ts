import Debugger from "./Debugger.js";
import Momang from "./Momang.js";
import MomangActivity from "./MomangActivity.js";
import Player from "./Player.js";
import PlayerActivity from "./PlayerActivity.js";
import SensesComparator from "./SensesComparator.js";

export default class Game {
    player: Player;
    momang: Momang;

    constructor(player: Player, momang: Momang) {
        this.player = player;
        this.momang = momang;
    }

    async startRandomMomangActivity(): Promise<void> {
        const momangActivitiesLs = this.momang.listActivities.length; 
        const momangRandomIndexActivity = Math.floor(Math.random() * momangActivitiesLs);
        
        const randomDurationActivity = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        
        const momangObject = this.momang.listActivities[momangRandomIndexActivity];
        momangObject.changeDuration(randomDurationActivity);

        Debugger.log("momangCurrentActivity", momangObject.label);    
        Debugger.log("momangFullDuration", momangObject.givenDuration);    
        this.momang.doActivity(momangObject.label, () => {
            this.startRandomMomangActivity();
        });
    }

    playingPhase(): void {
        this.startRandomMomangActivity();
        document.querySelector("body")?.addEventListener("click", (e) => {
            let eventTarget = e.target;
            this.handlePlayerActivity(eventTarget);
        
            const sensesComparison = new SensesComparator(this.player.currentSenses, this.momang.currentSensesArr).makeComparison();
             if (!sensesComparison) {
                this.player.getCaught();
            } 

            if (this.player.health === 0) {
                this.stopGame();
                return;
            }
        })
    }

    handlePlayerActivity<T> (targetElement: T) {
        if (targetElement instanceof Element) { 
            if (this.player.currentActivity === targetElement.className) { 
                this.player.pauseActivity();
                return;
            } 
            this.player.doActivity(targetElement.className);
            if (this.player.formerActivity && this.player.formerActivity != targetElement.className) {
                this.player.stopActivity();
            } 
        }
    }

    stopGame() {
        this.momang.stopActivity();
        this.player.stopActivity();
    }
}

const sport = new PlayerActivity("sport", ["odorat","vision"], 300, 20)
const danse = new PlayerActivity("danse", ["ouie"], 150, 15)

const cellphone = new MomangActivity("cellphone", ["vision"], 0)
const wc = new MomangActivity("wc", ["odorat","vision"], 0)
const kitchen = new MomangActivity("kitchen", ["odorat","vision"], 0)


const lyly = new Player([sport,danse])
const maman = new Momang([cellphone, wc,kitchen])
new Game(lyly, maman).playingPhase();
