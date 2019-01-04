/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameActive;

initGame();

//rolling the dice and updating results
document.querySelector('.btn-roll').addEventListener('click', () => {
    
if (gameActive) {
    // random number
    let dice = Math.floor(Math.random() * 6) + 1;
    
    // display the result
    const selectedDice = document.querySelector('.dice');
    selectedDice.style.display = 'block';
    selectedDice.src = 'dice-' + dice + '.png';
    
    // update the round score if rolled nr was not 1
    if(dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        nextPlayer();   
    }

}
});


//holding the game and updating global score
document.querySelector('.btn-hold').addEventListener('click', () => {

if(gameActive) {
//add curr score to global score
scores[activePlayer] += roundScore;

//update the UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

//check if player won the game
if(scores[activePlayer] >= 100) {
    document.querySelector('#name-' + activePlayer).textContent = 'You won!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gameActive = false;

} else {
    nextPlayer();
  }
}

});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
};

//starting new game
document.querySelector('.btn-new').addEventListener('click', initGame);

//initialization game state function
function initGame() {
gameActive = true;
scores = [0,0];
activePlayer = 0;
roundScore = 0;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

//making player 1 active by default at the beginning of the game
document.querySelector('.player-0-panel').classList.add('active');

};