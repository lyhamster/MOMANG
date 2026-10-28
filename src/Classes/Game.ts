import ActivityInterface from "./ActivityInterface.js";
import AllocatedTimeMission from "./AllocatedTimeMission.js";
import AlternateMission from "./AlternatedMission.js";
import LifeBar from "./LifeBar.js";
import MissionManager from "./MissionManager.js";
import MissionsInterface from "./MissionsInterface.js";
import Momang from "./Momang.js";
import MomangActivity from "./MomangActivity.js";
import MomangInterface from "./MomangInterface.js";
import Player from "./Player.js";
import PlayerActivity from "./PlayerActivity.js";
import PlayerInterface from "./PlayerInterface.js";
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

        this.momang.doActivity(momangObject.label, () => {
            this.startRandomMomangActivity();
        });
    }

    playingPhase(): void {
        MomangInterface.createMomangBg(this.momang.listActivities);
        MissionsInterface.createMissionModal();
        PlayerInterface.createScoreSection();
        this.startRandomMomangActivity();
        this.mission.displayMissions();
        LifeBar.createLifeBar();
        const activityWrapperElement = document.querySelector(".activitiesWrapper");
        activityWrapperElement?.addEventListener("click", (e) => {
            this.handlePlayerActivity(e);
            
            const stopActivityIcon = document.querySelector(".stopActivityIcon");
            stopActivityIcon?.addEventListener("click", () => {
                this.player.pauseActivity();
                ActivityInterface.removeInterface();
            })
            
            if (this.player.health === 0) {
                this.stopGame();
                return;
            }
        })
    }

    handlePlayerActivity(e: Event) {
        let eventTarget = e.target;
        if (eventTarget instanceof Element) { 
            if (this.player.formerActivity && this.player.formerActivity != eventTarget.className) {
                this.player.stopActivity();
            }
            let playerCurrentActivity: string | null; 
            this.player.doActivity(eventTarget.className, () => {
                this.mission.arrMission.forEach((mission) => {
                    switch (mission.type) {
                        case "allocatedTimeMission": 
                            mission.checkCompletion(playerCurrentActivity, this.player.score, () => {
                                this.mission.handleCompletedMission("allocatedTimeMission");
                                this.mission.handleTicketCycle();
                            }, () => {
                                this.mission.displayProgression("allocatedTimeMission")
                            });
                            break;

                        case "alternateMission": 
                            mission.checkCompletion(playerCurrentActivity, this.player.score, () => {
                                this.mission.handleCompletedMission("alternateMission");
                                this.mission.handleTicketCycle();
                            }, () => {
                                this.mission.displayProgression("alternateMission");
                            });
                            break;

                        case "repeatedMission": 
                            mission.checkCompletion(playerCurrentActivity, this.player.score, () => {
                                this.mission.handleCompletedMission("repeatedMission"); 
                                this.mission.handleTicketCycle();
                            }, () => {
                                this.mission.displayProgression("repeatedMission");
                            });
                            break;
                    }
                });
                ActivityInterface.removeInterface();
            });
            playerCurrentActivity = this.player.currentActivity;
       
            const momangSensesArr = this.momang.getCurrentActivity().sensesArr;
            const playerSensesArr = this.player.getCurrentActivity()?.sensesArr;

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

const sport = new PlayerActivity("sport", ["odorat","vision"], 300, 5);
const ordi = new PlayerActivity("ordi", ["odorat"], 300, 5);
const danse = new PlayerActivity("danse", ["odorat","vision"], 150, 5);
const eat = new PlayerActivity("eat", ["odorat", "ouie"], 200, 5);

const cellphone = new MomangActivity("cellphone", ["vision"], 0);
const wc = new MomangActivity("wc", ["odorat","vision"], 0);
const kitchen = new MomangActivity("kitchen", ["odorat","vision"], 0);
const tv = new MomangActivity("tv", ["vision", "hearing"], 0);
const idleMomang = new MomangActivity("idle", [], 0);
const papagPhoneCall = new MomangActivity("phoneCall", ["hearing"], 0);

const lyly = new Player([sport,danse, ordi, eat]);
const maman = new Momang([cellphone, wc, kitchen, tv, idleMomang, papagPhoneCall]);

const yogatTime = new AllocatedTimeMission("Fais du yoga", 20, 100,  "sport");
const danseTime = new AllocatedTimeMission("Fais du break danse", 20, 100,  "danse");
const eatTime = new AllocatedTimeMission("mange des bonbons", 20, 100,  "eat");
const shortTime = new AllocatedTimeMission("regarde un yt short", 20, 100,  "ordi");

const danseRepeat = new RepeatedMission("Fais du break danse", 4, 100, "danse");
const yogaRepeat = new RepeatedMission("Fais du yoga", 4, 100, "sport");
const eatRepeat = new RepeatedMission("mange des bonbons", 4, 100, "eat");
const shortRepeat = new RepeatedMission("regarde un short yt", 4, 100, "ordi");

const yogaDanseAlternate = new AlternateMission("Fais du yoga", "fais du break danse", 20, {"Fais du yoga": "sport", "fais du break danse": "danse"});
const shortYogaAlternate = new AlternateMission ("Regarde un reel", "fais du yoga", 100, {"Regarde un reel": "ordi", "fais du yoga": "sport"});
const eatDanseAlternate= new AlternateMission("mange des bonbons", "fais du break danse", 100, {"mange des bonbons": "eat", "fais du break danse": "danse"});
const danseShortAlternate = new AlternateMission("fais du boggie boogie", "regarde le podcast small talk sur youtchcube", 100,  {"fais du boggie boogie": "danse", "regarde le podcast small talk sur youtchcube": "ordi"});

const missions = new MissionManager([yogatTime, danseTime, eatTime, shortTime, danseRepeat, yogaRepeat, eatRepeat, shortRepeat, yogaDanseAlternate, shortYogaAlternate,eatDanseAlternate, danseShortAlternate]);
new Game(lyly, maman, missions).playingPhase();