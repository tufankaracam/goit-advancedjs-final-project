import { constants } from './constants';
import { fetchFavorites } from './fetch-favorites';

let addFavoritesButton;
let removeFavoritesButton;

export function initFavoritesButtons() {
  addFavoritesButton = document.getElementById('addFavoritesButton');
  removeFavoritesButton = document.getElementById('removeFavoritesButton');
  addFavoritesButton.addEventListener('click', addToFavorites);
  removeFavoritesButton.addEventListener('click', removeFromFavorites);
  const favorites = JSON.parse(localStorage.getItem(constants.FAV_KEY)) ?? [];
  const exerciseId = addFavoritesButton.dataset.id;
  if (exerciseId && favorites.includes(exerciseId)) {
    showRemoveFavoritesButton();
  } else {
    showAddFavoritesButton();
  }
}

function addToFavorites(e = null, id = null, toggleButton = true) {
  const favorites = JSON.parse(localStorage.getItem(constants.FAV_KEY)) ?? [];
  const exerciseId = id ? id : addFavoritesButton.dataset.id;
  if (exerciseId && !favorites.includes(exerciseId)) {
    favorites.push(addFavoritesButton.dataset.id);
    localStorage.setItem(constants.FAV_KEY, JSON.stringify(favorites));
    if (toggleButton) {
      showRemoveFavoritesButton();
    }
    if (currentPageIsFavorites()) {
      fetchFavorites({ page: 1 });
    }
  }
}

export function removeFromFavorites(e = null, id = null, toggleButton = true) {
  const favorites = JSON.parse(localStorage.getItem(constants.FAV_KEY)) ?? [];
  const exerciseId = id ? id : removeFavoritesButton.dataset.id;
  if (exerciseId && favorites.includes(exerciseId)) {
    const filteredFavorites = favorites.filter(item => item !== exerciseId);
    localStorage.setItem(constants.FAV_KEY, JSON.stringify(filteredFavorites));
    if (toggleButton) {
      showAddFavoritesButton();
    }
    if (currentPageIsFavorites()) {
      fetchFavorites({ page: 1 });
    }
  }
}

function showAddFavoritesButton() {
  addFavoritesButton.classList.remove('hidden');
  removeFavoritesButton.classList.add('hidden');
}

function showRemoveFavoritesButton() {
  addFavoritesButton.classList.add('hidden');
  removeFavoritesButton.classList.remove('hidden');
}

function currentPageIsFavorites() {
  return document.querySelector('body').classList.contains('js-favorites');
}