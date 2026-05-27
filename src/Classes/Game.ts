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

    async startGame(): Promise<void> {
        const totalNbActivities = this.momang.listActivities.length; 
        const randomIndexActivity = Math.floor(Math.random() * totalNbActivities);
          
        this.randomDurationActivity = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        let currentIndexActivity = this.randomDurationActivity;

        if (this.randomDurationActivity === currentIndexActivity) {
            Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        }

        const momangObject = this.momang.listActivities[randomIndexActivity];
        momangObject.changeDuration(this.randomDurationActivity);
        Debugger.log("momangCurrentActivity", momangObject.label);    
        Debugger.log("momangFullDuration", momangObject.givenDuration);    
        this.momang.doActivity(momangObject.label, () => {
            this.startGame()
        });
        this.momangCurrentSenses = momangObject.sensesArr;
        Debugger.log("momangSenses", momangObject.sensesArr);
    }

    playerPlay(): void {
        this.startGame();
        document.querySelector("body")?.addEventListener("click", (e) => {
            let eventTarget = e.target;
            if (eventTarget instanceof Element) { 
                if (this.player.currentActivity === eventTarget.className) { 
                    this.player.pauseActivity();
                    return;
                }
                 if (this.formerActivity && this.formerActivity != eventTarget.className) {
                    this.player.stopActivity();
                    this.player.doActivity(eventTarget.className);  
                    return;
                } 
                this.player.doActivity(eventTarget.className);

                let playerCurrentSenses: string[] = [];
                this.player.listActivities.forEach((labelActivity) => {
                    if (labelActivity.label === this.player.currentActivity) {
                        playerCurrentSenses = labelActivity.sensesArr;
                    } 
                })
                
                const test = new SensesComparator(playerCurrentSenses, this.momangCurrentSenses).makeComparison();
                console.log(test)
            }
        })
    }
}

const sport = new PlayerActivity("sport", ["odorat","vision"], 300, 20)
const danse = new PlayerActivity("danse", ["ouie"], 150, 15)

const cellphone = new MomangActivity("cellphone", ["vision"], 0)
const wc = new MomangActivity("wc", ["odorat","vision"], 0)
const kitchen = new MomangActivity("kitchen", ["odorat","vision"], 0)


const lyly = new Player([sport,danse])
const maman = new Momang([cellphone, wc,kitchen])
new Game(lyly, maman).playerPlay();
