import { fetchExercise } from './fetch-exercise';
import { initFavoritesButtons } from './init-favorites-buttons';
import { initRatingForm } from './rating-form';
import { renderExcerciseModal } from './exercise-modal-markup';
import { showToast } from './toast';

let modalOverlay;
let exerciseModal;
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
  renderExcerciseModal(exerciseData);
  popualteSelectors(exerciseData);
  showOverlay();
  addExerciseCloseButtonListener();
  addRatingButtonListener(exerciseId);
  initFavoritesButtons();
}

function popualteSelectors() {
  modalOverlay = document.getElementById('modalOverlay');
  exerciseModal = document.getElementById('exerciseModal');
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

function addRatingButtonListener(exerciseId) {
  addRatingButton.addEventListener('click', () => showRatingModal(exerciseId));
}

function showRatingModal(exerciseId) {
  exerciseModal.classList.add('hidden');
  initRatingForm(exerciseId);
}
