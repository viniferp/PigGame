'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality
btnRollEl.addEventListener('click', function () {
    // Generate random dice roll
    const dice = randomInteger(1, 6);
    // Display dice roll
    diceEl.src= `dice-${dice}.png`;
    //console.log("dice-".concat(dice).concat('.png'));
    diceEl.classList.remove('hidden');

// if 1 ? switch player : Add dice roll to score && display new score
    if(dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next player
        switchPlayer();
    }
});

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;        
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnHoldEl.addEventListener('click', function() {
    // Add current score to active player´s score
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 20){
        
    } else {
        // Switch to the next player
        switchPlayer();
    }
});

btnNewEl.addEventListener('click', function() {
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}); 

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

