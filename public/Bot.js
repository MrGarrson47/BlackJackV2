import { GameMaster } from "./GameMaster.js";
import { Player } from "./Player.js";

export class Bot extends Player {

    static botId;

    constructor(riskLevel, botColoumn) {
        super();

        this.riskLevel = riskLevel;

        //get div element for bot's area
        this.botDiv = document.querySelector(`#${botColoumn}`);
        
        //create messageDiv element
        this.messageDiv = document.createElement('div');

        //create heading element to place 'thinking . . .' message
        this.message = document.createElement('h3');
        this.message.innerHTML = "I am thinking";
        this.message.style.opacity = 0;

        //put element in right place
        this.botDiv.appendChild(this.cardsDivForThisPlayer);
        this.cardsDivForThisPlayer.appendChild(this.messageDiv);
        this.messageDiv.appendChild(this.message);

    }

    //add a card to the player's hand, remove card from deck, check if player is now bust
    hit() {

        this.randomCardIndex = this.returnRandomCardIndex();

        this.addCardToHandArray(this.randomCardIndex);
        this.createImageElement(this.randomCardIndex);
        this.removeCardFromArrayOfCards(this.randomCardIndex);
        this.isPlayerbust();

    }

    //return a random index of the arrayOfCards
    returnRandomCardIndex() {
        return Math.floor(Math.random() * this.getParsedArrayOfCards().length);
    }

    //return parsed object from arrayOfCards in localStorage
    getParsedArrayOfCards() {
        return JSON.parse(localStorage.getItem("arrayOfCards"));
    }

    addCardToHandArray(randomCardIndex) {
        this.hand = [...this.hand, this.getParsedArrayOfCards()[randomCardIndex]];
    }

    createImageElement(randomCardIndex) {
        this.imageElement = document.createElement('img');
        this.imageElement.classList.add('cardImage');
        this.imageElement.src = this.getParsedArrayOfCards()[randomCardIndex].src;
        this.botDiv.appendChild(this.imageElement);

    }

    removeCardFromArrayOfCards(randomCardIndex) {
        this.arrayOfCards = this.getParsedArrayOfCards();
        this.arrayOfCards.splice(randomCardIndex, 1);
        localStorage.setItem('arrayOfCards', JSON.stringify(this.arrayOfCards));
    }

    isPlayerbust() {
        if (this.getValueOfHand() > 21) {
            this.hasHadTurn = true;
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

    startTurn() {
        this.displayThinkingMessage();
        this.shouldBotHit();
    }

    displayThinkingMessage() {
        this.message.style.opacity = 1;

        this.intervalToAddDotToThinkingMessage = setInterval(() => this.addDotToThinkingMessage(), 400);
    }

    addDotToThinkingMessage() {
        this.message.innerHTML += ' .';
        if (this.message.innerHTML.length > 19) {
            this.message.innerHTML = "Still thinking";
        }
    }

    getChanceOfDrawingABustingCard() {
        this.chanceOfDrawingABustingCard = 0;
        this.getParsedArrayOfCards().forEach(card => {
            if (card.value >= this.getValueOfBustingCard()) {
                this.chanceOfDrawingABustingCard += this.getChanceOfDrawingAnyCard();
            }
        })
        return this.chanceOfDrawingABustingCard;
    }

    getValueOfBustingCard() {
        return 22 - this.getValueOfHand();
    }

    getChanceOfDrawingAnyCard() {
        return 100 / this.getParsedArrayOfCards().length;
    }

    shouldBotHit() {
        setTimeout(() => {
            if (this.getChanceOfDrawingABustingCard() > this.riskLevel) {
                this.endTurn();
                return;
            }
            this.hit();
            this.shouldBotHit();
        }, 2000)

    }

    endTurn() {
        this.hasHadTurn = true;
        clearInterval(this.intervalToAddDotToThinkingMessage);
        this.message.style.opacity = 0;
        GameMaster.giveAPlayerATurn();
    }

    //remove html elements
    removeElements() {
        this.images = document.querySelectorAll('.cardImage');
        this.images.forEach(image => { image.remove() });
        this.removeDivElements();
    }


}