import { GameMaster } from './GameMaster.js';
import { Player } from './Player.js';

export class Human extends Player {

    constructor(name, cash) {
        super();
        this.name = name;
        this.cash = cash;
        this.bet;

        //create the button elements
        this.buttonsDivForThisPlayer = document.createElement('div');
        this.hitButton = document.createElement('button');
        this.hitButton.innerText = 'HIT';
        this.standButton = document.createElement('button');
        this.standButton.innerText = 'STAND';

        //add class to cardsDivForThisPlayer
        this.cardsDivForThisPlayer.classList.add('humanCards');

        //put the elements in the right place
        this.divForThisPlayer.appendChild(this.buttonsDivForThisPlayer);
        this.buttonsDivForThisPlayer.appendChild(this.hitButton);
        this.buttonsDivForThisPlayer.appendChild(this.standButton);

        //assign click events to the buttons
        this.hitButton.addEventListener('click', () => { this.hit() });
        this.standButton.addEventListener('click', () => { this.stand() });

        //disable the buttons until it is this player's turn
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
    }

    //add a card to the player's hand, remove card from deck, check if player is now bust
    hit() {
        this.randomCardIndex = this.returnRandomCardIndex();

        this.addCardToHandArray(this.randomCardIndex);
        this.createImageElementForCard(this.randomCardIndex);
        this.removeCardFromArrayOfCards(this.randomCardIndex);
        this.isPlayerBust();
    }

    //return a random index of the arrayOfCards
    returnRandomCardIndex() {
        return Math.floor(Math.random() * this.getParsedArrayOfCards().length);
    }

    //add a card index to the player's hand
    addCardToHandArray(randomCardIndex) {
        this.hand = [...this.hand, this.getParsedArrayOfCards()[randomCardIndex]];
    }

    //a method that creates an image element for a card 
    createImageElementForCard(randomCardIndex) {
        this.imageElement = document.createElement('img');
        this.imageElement.classList.add('cardImage');
        this.imageElement.src = this.getParsedArrayOfCards()[randomCardIndex].src;
        this.cardsDivForThisPlayer.appendChild(this.imageElement);
    }

    //splice an index from the arrayOfCards
    removeCardFromArrayOfCards(randomCardIndex) {
        this.arrayOfCards = this.getParsedArrayOfCards();
        this.arrayOfCards.splice(randomCardIndex, 1);
        localStorage.setItem('arrayOfCards', JSON.stringify(this.arrayOfCards));
    }


    //check if the player has gone bust, if true go to next player
    isPlayerBust() {
        if (this.getValueOfHand() > 21) {
            this.hitButton.disabled = true;
            this.standButton.disabled = true;
            this.hasHadTurn = true;
            GameMaster.giveAPlayerATurn();
        }
    }

    //return the value of the player's hand
    getValueOfHand() {
        this.valueOfHand = 0;
        this.hand.forEach(card => {
            this.valueOfHand += card.value;
        })
        return this.valueOfHand;
    }

    //return parsed object from arrayOfCards in localStorage
    getParsedArrayOfCards() {
        return JSON.parse(localStorage.getItem('arrayOfCards'));
    }

    //assign the player's bet
    setBet(bet) {
        this.bet = bet;
    }

    //return the player's bet
    getBet() {
        return this.bet;
    }


    //end player's turn and give a turn to the next player
    stand() {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.hasHadTurn = true;
        GameMaster.giveAPlayerATurn();
    }


    //enable the player's buttons to be clicked
    startTurn() {
        this.hitButton.disabled = false;
        this.standButton.disabled = false;
    }

    //remove html elements
    removeElements() {
        this.images = document.querySelectorAll('.cardImage');
        this.images.forEach(image => { image.remove() });
        this.hitButton.remove();
        this.standButton.remove();
        this.removeDivElements();
    }


}