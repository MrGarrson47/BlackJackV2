import { Player } from "./Player.js"
import { GameMaster } from './GameMaster.js'

export class Dealer extends Player {

    constructor() {
        super();
        //create heading element to place 'thinking . . .' message
        this.message = document.createElement('h3');
        this.message.innerHTML = "I am thinking";
        this.message.style.opacity = 0;

        //get dealer container div element
        this.dealerContainer = document.querySelector('#dealerContainer');
        this.cardsDivForThisPlayer.classList.add('dealerCards');

        //put element in right place
        this.dealerContainer.appendChild(this.divForThisPlayer);
        this.cardsDivForThisPlayer.appendChild(this.buttonsDivForThisPlayer);
        this.buttonsDivForThisPlayer.appendChild(this.message);
    }


    startTurn() {
        this.displayThinkingMessage();
        this.hitIfDealerIsBelow17();
    }

    displayThinkingMessage() {
        this.message.style.opacity = 1;

        this.intervalToAddDotToThinkingMessage = setInterval(() => this.addDotToThinkingMessage(), 400);
    }

    addDotToThinkingMessage() {
        this.message.innerHTML += ' .';
        if (this.message.innerHTML.length > 19) {
            this.message.innerHTML = "Still thinking"
        }
    }

    hitIfDealerIsBelow17() {
        setTimeout(() => {
            if (this.getValueOfHand() >= 17) {
                this.message.style.opacity = 0;
                clearInterval(this.intervalToAddDotToThinkingMessage);
                return;
            }
            this.hit();
            this.hitIfDealerIsBelow17();
        }, 2000)
    }

    hit() {
        this.randomCardIndex = this.returnRandomCardIndex();

        this.addCardToHandArray(this.randomCardIndex);
        this.createImageElementForCard(this.randomCardIndex);
        this.removeCardFromArrayOfCards(this.randomCardIndex);
        this.isPlayerBust();
    }

    returnRandomCardIndex() {
        return Math.floor(Math.random() * this.getArrayOfCardsFromLocalStorage().length);
    }

    addCardToHandArray(randomCardIndex) {
        this.hand = [...this.hand, this.getArrayOfCardsFromLocalStorage()[randomCardIndex]];
    }

    createImageElementForCard(randomCardIndex) {
        this.imageElement = document.createElement('img');
        this.imageElement.classList.add('cardImage');
        this.imageElement.src = this.getArrayOfCardsFromLocalStorage()[randomCardIndex].src;
        this.cardsDivForThisPlayer.appendChild(this.imageElement);
    }

    removeCardFromArrayOfCards(randomCardIndex) {
        this.arrayOfCards = this.getArrayOfCardsFromLocalStorage();
        this.arrayOfCards.splice(randomCardIndex, 1);
        this.updateArrayOfCardsInLocalStorage(this.arrayOfCards);
    }

    updateArrayOfCardsInLocalStorage(arrayOfCards) {
        localStorage.setItem('arrayOfCards', JSON.stringify(arrayOfCards));
    }

    getArrayOfCardsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('arrayOfCards'));
    }

    isPlayerBust() {
        if (this.getValueOfHand() > 21) {
            GameMaster.giveAPlayerATurn();
        }
    }

    getValueOfHand() {
        this.valueOfHand = 0;
        this.hand.forEach(card => {
            this.valueOfHand += card.value;
        })
        return this.valueOfHand;
    }

    //remove html elements
    removeElements() {
        this.images = document.querySelectorAll('.cardImage');
        this.images.forEach(image => { image.remove() });
        this.message.remove();
    }


}