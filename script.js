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
    let score = 0;
    // Add current score to active player´s score
    if(activePlayer === 0) {
        score0El.textContent =  parseInt(score0El.textContent) + parseInt(current0El.textContent);
        score = parseInt(score0El.textContent);
    }else {
        score1El.textContent = parseInt(score1El.textContent) + parseInt(current1El.textContent);
        score = parseInt(score1El.textContent);
    }
    // Check if player´s score is >= 50
    // Finish the game
    if(score >= 20) {
        activePlayer === 0 ? player0El.classList.add('player--winner') : player1El.classList.add('player--winner');
        btnRollEl.disabled = true;
        btnHoldEl.disabled = true;
        allowBtn();
    } else {
        switchPlayer();
    }
});

btnNewEl.addEventListener('click', newGame); 

function newGame() {
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

function allowBtn() {
    setTimeout(
      function() {
        btnRollEl.disabled = false;
        btnHoldEl.disabled = false;
        newGame();
      }, 5000);
  }

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

