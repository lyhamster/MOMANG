import ElementFactory from "./ElementFactory.js";
import SingletonParent from "./SingletonParent.js";

class MissionsInterface extends SingletonParent {
    activitiesImg = {
        "rubbiks": "/src/assets/activity/activity-cube.svg", 
        "danse": "/src/assets/activity/activity-dance.svg",
        "eat": "/src/assets/activity/activity-eat.svg",
        "ordi": "/src/assets/activity/activity-phone.svg",
        "sport": "/src/assets/activity/activity-sport.svg",
    } 
    missionInstructionContentWrapper =  new ElementFactory("div", "missionInstructionContentWrapper", null, null).createElement();

    constructor() {
        super();
    }

    createMissionModal() {
        const sectionElement = document.querySelector("section");
        const missionModalWrapper = new ElementFactory("div", "missionModalWrapper", null, sectionElement).createElement();
        const missionImgWrapper = new ElementFactory("div", "missionImgWrapper", null, missionModalWrapper).createElement();

        new ElementFactory("img", "missionTitle", null, missionImgWrapper).createImg();
        new ElementFactory("img", "missionBg", null, missionImgWrapper).createImg();
        new ElementFactory("img", "missionFg", null, missionImgWrapper).createImg();
        missionModalWrapper.appendChild(this.missionInstructionContentWrapper);
        new ElementFactory("div", "missionContentBox", null, this.missionInstructionContentWrapper).createElement();
    }

    buildMissionContent(imgSrc: string | object, missionType: string, missionText: string, missionStateProgression: string | number) {
        const missionContentBox = document.querySelector(".missionContentBox") as HTMLElement;
        const missionContent = new ElementFactory("div", "missionContent", null, missionContentBox).createElement();

        const iconActivityWrapper = new ElementFactory("div", "iconActivityWrapper", null, missionContent).createElement();
      
        new ElementFactory("img", null, "/src/assets/mission/mission-bg-bttn.svg", iconActivityWrapper).createImg();
        const iconMissionBttn = new ElementFactory("img", "iconMissionBttn", null, iconActivityWrapper).createImg() as HTMLImageElement;
        if (typeof imgSrc === "string") {
            iconMissionBttn.src = this.activitiesImg[imgSrc as keyof typeof this.activitiesImg];
        } else {
            let imgSrcObj = Object.values(imgSrc);
            iconMissionBttn.src = this.activitiesImg[imgSrcObj[0]  as keyof typeof this.activitiesImg]; 
        }

        new ElementFactory("p", missionType, missionText, missionContent).createText();
        new ElementFactory("p", "missionStateProgression", missionStateProgression as string, missionContent).createText();

        return this.missionInstructionContentWrapper;
    }

    buildRefreshBttn() {
        const bttnRefresh = new ElementFactory("div", "bttnRefresh", null, this.missionInstructionContentWrapper).createElement();
        const refreshWrapper = new ElementFactory("div", "refreshWrapper", null, bttnRefresh).createElement();
        new ElementFactory("img", "bttnRefreshbg", "/src/assets/button-bg.svg", refreshWrapper).createImg();
        new ElementFactory("img", "iconRefreshZero", "/src/assets/icons/icon-refresh-off.svg", refreshWrapper).createImg();

        const bttnRefreshFirstElement = new ElementFactory("div", "refreshWrapper", null, bttnRefresh).createElement();
        new ElementFactory("img", "bttnRefreshbg", "/src/assets/button-bg.svg", bttnRefreshFirstElement).createImg();
        new ElementFactory("img", "iconRefreshOne", "/src/assets/icons/icon-refresh-off.svg", bttnRefreshFirstElement).createImg();
        
        const bttnRefreshSecondElement = new ElementFactory("div", "refreshWrapper", null, bttnRefresh).createElement();
        new ElementFactory("img", "bttnRefreshbg", "/src/assets/button-bg.svg", bttnRefreshSecondElement).createImg();
        new ElementFactory("img", "iconRefreshTwo", "/src/assets/icons/icon-refresh-off.svg", bttnRefreshSecondElement).createImg();
    }

    replaceContentActivity(position: number, imgSrc: string | object, missionStateProgression: string | null, missionInstruction: string) {
        const missionInstructionContentBox = document.querySelector(".missionContentBox");
        const missionImg = missionInstructionContentBox?.children[position].children[0].children[1] as HTMLImageElement;
        
        if (typeof imgSrc === "string") {
            missionImg.src = this.activitiesImg[imgSrc as keyof typeof this.activitiesImg];
        } else {
            let imgSrcObj = Object.values(imgSrc);
            missionImg.src = this.activitiesImg[imgSrcObj[0] as keyof typeof this.activitiesImg];
        }

        const missionInstructionText = missionInstructionContentBox?.children[position].children[1] as HTMLElement;
        console.log(missionInstructionText, position)
        missionInstructionText.style.textDecoration = "unset";
        missionInstructionText.textContent = missionInstruction;

        const missionProgression = missionInstructionContentBox?.children[position].children[2];        
        if (missionProgression) {
            missionProgression.textContent = `${missionStateProgression}`;
        }
    }
}

export default new MissionsInterface();