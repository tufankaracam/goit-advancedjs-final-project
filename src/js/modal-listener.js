import { openModal } from './exercise-modal';
import { removeFromFavorites } from './init-favorites-buttons';

export function attachExerciseModalListeners() {
  const modalExerciseInfoButtons = document.querySelectorAll('.modal-exercise-info');
  modalExerciseInfoButtons.forEach(button => {
    button.addEventListener('click', () => {
      openModal(button.id);
    });
  });
}

export function attachRemoveFavoriteListeners() {
  const removeFromFavoritesButtons = document.querySelectorAll('.js-delete-favorite');
  removeFromFavoritesButtons.forEach(button => {
    button.addEventListener('click', removeFromFavorites);
  });
}
