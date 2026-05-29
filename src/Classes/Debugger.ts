class Debugger {
    isInConsole: boolean = true;
    
    log(id: string, value: unknown) {
        if(this.isInConsole) { 
            console.log(id, value);
        }

        const element = document.querySelector(`.${id} span`) as HTMLElement;
        element.textContent = value as string; 
    }
}

export default new Debugger();