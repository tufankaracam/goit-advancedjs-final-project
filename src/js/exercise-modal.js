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
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Server error',
      message: 'Error fetching exercise data',
    });
  }
  await renderExcerciseModal(exerciseData);
  popualteSelectors(exerciseData);
  showOverlay();
  addExerciseCloseButtonListener();
  addRatingButtonListener(exerciseId);
  initFavoritesButtons(exerciseId);
  addModalOverlayClickListener();
  addEscapeKeyListener();
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
  document.body.classList.add('modal-open');
}

function hideOverlay() {
  document.getElementById('exerciseModal').remove();
  document.body.classList.remove('modal-open');
  modalOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escapeKeyListener);
  modalOverlay.removeEventListener('click', modalOverlayClickHandler);
}

function addExerciseCloseButtonListener() {
  const exerciseCloseBtn = exerciseModal.querySelector('#closeExerciseButton');
  exerciseCloseBtn.addEventListener('click', hideOverlay);
}

function addRatingButtonListener(exerciseId) {
  addRatingButton.addEventListener('click', () => showRatingModal(exerciseId));
}

function showRatingModal(exerciseId) {
  exerciseModal.classList.add('hidden');
  initRatingForm(exerciseId);
}

function addModalOverlayClickListener() {
  modalOverlay.addEventListener('click', modalOverlayClickHandler);
}

function modalOverlayClickHandler(event) {
  if (event.target === modalOverlay) {
    hideOverlay();
  }
}

function addEscapeKeyListener() {
  document.addEventListener('keydown', escapeKeyListener);
}

function escapeKeyListener(event) {
  if (event.key === 'Escape') {
    hideOverlay();
  }
}
