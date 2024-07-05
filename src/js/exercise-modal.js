import { fetchExercise } from './fetch-exercise';
import { initFavoritesButtons } from './init-favorites-buttons';
import { initRatingForm } from './rating-form';
import { renderExcerciseModal } from './exercise-modal-markup';
import { showToast } from './toast';

let modalOverlay;
let exerciseModal;
let addFavoritesButton;
let removeFavoritesButton;
let addRatingButton;

export async function openModal(exerciseId) {
  let exerciseData;
  try {
    exerciseData = await fetchExercise(exerciseId);
    renderExcerciseModal(exerciseData);
    popualteSelectors(exerciseData);
    showOverlay();
    addExerciseCloseButtonListener();
    addFavoritesListener();
    addRatingButtonListener(exerciseId);
    addCloseButtonListener();
    initFavoritesButtons();
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Server error',
      message: 'Error fetching exercise data'
    })
  } 
}

function popualteSelectors() {
  modalOverlay = document.getElementById('modalOverlay');
  exerciseModal = document.getElementById('exerciseModal');
  addFavoritesButton = document.getElementById('addFavoritesButton');
  removeFavoritesButton = document.getElementById('removeFavoritesButton');
  addRatingButton = document.getElementById('addRatingButton');
}

function showOverlay() {
  modalOverlay.classList.remove('hidden');
}

function hideOverlay() {
  modalOverlay.classList.add('hidden');
  document.getElementById('exerciseModal').remove();
}

function addExerciseCloseButtonListener() {
  const exerciseCloseBtn = exerciseModal.querySelector('#closeExerciseButton');
  exerciseCloseBtn.addEventListener('click', hideOverlay);
}

function addToFavorites() {
  // Add logic to store in localstorage
  addFavoritesButton.classList.add('hidden');
  removeFavoritesButton.classList.remove('hidden');
  addRemoveFavoritesListener();
}

function removeFromFavorites() {
  // Add logic to remove from localstorage
  addFavoritesButton.classList.remove('hidden');
  removeFavoritesButton.classList.add('hidden');
}

function addFavoritesListener() {
  addFavoritesButton.addEventListener('click', addToFavorites);
}

function addRemoveFavoritesListener() {
  removeFavoritesButton.addEventListener('click', removeFromFavorites);
}

function addRatingButtonListener(exerciseId) {
  addRatingButton.addEventListener('click', () => showRatingModal(exerciseId));
}

function showRatingModal(exerciseId) {
  exerciseModal.classList.add('hidden');
  initRatingForm(exerciseId);
}
