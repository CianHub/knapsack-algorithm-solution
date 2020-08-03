const items = [
    { id: 1, value: 10, weight: 3 },
    { id: 2, value: 6, weight: 8 },
    { id: 3, value: 3, weight: 5 },
    { id: 4, value: 11, weight: 5 },
    { id: 5, value: 6, weight: 7 },
    { id: 6, value: 2, weight: 10 },
    { id: 7, value: 15, weight: 2 },
    { id: 8, value: 7, weight: 2 },
    { id: 9, value: 2, weight: 2 },
];

const maxWeight = 8;

const compareSolutions = (a, b) => {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
};

const checkIfComboHasBeenUsed = (comboList, idGroup) =>
    comboList.map((combo) => combo.every((id) => idGroup.includes(id)));

const combineItems = (item, itemToCompare, idGroup) => {
    return {
        value: item.value + itemToCompare.value,
        weight: item.weight + itemToCompare.weight,
        idGroup,
    };
};

const retrieveBestSolution = (possibleSolutions) => {
    // Get the best solution
    let solution = 0;
    const highestValueSolution = possibleSolutions
        .sort(compareSolutions)
        .reverse()[0];

    // retrieve the combination of items that form the best solution
    highestValueSolution.idGroup.forEach((id) => {
        const matchedItem = items.find((item) => item.id == id);
        solution = solution + matchedItem.value;
    });
    return solution;
};

const prepItems = (items) =>
    items.map((item) => {
        // Add the idGroup property to each of the starting items
        item.idGroup = [item.id];
        return item;
    });

const solution = () => {
    // Filter out invalid solutions
    const possibleSolutions = prepItems(items).filter(
        (item) => item.weight < maxWeight + 1
    );

    // store id groups of combinations used already
    const combinationsUsed = [];

    // Iterate through the items and get every valid combination
    [...possibleSolutions].forEach((item, index) => {
        [...possibleSolutions].forEach((combinationToCompare) => {
            // Check if this item has already been used in this combination
            if (combinationToCompare.idGroup.includes(item.id)) {
                return false;
            }

            // Check if the exact combination has already been used
            const idGroup = [item.id, ...combinationToCompare.idGroup];
            if (checkIfComboHasBeenUsed(combinationsUsed, idGroup).includes(true)) {
                // If it has been used exit
                return false;
            } else {
                // If it hasn't been used add to to the used list
                combinationsUsed.push(idGroup);
            }

            // If the combination is valid add it to possible solutions list
            const combinedItem = combineItems(item, combinationToCompare, idGroup);
            if (combinedItem.weight < maxWeight + 1) {
                possibleSolutions.push(combinedItem);
            }
        });
    });

    return `The highest possible value from the available items while keeping the total weight less than or equal to ${maxWeight} is ${JSON.stringify(
        retrieveBestSolution(possibleSolutions)
    )}`;
};

console.log(solution());
