import type Mission from "./Mission.js";
export default class MissionManager {
    listMissions: Mission[];
    formerRandomIndex: number = 0;
    arrMission: Mission[] = [];
    allocatedTimeIndex: number = 0;
    constructor (listMissions: Mission[]) {
        this.listMissions = listMissions;
    }

    displayMissions() {
        do {
            this.arrMission.push(this.listMissions[this.randomIndexNb()]);
        } while (this.arrMission.length < 3);

        this.arrMission.forEach((mission) => {
            const missionParentElement = document.querySelector(".displayMission");
            const instruction = document.createElement("p"); 
            instruction.textContent = mission.displayInstruction();
            missionParentElement?.appendChild(instruction);

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
        this.newInstruction();
    }

    newInstruction() {
        setInterval(() => {
            const crashtest = this.listMissions[this.randomIndexNb()];
            // console.log(this.arrMission)
            if (this.arrMission.length < 3) {
                const missionParentElement = document.querySelector(".displayMission");
                const instruction = document.createElement("p"); 
                instruction.textContent = crashtest.displayInstruction();
                missionParentElement?.appendChild(instruction);
                this.arrMission.splice(this.allocatedTimeIndex, 0, crashtest)                
            }
        }, 1000);
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

    removeMission(elementLabel: string) {
        const elementInstruction = document.querySelector(elementLabel);
        elementInstruction?.remove();
    }
}