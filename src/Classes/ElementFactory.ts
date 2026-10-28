export default class ElementFactory {
    elementType;
    className: string | null = "";
    value;
    parentElement;

    constructor (elementType: string, className: string | null, value: string | null, parentElement: HTMLElement | null) {
        this.elementType = elementType;
        this.className = className;
        this.value = value;        
        this.parentElement = parentElement;
    }

    createElement(): HTMLElement {
        const divElement = document.createElement(this.elementType);
        if (typeof this.className === "string") {
            divElement.classList.add(this.className);
        }

        if (this.parentElement instanceof HTMLElement) {
            return this.parentElement.appendChild(divElement);
        } else {
            return divElement;
        }
    }

    createImg() {
        const imgElement = document.createElement(this.elementType) as HTMLImageElement;
        imgElement.classList.add(this.className as string);

        if (imgElement instanceof HTMLImageElement) {
            imgElement.src = this.value as string; 
        }
        if (this.parentElement instanceof HTMLElement) {
            return this.parentElement?.appendChild(imgElement);
        }
    }

    createText() {
        const paraElement = document.createElement("p");
        paraElement.classList.add(this.className as string);
        paraElement.textContent = this.value;
        return this.parentElement?.appendChild(paraElement);
    }
}