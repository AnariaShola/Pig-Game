'use strict';

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

let scores, currentScore, activePlayer, playing;

// Restart or Reload game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  diceEl.classList.add(`hidden`);

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${diceRoll}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching player
      switchPlayer();
    }
  }
});

// Hold the current score
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is >=100
    // End game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

// Restart the Game
btnNew.addEventListener(`click`, init);
