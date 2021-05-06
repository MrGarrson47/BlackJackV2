import { Dealer } from "./Dealer.js";
import { Human } from "./Human.js";

//GameMaster creates the players, gives a turn to each player and deals initial two cards to each player
export class GameMaster {

    static players = [];

    //creates objects of the players, always 1 Human first and 1 Dealer last
    static createPlayers(amountOfBots) {
        this.players = [new Human('MrGarrison47', 1000)];
        for (let i = 0; i < amountOfBots; i++) {
            this.players = [...this.players, new Human(`p${i}`, 1000)];
        }
        this.players = [...this.players, new Dealer()];
    }

    //remove players
    static removePlayers(){
        this.players.forEach(player=>{player.removeElements()});
        this.players = [];
    }

    //return if player has had turn
    static hasPlayerHadTurn(playerIndex) {
        return this.players[playerIndex].hasHadTurn;
    }

    //starts the player's turn and sets hasHadTurn to true
    static playTurn(playerIndex) {
        this.players[playerIndex].startTurn();
        this.players[playerIndex].hasHadTurn = true;
    }

    //chooses a player that has not had a turn and gives them a turn
    static giveAPlayerATurn() {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.hasPlayerHadTurn(i)) {
                this.playTurn(i);
                return;
            }
        }
    }

    //gives two cards to every player at start of game
    static dealTwoCardsToEveryone() {
        this.players.forEach(player => {
            for (let i = 0; i < 2; i++) {
                player.hit();
            }
        })
    }



}