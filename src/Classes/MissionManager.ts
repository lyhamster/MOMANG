import type Mission from "./Mission.js";
export default class MissionManager {
    listMissions: Mission[];
    formerRandomIndex: number = 0;
    arrMission: Mission[] = [];
    arrMissionSavedIndex: number = 0;
    tickInstruction: number = 1000;
    displayMissionElement = document.querySelector(".displayMission");

    constructor (listMissions: Mission[]) {
        this.listMissions = listMissions;
    }

    displayMissions() {
        do {
            this.arrMission.push(this.listMissions[this.generateRandomIndexNb()]);
        } while (this.arrMission.length < 3);
        
        this.arrMission.forEach((mission) => {
            const instructionElement = document.createElement("p"); 
            instructionElement.textContent = mission.getInstruction();

            this.displayMissionElement?.appendChild(instructionElement); 

            this.addMissionClassName(mission, instructionElement);
        });
    }

    handleCompletedMission(selectedElement: string, labelMissionLabel: string) {
        this.removeMissionAndSaveIndex(selectedElement, labelMissionLabel);
        const newMission = this.listMissions[this.randomIndexNb()];
        this.arrMission.splice(this.arrMissionSavedIndex, 0, newMission);
        
        const instructionElement = document.createElement("p"); 
        instructionElement.textContent = newMission.displayInstruction();

        let arrMissionIndexIncremented = this.arrMissionSavedIndex;
        arrMissionIndexIncremented++;
        this.displayMissionElement?.insertBefore(instructionElement, this.displayMissionElement.childNodes[arrMissionIndexIncremented]); 

        this.createMissionClassName(this.arrMission[this.arrMissionSavedIndex], instructionElement);
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

    removeMissionAndSaveIndex(elementLabel: string, labelMissionType: string) {
        const elementInstruction = document.querySelector(elementLabel);
        elementInstruction?.remove();
        this.arrMissionSavedIndex = this.arrMission.findIndex((element) => element.type  === labelMissionType);
        this.arrMission.splice(this.arrMissionSavedIndex, 1);
    }

    addMissionClassName(mission: Mission, childElement: HTMLParagraphElement) {
        switch (mission.type) {
            case "allocatedTimeMission": 
                childElement.classList.add("allocatedTime");
                mission.initializeCompletion(() => {
                    this.handleCompletedMission(".allocatedTime", "allocatedTimeMission");
                })
            break; 

            case "repeatedMission": 
                childElement.classList.add("repeatedMission");
            break;

            case "alternateMission": 
                childElement.classList.add("alternatedMissionElement");
            break;
        }
    }
}