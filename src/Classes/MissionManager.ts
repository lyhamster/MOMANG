import type Mission from "./Mission.js";
export default class MissionManager {
    listMissions: Mission[];
    formerRandomIndex: number = 0;
    arrMission: Mission[] = [];
    arrMissionSavedIndex: number = 0;
    tickInstruction: number = 1000;

    constructor (listMissions: Mission[]) {
        this.listMissions = listMissions;
    }

    displayMissions() {
        do {
            this.arrMission.push(this.listMissions[this.randomIndexNb()]);
        } while (this.arrMission.length < 3);
        
        this.arrMission.forEach((mission) => {
            const missionParentElement = document.querySelector(".displayMission");
            const instructionElement = document.createElement("p"); 
            instructionElement.textContent = mission.displayInstruction();
            missionParentElement?.appendChild(instructionElement); 

        switch (mission.type) {
            case "allocatedTimeMission": 
                instructionElement.classList.add("allocatedTime");
                mission.initializeCompletion(() => {
                    this.handleCompletedMission(".allocatedTime", "allocatedTimeMission");
                })
                break; 

            case "repeatedMission": 
                instructionElement.classList.add("repeatedMission");
                break;

            case "alternateMission": 
                instructionElement.classList.add("alternatedMissionElement");
                break;
            }
        })
        console.log("display", this.arrMission)
    }


    handleCompletedMission(selectedElement: string, labelMissionLabel: string) {
        this.removeMissionAndSaveIndex(selectedElement, labelMissionLabel);
        const newMission = this.listMissions[this.randomIndexNb()];
        this.arrMission.splice(this.arrMissionSavedIndex, 0, newMission);
        console.log("spliced array", this.arrMission)
        
        const missionParentElement = document.querySelector(".displayMission");
        const instructionElement = document.createElement("p"); 
        instructionElement.textContent = newMission.displayInstruction();

        let arrMissionIndexIncremented = this.arrMissionSavedIndex;
        arrMissionIndexIncremented++;
       
        missionParentElement?.insertBefore(instructionElement, missionParentElement.childNodes[arrMissionIndexIncremented]); 
        switch (this.arrMission[this.arrMissionSavedIndex].type) {
            case "allocatedTimeMission": 
            instructionElement.classList.add("allocatedTime");
            this.arrMission[this.arrMissionSavedIndex].initializeCompletion(() => {
                this.removeMissionAndSaveIndex(".allocatedTime", "allocatedTimeMission");
            })
            break; 

            case "repeatedMission": 
            instructionElement.classList.add("repeatedMission");
            break;

            case "alternateMission": 
            instructionElement.classList.add("alternatedMissionElement");
            break;
        }
    }

    randomIndexNb() {
        const listMissions = this.listMissions.length; 
        let newRandomIndex;
        do {
            newRandomIndex =  Math.floor(Math.random() * listMissions);
        } while (newRandomIndex === this.formerRandomIndex);
        this.formerRandomIndex = newRandomIndex;
        return newRandomIndex;
    }

    removeMissionAndSaveIndex(elementLabel: string, labelMissionType: string) {
        const elementInstruction = document.querySelector(elementLabel);
        elementInstruction?.remove();
        this.arrMissionSavedIndex = this.arrMission.findIndex((element) => element.type  === labelMissionType);
        this.arrMission.splice(this.arrMissionSavedIndex, 1);
    }
}