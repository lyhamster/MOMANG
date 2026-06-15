import AllocatedTimeMission from "./AllocatedTimeMission.js";
import AlternateMission from "./AlternatedMission.js";
import Debugger from "./Debugger.js";
import MissionManager from "./MissionManager.js";
import Momang from "./Momang.js";
import MomangActivity from "./MomangActivity.js";
import Player from "./Player.js";
import PlayerActivity from "./PlayerActivity.js";
import RepeatedMission from "./RepeatedMission.js";
import SensesComparator from "./SensesComparator.js";

export default class Game {
    player: Player;
    momang: Momang;
    mission: MissionManager;

    constructor(player: Player, momang: Momang, mission: MissionManager) {
        this.player = player;
        this.momang = momang;
        this.mission = mission;
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
        this.mission.displayMissions();
        document.querySelector("body")?.addEventListener("click", (e) => {
            this.handlePlayerActivity(e);
            if (this.player.health === 0) {
                this.stopGame();
                return;
            }
        })
    }

    handlePlayerActivity(e: PointerEvent) {
        let eventTarget = e.target;
        if (eventTarget instanceof Element) { 
            if (this.player.currentActivity === eventTarget.className) { 
                this.player.pauseActivity();
                return;
            }
            let playerCurrentActivity: string | null; 
            this.player.doActivity(eventTarget.className, () => {
                this.mission.listMissions.forEach((missionTest) => {
                    if (missionTest.type === "repeatedMission") {
                        missionTest.checkCompletion(playerCurrentActivity, this.player.score, (() => { 
                            // console.log(this.mission.removeMission(".repeatedMissionElement"))
                            this.mission.removeMission(".repeatedMissionElement");
                            // this.mission.newInstruction();
                            console.log(this.mission.newInstruction)
                        }))
                    }

                    if (missionTest.type === "allocatedTimeMission") {
                        missionTest.checkCompletion(playerCurrentActivity, this.player.score, (() => { 
                            this.mission.removeMission(".allocatedTime");
                        }))    
                    }

                    if (missionTest.type === "alternateMission") {
                        missionTest.checkCompletion(playerCurrentActivity, this.player.score, (() => { 
                            this.mission.removeMission(".alternatedMissionElement");
                        }))    
                    }
                });
                 
            });
            playerCurrentActivity = this.player.currentActivity;
            const momangSensesArr = this.momang.getCurrentActivity().sensesArr;
            const playerSensesArr = this.player.getCurrentActivity().sensesArr;

            const sensesComparison = new SensesComparator(momangSensesArr, playerSensesArr).makeComparison();
            if (!sensesComparison) {
                this.player.getCaught();
            } 
        }
    }

    stopGame() {
        this.momang.stopActivity();
        this.player.stopActivity();
    }
}

const sport = new PlayerActivity("sport", ["odorat","vision"], 300, 10);
const ordi = new PlayerActivity("ordi", ["odorat"], 300, 10);
const danse = new PlayerActivity("danse", ["odorat","vision"], 150, 8);

const cellphone = new MomangActivity("cellphone", ["vision"], 0);
const wc = new MomangActivity("wc", ["odorat","vision"], 0);
const kitchen = new MomangActivity("kitchen", ["odorat","vision"], 0);

const lyly = new Player([sport,danse, ordi]);
const maman = new Momang([cellphone, wc,kitchen]);

const doYoga = new AllocatedTimeMission("Fais du yoga", 20, 100, "sport");
const doBreakDanse = new RepeatedMission("fais du break danse", 4, 100, "danse");
const watchandSport = new AlternateMission ("regarde un reel", "fais du yoga", 100, {"regarde un reel": "ordi", "fais du yoga": "sport"})
const missions = new MissionManager([doYoga, doBreakDanse, watchandSport]);
new Game(lyly, maman, missions).playingPhase();