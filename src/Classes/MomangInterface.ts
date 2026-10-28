import ElementFactory from "./ElementFactory";
import type MomangActivity from "./MomangActivity";
import SingletonParent from "./SingletonParent";

class MomangInterface extends SingletonParent{
    constructor() {
        super();
    }

    createMomangBg(momangActivities: MomangActivity[]) {
        const section = document.querySelector("section");
        const momangBgElement = new ElementFactory("div", "momangBg", null, section).createElement();
        momangActivities.forEach((activity) => {
            new ElementFactory("div", activity.label, null, momangBgElement).createElement();
        })
    }
}

export default new MomangInterface();