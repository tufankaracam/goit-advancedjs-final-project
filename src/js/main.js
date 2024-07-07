import { createPagination } from './create-pagination';
import { fetchAndSetQuote } from './fetch-and-set-quote';
import { fetchCategories } from './fetch-categories';
import { handleFiltersClick } from './handle-filters-click';
import { fetchExercises } from './fetch-exercises';
import { initIconPathObserver } from './icon-path-updater';
import { calcScrollValue } from './scroll-to-top';
import { showSearchForm } from './show-search-form';
import { setExerciseTitle } from './set-exercise-title';
import './handle-email-form';

const searchForm = document.querySelector('.form-search-exersises');
const content = document.querySelector('.content');
const scrollProgress = document.querySelector('.scroll-to-top');
const breadcrumb = document.querySelector('.breadcrumb');

let filter = 'Muscles';
const page = 1;
let catValue = '';

window.onload = () => {
  const loader = document.querySelector('.loader-text');
  loader.style.display = 'none';
};

async function fetchCategoriesSetPagination() {
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
}

document.addEventListener('DOMContentLoaded', async () => {
  initIconPathObserver();

  fetchAndSetQuote();
  handleFiltersClick(fetchCategories);
  fetchCategoriesSetPagination();

  breadcrumb?.addEventListener('click', e => {
    if (!breadcrumb.classList.contains('clickable')) {
      return;
    }

    filter = breadcrumb.dataset.category;

    fetchCategoriesSetPagination();
    showSearchForm(false);
    setExerciseTitle('');
    breadcrumb.classList.remove('clickable');
  });
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
  breadcrumb?.classList.add('clickable');
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
