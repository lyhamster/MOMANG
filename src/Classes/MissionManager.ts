import type Mission from "./Mission.js";
export default class MissionManager {
    listMissions: Mission[];
    formerRandomIndex: number = 0;
    arrMission: Mission[] = [];
    allocatedTimeIndex: number = 0;
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

            switch(mission.type) {
                case "allocatedTimeMission": 
                instructionElement.classList.add("allocatedTime");
                mission.initializeCompletion(() => {
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
        })
    }

    handleCompletedMission(selectedElement: string, labelMissionLabel: string) {
        console.log(this.listMissions)
        this.removeMissionAndSaveIndex(selectedElement, labelMissionLabel);                  
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
        console.log(this.arrMission)
        this.allocatedTimeIndex = this.arrMission.findIndex((element) => element.type  === labelMissionType);
        console.log(this.allocatedTimeIndex, this.arrMission)
        this.arrMission.splice(this.allocatedTimeIndex, 1);
    }
}