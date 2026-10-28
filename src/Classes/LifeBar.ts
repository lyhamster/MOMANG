import ElementFactory from "./ElementFactory";
import SingletonParent from "./SingletonParent";

class LifeBar extends SingletonParent {
    linksArr: string[] = [];

    constructor() {
        super();
    }

    createLifeBar() {
        const bloomedFlower = "/src/assets/hp-full.svg";

        do {
            this.linksArr.push(bloomedFlower);
        } while (this.linksArr.length < 3);
        
        const bodyElement = document.querySelector("body");
        const dashboardPanel = new ElementFactory("div", "dashboardPanel", null, bodyElement).createElement();
        const lifeBarWrapper = new ElementFactory("div", "lifeBarWrapper", null, null).createElement();

        this.linksArr.forEach((imgLink) => {
            new ElementFactory("img", null, imgLink, lifeBarWrapper).createImg();
        });
        dashboardPanel?.appendChild(lifeBarWrapper);
    }

    loseLife(healthTest: number) {
        const lifeBarWrapper = document.querySelector(".lifeBarWrapper");
        const imgElement = new ElementFactory("img", null, "/src/assets/hp-out.svg", lifeBarWrapper as HTMLElement).createImg() as Element;

        const loseHealth = lifeBarWrapper?.children[healthTest] as Element;
        lifeBarWrapper?.replaceChild(imgElement, loseHealth);
        return;
    }
}

export default new LifeBar();
