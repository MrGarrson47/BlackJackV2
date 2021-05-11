
let arrayOfCardNames = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'King'];
let arrayOfCardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let arrayOfCardSuits = ['Hearts', 'Diamond', 'Clubs', 'Spades'];


export const getArrayOfCards = () => {
    let ArrayOfCards = [];
    for (let indexOfName = 0; indexOfName < arrayOfCardNames.length; indexOfName++) {

        for (let indexOfSuit = 0; indexOfSuit < arrayOfCardSuits.length; indexOfSuit++) {
            ArrayOfCards.push({
                value: arrayOfCardValues[indexOfName],
                src: `/cards/${arrayOfCardNames[indexOfName]}${arrayOfCardSuits[indexOfSuit]}`
            });
        }

    }
    return ArrayOfCards;
}
