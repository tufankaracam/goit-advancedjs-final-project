import { fetchFavorites } from './fetch-favorites';
import { fetchAndSetQuote } from './fetch-and-set-quote';

window.onload = () => {
  const loader = document.querySelector('.loader-text');
  loader.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', async () => {
  fetchAndSetQuote();
  fetchFavorites({ page: 1 });
});

document.querySelector('.toggle-btn-home').classList.remove('active');
document.querySelector('.toggle-btn-favorites').classList.add('active');
