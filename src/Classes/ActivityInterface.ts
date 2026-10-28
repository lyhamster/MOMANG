import ElementFactory from "./ElementFactory.js";
import SingletonParent from "./SingletonParent.js";

class ActivityInterface extends SingletonParent {
    activitiesImg = {
        "rubbiks": "/src/assets/activity/activity-cube.svg", 
        "danse": "/src/assets/activity/activity-dance.svg",
        "eat": "/src/assets/activity/activity-eat.svg",
        "ordi": "/src/assets/activity/activity-phone.svg",
        "sport": "/src/assets/activity/activity-sport.svg",
    };
     
    formerAct: string = "";

    constructor() {
        super();
    }

    createInterface (currentAct: string) {
        const dashboardPanel = document.querySelector(".dashboardPanel");
        if (this.formerAct && this.formerAct !== currentAct) {
            this.removeInterface();
        }
        this.formerAct = currentAct;
        
        const activityDashboard = new ElementFactory("div", "activityDashboard", null,  dashboardPanel as HTMLElement).createElement();
        const timerWrapper = new ElementFactory("div", "timerWrapper", null, activityDashboard).createElement() as HTMLDivElement;
        
        new ElementFactory("img", "timerBg", "/src/assets/timer/timer-bg.svg", timerWrapper).createImg();
        new ElementFactory("img", "timerFg", "/src/assets/timer/timer-fg.svg", timerWrapper).createImg();
        new ElementFactory("img", "timerTip", "/src/assets/timer/timer-tip.svg", timerWrapper).createImg();

        new ElementFactory("p", null, `${currentAct}`, activityDashboard).createText();
        new ElementFactory("img", "activityIcon", `${this.activitiesImg[currentAct as keyof typeof this.activitiesImg]}`, activityDashboard).createImg();
        new ElementFactory("img", "stopActivityIcon", "/src/assets/icons/icon-close.svg", activityDashboard).createImg();
    }

    removeInterface() {
        document.querySelector(".activityDashboard")?.remove();
    }
    
    rotationSeconds(seconds: number, addedSec: number) {
        const deg = (360 / seconds);
        const timerTip = document.querySelector<HTMLElement>(".timerTip");
        if (timerTip != undefined) {
            timerTip.style.transform = `rotate(calc(${deg}deg * ${addedSec}))`;
        }
    }
}

export default new ActivityInterface();