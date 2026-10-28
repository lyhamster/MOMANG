export default class SingletonParent {
    static #instance: SingletonParent;

    constructor() {}

    public static getInstance() {
        if (!SingletonParent.#instance) {
            SingletonParent.#instance = new SingletonParent();
        }
        return SingletonParent.#instance;
    }
}

