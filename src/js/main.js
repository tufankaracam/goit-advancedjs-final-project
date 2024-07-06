import { createPagination } from './create-pagination';
import { fetchAndSetQuote } from './fetch-and-set-quote';
import { fetchCategories } from './fetch-categories';
import { handleFiltersClick } from './handle-filters-click';
import { fetchExercises } from './fetch-exercises';
import { initIconPathObserver } from './icon-path-updater';
import { calcScrollValue } from './scroll-to-top';

import { setExerciseTitle } from './set-exercise-title';
import './handle-email-form';

const searchForm = document.querySelector('.form-search-exersises');
const content = document.querySelector('.content');
const scrollProgress = document.querySelector('.scroll-to-top');

const filter = 'Muscles';
const page = 1;
let catValue = '';

document.addEventListener('DOMContentLoaded', async () => {
  initIconPathObserver();

  fetchAndSetQuote();
  handleFiltersClick(fetchCategories);

  const totalPages = await fetchCategories({
    filter,
    page,
  });

  if (totalPages > 1) {
    createPagination({
      params: { filter, page },
      totalPages,
      method: fetchCategories,
    });
  }
});

searchForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const category = document.querySelector('.btn-filter.active').dataset.exercise;

  const totalPages = await fetchExercises({
    [category]: catValue,
    category,
    page,
  });
});

searchForm?.addEventListener('reset', async e => {
  e.preventDefault();
  e.target.querySelector('.input-search-exersises').value = '';
  await fetchExercises({
    value: catValue,
    page,
  });
});

content?.addEventListener('click', async e => {
  const item = e.target.closest('.category-wrap');
  if (!item) return;
  searchForm.classList.remove('is-hide');
  catValue = item.getAttribute('name');

  setExerciseTitle(catValue);
  await fetchExercises({
    value: catValue,
    page,
  });
  if (window.innerWidth < 768) {
    document.querySelector('.filter-title').scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelector('.toggle-btn-home').classList.add('active');
document.querySelector('.toggle-btn-favorites').classList.remove('active');

scrollProgress.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
});

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
