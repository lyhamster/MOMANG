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
        const firstMission = this.listMissions[this.randomIndexNb()];
        const secondMission = this.listMissions[this.randomIndexNb()];
        const thirdMission = this.listMissions[this.randomIndexNb()];

        this.arrMission.push(firstMission, secondMission, thirdMission);
        this.arrMission.forEach((mission) => {
            const missionParentElement = document.querySelector(".displayMission");
            const instruction = document.createElement("p"); 
            instruction.textContent = mission.displayInstruction();
            missionParentElement?.appendChild(instruction);

            if (mission.type === "allocatedTimeMission") {
                instruction.classList.add("allocatedTime");
                mission.initializeCompletion(() => {
                    this.removeMission(".allocatedTime");
                    this.allocatedTimeIndex = this.arrMission.findIndex((labelMission) => labelMission.type === "allocatedTimeMission");
                    this.arrMission.splice(this.allocatedTimeIndex, 1);
                })
            } 

            if (mission.type === "repeatedMission") {
                instruction.classList.add("repeatedMissionElement");
                this.allocatedTimeIndex = this.arrMission.findIndex((labelMission) => labelMission.type === "repeatedMission");
                this.arrMission.splice(this.allocatedTimeIndex, 1);
            }

            if (mission.type === "alternateMission") {
                instruction.classList.add("alternatedMissionElement");
                this.allocatedTimeIndex = this.arrMission.findIndex((labelMission) => labelMission.type === "repeatedMission");
                this.arrMission.splice(this.allocatedTimeIndex, 1);
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