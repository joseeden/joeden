'use strict';

const overlay = document.querySelector('.overlay');
const allModals = document.querySelectorAll('.modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const modalButtons = document.querySelectorAll('.show-modal');

const openModal = function (modal) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (modal) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const getModal = function (e) {
  const button = e.target;
  const modalId = button.getAttribute('data-modal-target'); 
  const modal = document.querySelector(`.${modalId}`);
  openModal(modal);
};

// Add event listener to each modal button
modalButtons.forEach(button => {
  button.addEventListener('click', getModal);
});


// Add event listeners to each close button
closeModalButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Close modal if overlay is clicked
overlay.addEventListener('click', function () {
  allModals.forEach(modal => closeModal(modal));
});

// Close modal on 'Escape' key press
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    allModals.forEach(modal => closeModal(modal));
  }
});
