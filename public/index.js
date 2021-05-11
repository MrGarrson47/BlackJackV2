import { GameMaster } from './GameMaster.js';
import { getArrayOfCards} from './ArrayOfCards.js';

let ArrayOfCards = getArrayOfCards();

localStorage.setItem('arrayOfCards', JSON.stringify(ArrayOfCards) );

//get html elements
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const selectBots = document.querySelector('#selectBots');


//change the amountOfBots when selectBots changes
let amountOfBots = selectBots.value;
selectBots.addEventListener('change', () => {
    amountOfBots = selectBots.value;
})

//assign function to startButton
startButton.addEventListener('click', () => {
    GameMaster.createPlayers(amountOfBots);
    GameMaster.dealTwoCardsToEveryone();
    GameMaster.giveAPlayerATurn();
    startButton.disabled = true;
    selectBots.disabled = true;
    resetButton.disabled = false;
})

//assign function to resetButton
resetButton.addEventListener('click', ()=>{
    GameMaster.removePlayers();
    startButton.disabled = false;
    selectBots.disabled = false;
    resetButton.disabled = true;
    localStorage.setItem('arrayOfCards', JSON.stringify(ArrayOfCards));
})




