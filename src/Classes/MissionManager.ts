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

    handleCompletedMission(labelMissionLabel: string) {
        this.removeMissionAndSaveIndex(labelMissionLabel);
        this.replaceMission(this.arrMissionSavedIndex, this.missionTypeSaved);
    }

    handleTicketCycle() {
        if (this.arrMissionSavedIndex === this.currentCycleIndex) {
            this.currentCycleIndex++;
            console.log(this.currentCycleIndex)
            if (this.currentCycleIndex === 3) {
                const ticketsOptionElement = document.querySelector(".ticketsOption");
                ticketsOptionElement?.querySelectorAll("button").forEach((bttn) => bttn.style.backgroundColor = "green");

                ticketsOptionElement?.addEventListener("click", (e) => {
                    const bttnElement = e.target;
                    if (bttnElement instanceof Element) {
                        if (bttnElement.classList.contains("prout")) {
                            const missionType = this.arrMission[0].type;
                            this.arrMission.splice(0, 1);
                            this.replaceMission(0, missionType);
                        } else if (bttnElement.classList.contains("index1")) {
                            const missionType = this.arrMission[1].type;
                            this.arrMission.splice(1, 1);
                            this.replaceMission(1, missionType);
                        } else if (bttnElement.classList.contains("index2")) {
                            const missionType = this.arrMission[2].type;
                            this.arrMission.splice(2, 1);
                            this.replaceMission(2, missionType);
                        }
                    }
                    ticketsOptionElement?.querySelectorAll("button").forEach((bttn) => bttn.style.backgroundColor = "#E91E63");
                    this.currentCycleIndex = 0;
                }, {once: true})
            }
        }
    }

    replaceMission(missionPosition: number, missionType: string) {
        let randomIndex;
        do {
            randomIndex = this.generateRandomIndexNb();
        } while (this.listMissions[randomIndex].type === missionType);

        const newMission = this.listMissions[randomIndex];
        this.arrMission.splice(missionPosition, 0, newMission);
        
        const instructionElement = document.createElement("p");
        instructionElement.textContent = newMission.getInstruction();

        const childDisplayMissionElement = this.displayMissionElement?.children[missionPosition] as Element;
        this.displayMissionElement?.replaceChild(instructionElement, childDisplayMissionElement);
        
        this.addMissionClassName(newMission, instructionElement);
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

    removeMissionAndSaveIndex(labelMissionType: string) {
        this.arrMissionSavedIndex = this.arrMission.findIndex((element) => element.type  === labelMissionType);
        this.missionTypeSaved = this.arrMission[this.arrMissionSavedIndex].type;
        this.arrMission.splice(this.arrMissionSavedIndex, 1);
    }

    addMissionClassName(mission: Mission, childElement: HTMLParagraphElement) {
        switch (mission.type) {
            case "allocatedTimeMission": 
                childElement.classList.add("allocatedTime");
                mission.initializeCompletion(() => {
                    this.handleCompletedMission("allocatedTimeMission");
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