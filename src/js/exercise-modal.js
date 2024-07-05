import { fetchExercise } from './fetch-exercise';

const modal = document.getElementById('exerciseModal');
const closeButton = document.getElementById('closeButton');
const addFavoritesButton = document.getElementById('addFavoritesButton');
const removeFavoritesButton = document.getElementById('removeFavoritesButton');

export async function openModal(exerciseId) {
  let exerciseData;
  try {
    exerciseData = await fetchExercise(exerciseId);
    renderModal(exerciseData);
    addCloseButtonListener();
    addFavoritesListener();
  } catch (error) {}
}

function renderModal(exerciseData) {
  document.querySelector('.exercise-header h2').textContent = exerciseData.name;
  document.querySelector('.rating-value').textContent = exerciseData.rating.toFixed(1);
  document.querySelector('.exercise-image').src = exerciseData.gifUrl;
  document.querySelector('.exercise-image').alt = exerciseData.name;
  document.querySelector('.target-value-js').innerHTML = exerciseData.target;
  document.querySelector('.body-part-value-js').innerHTML = exerciseData.bodyPart;
  document.querySelector('.equipment-value-js').innerHTML = exerciseData.equipment;
  document.querySelector('.popularity-value-js').innerHTML = exerciseData.popularity;
  document.querySelector('.calories-value-js').innerHTML = `${exerciseData.burnedCalories}/${exerciseData.time} min`;
  document.querySelector('.exercise-description').textContent = exerciseData.description;
  renderStars(exerciseData.rating);
  showModal();
}

function renderStars(rating) {
  document.querySelectorAll('.icon-star').forEach((star, index) => {
    star.classList.toggle('empty', index >= Math.round(rating));
  });
}

function showModal() {
  modal.classList.remove('hidden');
}

function hideModal() {
  modal.classList.add('hidden');
}

function addCloseButtonListener() {
  closeButton.addEventListener('click', hideModal);
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
