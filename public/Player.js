export class Player {

    name;
    cash;
    hand = [];
    valueOfHand = 0;
    hasHadTurn = false;

    constructor() {
        if (this.constructor == Player) {
            throw new Error('Abstract class cannot be instantiated!')
        }

        //get playerWindow element
        this.playerWindow = document.querySelector('.playerWindow');

        //create div elements to display the current player's hand 
        this.divForThisPlayer = document.createElement('div');
        this.cardsDivForThisPlayer = document.createElement('div');
       

        //put the elements in the right place
        this.playerWindow.appendChild(this.divForThisPlayer);
        this.divForThisPlayer.appendChild(this.cardsDivForThisPlayer);
    }

    removeDivElements(){
        this.divForThisPlayer.remove();
        this.cardsDivForThisPlayer.remove();
    }

    

}