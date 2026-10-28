export function generateRandomIndexNb(arr: [], formerRandomIndex: number) {
        const listMissions = arr.length; 
        let newRandomIndex;
        do {
            newRandomIndex =  Math.floor(Math.random() * listMissions);
        } while (newRandomIndex === formerRandomIndex);
        formerRandomIndex = newRandomIndex;
        return newRandomIndex;
}