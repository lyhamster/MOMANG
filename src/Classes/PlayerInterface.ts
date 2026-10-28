import ElementFactory from "./ElementFactory";
import SingletonParent from "./SingletonParent";

class PlayerInterface extends SingletonParent {
    
    constructor() {
        super();
    }

    createScoreSection() {
        const playerScore = new ElementFactory("div", "playerScore", null, document.querySelector("section")).createElement();
        new ElementFactory("span", "totalScore", null, playerScore).createElement();
        new ElementFactory("span", "activityPoint", null, playerScore).createElement();

        return playerScore;
    }

    displayScore(playerScore: number, activityPoint: number) {
        const playerScoreElement = document.querySelector(".playerScore");
        const playerScoreSpan = playerScoreElement?.querySelector(".totalScore");
        const bonusPointElement= playerScoreElement?.querySelector <HTMLElement>(".activityPoint");

        if (bonusPointElement) {
                bonusPointElement.textContent = `+ ${activityPoint}`;
                bonusPointElement.setAttribute("animation", " bonusPoint 1500ms ease-in-out");
                bonusPointElement.style.animation = "bonusPoint 1500ms ease-in-out";
       
            setTimeout(() => {
                bonusPointElement.textContent = "";
                bonusPointElement.style.animation = "";
            }, 1500);
        }   
        
        if (playerScoreSpan) {
            setTimeout(() => {
                playerScoreSpan.textContent = `${playerScore}`;
            }, 1600);
        }
    }
}

export default new PlayerInterface();