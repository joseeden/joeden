'use strict';

// document.querySelector('.message').textContent = 'Correct Number!';
 // document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;
// document.querySelector('.guess').value = 23;

let secretNumber = Math.trunc(Math.random() * 20) + 1; 
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    if (score > 1) {

      if (!guess) {
        document.querySelector('.message').textContent = '⛔️ Please enter a number!';
      } else if (guess > secretNumber) {
        document.querySelector('.message').textContent = '👆 Too high!';
        score = score - 1; 
        document.querySelector('.score').textContent = score;
      } else if (guess < secretNumber) {
        document.querySelector('.message').textContent = '👇 Too low!';     
        score = score - 1
        document.querySelector('.score').textContent = score;
      } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number!';
        document.querySelector('body').style.backgroundColor  = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if (score > highscore) {
          highscore = score;
          document.querySelector('.highscore').textContent = highscore;
        }
      }
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
    }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20; 
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing....';
  displayMessage('Start guessing...');

  document.querySelector('.score').textContent = score; 
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});


// Allow pressing of Enter instead of clicking the Check button
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const message = document.querySelector('.message').textContent;

    if (message === '🎉 Correct Number!') {
      document.querySelector('.again').click();
    } else {
      document.querySelector('.check').click();
    }
  }
});