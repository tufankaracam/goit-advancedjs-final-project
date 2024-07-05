import { patchRating } from './patch-exercise-rating';
import { renderRatingForm, removeRatingModal } from './rating-form-markup';
import { showToast } from './toast';

let handleFormSubmitWrapper;
let selectedRating = 0;

export function initRatingForm(exerciseId) {
  renderRatingForm();
  addStarHoverEventListeners();
  addStarClickEventListener();
  addFormSubmitEventListener(exerciseId);
  addRatingCloseButtonListener();
}

function addRatingCloseButtonListener() {
  const ratingCloseBtn = getRatingModal().querySelector('#closeRatingButton');
  ratingCloseBtn.addEventListener('click', hideRatingModal);
}

function hideRatingModal() {
  exerciseModal.classList.remove('hidden');
  resetForm();
  removeFormSubmitEventListener();
  removeRatingModal();
}

function resetForm() {
  selectStars(0);
  selectedRating = 0;
  getRatingForm().reset();
}

function selectStars(rating) {
  const stars = getRatingModal().querySelectorAll('.icon-star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove('empty');
    } else {
      star.classList.add('empty');
    }
  });
  var r = rating.toFixed(1);
  const ratingValueElement = getRatingModal().querySelector('.rating-value');
  ratingValueElement.textContent = r;
}

function addStarHoverEventListeners() {
  const stars = getRatingModal().querySelectorAll('.icon-star');
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.getAttribute('data-value'), 10);
      selectStars(rating);
    });

    star.addEventListener('mouseout', () => {
      selectStars(selectedRating);
    });
  });
}

function addStarClickEventListener() {
  const stars = getRatingModal().querySelectorAll('.icon-star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'), 10);
      selectStars(selectedRating);
    });
  });
}

function handleFormSubmit(event, exerciseId) {
  event.preventDefault();

  if (selectedRating === 0) {
    showToast({
      type: 'error',
      title: 'Incorrect input',
      message: 'Please select the rating',
    });
    return;
  }

  const email = getRatingForm().querySelector('.rating-form-email').value;
  const comment = getRatingForm().querySelector('.rating-form-comment').value;

  const formData = {
    rate: selectedRating,
    email,
    review: comment,
  };

  patchRating(exerciseId, formData)
    .then(() => {
      hideRatingModal();
      showToast({
        type: 'success',
        title: 'Rating submitted',
        message: 'Thank you for leaving review!',
      });
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      showToast({
        type: 'error',
        title: 'Server error',
        message: 'Error submitting rating form',
      });
    });
}

function addFormSubmitEventListener(exerciseId) {
  handleFormSubmitWrapper = event => handleFormSubmit(event, exerciseId);
  getRatingForm().addEventListener('submit', handleFormSubmitWrapper);
}

function removeFormSubmitEventListener() {
  getRatingForm().removeEventListener('submit', handleFormSubmitWrapper);
}

function getRatingModal() {
  return document.getElementById('ratingModal');
}

function getRatingForm() {
  return document.getElementById('ratingForm');
}
