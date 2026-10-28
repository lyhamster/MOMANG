import Mission from "./Mission.js";
import MissionsInterface from "./MissionsInterface.js";

export default class MissionManager {
    listMissions: Mission[];
    formerRandomIndex: number = 0;
    arrMission: Mission[] = [];
    arrMissionSavedIndex: number = 0;
    tickInstruction: number = 1000;
    missionTypeSaved: string = "";
    splicedItem = {};
    completedMissionNb: number = 0;
    /**
     * index used to win a ticket when each mission row is validated in order 
     */ 
    currentCycleIndex: number = 0;
    constructor (listMissions: Mission[]) {
        this.listMissions = listMissions;
    }

    displayMissions() {
        this.getRandomElements(this.listMissions);
        this.arrMission.forEach((mission) => {
            MissionsInterface.buildMissionContent(mission.activityRelated, this.addMissionClassName(mission) as string, mission.getInstruction(), mission.displayMissionProgression());
        });
        MissionsInterface.buildRefreshBttn();
    }

    handleCompletedMission(labelMission: string) {
        this.saveMissionIndexInfo(labelMission);
        const missionInstructionContentBox = document.querySelector(".missionContentBox") as Element;
        const missionInstructionText = missionInstructionContentBox.children[this.arrMissionSavedIndex].children[1] as HTMLElement;
        missionInstructionText.style.textDecoration = "line-through";

        this.completedMissionNb++;
        if (this.completedMissionNb === 3) {
            this.completedMissionNb = 0;
            this.arrMission = [];
            this.getRandomElements(this.listMissions);
            this.arrMission.forEach((mission, index) => {
                if (mission.type === "allocatedTimeMission") {
                    mission.initializeCompletion(() => {
                        this.replaceMission(0, "allocatedTimeMission")}, 
                        () => this.displayProgression("allocatedTimeMission")
                    );
                }
                MissionsInterface.replaceContentActivity(index, mission.activityRelated, mission.displayMissionProgression(), mission.getInstruction());
            })
        }
    }

    displayProgression(labelMission: string) {
        this.saveMissionIndexInfo(labelMission);
        const missionInstructionContentBox = document.querySelector(".missionContentBox") as Element;
        const missionScore = missionInstructionContentBox?.children[this.arrMissionSavedIndex].children[2] as HTMLImageElement;
        missionScore.textContent = `${this.arrMission[this.arrMissionSavedIndex].displayMissionProgression()}`;
    }    

    handleTicketCycle() {
        if (this.arrMissionSavedIndex === this.currentCycleIndex) {
            this.currentCycleIndex++;
            if (this.currentCycleIndex === 3) {
                document.querySelectorAll(".refreshWrapper").forEach((icon) => {
                    icon.children[1].setAttribute("src", "/src/assets/icons/icon-refresh.svg");
                });
                const bttnRefresh = document.querySelector(".bttnRefresh");
                bttnRefresh?.addEventListener("click", (e) => {
                    const bttnElement = e.target;
                    if (bttnElement instanceof Element) {
                        if (bttnElement.classList.contains("iconRefreshZero")) {
                            this.replaceMission(0, "allocatedTimeMission");
                        } else if (bttnElement.classList.contains("iconRefreshOne")) {
                            this.replaceMission(1, "repeatedMission");
                        } else if (bttnElement.classList.contains("iconRefreshTwo")) {
                            this.replaceMission(2, "alternateMission");
                        }
                    }
                    document.querySelectorAll(".refreshWrapper").forEach((icon) => {
                        icon.children[1].setAttribute("src", "/src/assets/icons/icon-refresh-off.svg");
                    })
                    this.currentCycleIndex = 0;
                }, {once: true});
            }
        }
    }

    replaceMission(missionPosition: number, missionType: string) {   
        this.arrMission.splice(missionPosition, 1);
        let randomIndex;
        const arrayCopy = [...this.listMissions];
        const filteredArray = arrayCopy.filter((mission) => mission.type === missionType);
        this.saveMissionIndexInfo(missionType);

        do {
            randomIndex =  Math.floor(Math.random() * filteredArray.length);
        } while (this.listMissions[randomIndex] === this.arrMission[this.arrMissionSavedIndex]);

        this.arrMission.splice(missionPosition, 0, filteredArray[randomIndex]);
        
        if (filteredArray[randomIndex].type === "allocatedTimeMission") {
            filteredArray[randomIndex].initializeCompletion(() => {
                this.replaceMission(0, "allocatedTimeMission")}, 
                () => this.displayProgression("allocatedTimeMission")
            );
        }
        MissionsInterface.replaceContentActivity(missionPosition, filteredArray[randomIndex].activityRelated, filteredArray[randomIndex].displayMissionProgression(), filteredArray[randomIndex].getInstruction());
    }

    generateRandomIndexNb() {
        const listMissions = this.listMissions.length; 
        let newRandomIndex;
        do {
            newRandomIndex =  Math.floor(Math.random() * listMissions);
        } while (newRandomIndex === this.formerRandomIndex);
        this.formerRandomIndex = newRandomIndex;
        return newRandomIndex;
    }

    getRandomElements(list: Mission[]) {
        const arrayCopy = [...list];
       
        const allocatedTimeMission = arrayCopy.filter((mission) => mission.type === "allocatedTimeMission");
        const randNum =  Math.floor(Math.random() * allocatedTimeMission.length);
        this.arrMission.push(allocatedTimeMission[randNum]);

        const repeatedMission = arrayCopy.filter((mission) => mission.type === "repeatedMission");
        const randNumRepeated =  Math.floor(Math.random() * repeatedMission.length);
        this.arrMission.push(repeatedMission[randNumRepeated]);

        const alternateMission = arrayCopy.filter((mission) => mission.type === "alternateMission")
        const randNumAlternate =  Math.floor(Math.random() * alternateMission.length);
        this.arrMission.push(alternateMission[randNumAlternate]);

        return this.arrMission;
    }

    saveMissionIndexInfo(labelMissionType: string) {
        this.arrMissionSavedIndex = this.arrMission.findIndex((element) => element.type  === labelMissionType);
    }

    addMissionClassName(mission: Mission) {
        switch (mission.type) {
            case "allocatedTimeMission": 
            mission.initializeCompletion(
                () => {
                    this.handleCompletedMission("allocatedTimeMission");
                }, () => {
                    this.displayProgression("allocatedTimeMission")
                });
            return "allocatedTimeMission";

            case "repeatedMission": 
            return "repeatedMission";

            case "alternateMission": 
            return "alternateMission"
        }
    }
}