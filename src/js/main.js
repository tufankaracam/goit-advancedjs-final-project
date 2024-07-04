import { createPagination } from './create-pagination';
import { fetchAndSetQuote } from './fetch-and-set-quote';
import { fetchCategories } from './fetch-categories';
import { fetchExercises } from './fetch-exercises';

const searchForm = document.querySelector('.form-search-exersises');
const content = document.querySelector('.content');
/* document.querySelector('[data-btn="muscles"]').classList.remove('active');
document.querySelector('[data-btn="bodypart"]').classList.add('active'); */
const filterTabs = document.querySelector('.list-filter-exersises');


const filter = 'Muscles';
let page = 1;
let muscles = '';
let keyword = '';

document.addEventListener('DOMContentLoaded', async () => {
  fetchAndSetQuote();
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


searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const input = e.target.querySelector('.input-search-exersises');
  keyword = input.value;

  const totalPages = await fetchExercises({
    filter,
    muscles,
    keyword,
    page,
  });

});

content.addEventListener('click', async e => {
  const item = e.target.closest('.category-wrap');

  if (!item) return;
  searchForm.classList.remove('is-hide');
  muscles = item.getAttribute('name');


  const totalPages = await fetchExercises({
    filter,
    muscles,
    keyword,
    page,
  });
});

filterTabs.addEventListener('click', async e => {
  const item = e.target.dataset.btn;
  if (!item) return;

  if(item === 'muscles') {
    e.target.classList.add('active');
    keyword = '';
    searchForm.reset();
    searchForm.classList.add('is-hide');
    document.querySelector('[data-btn="bodypart"]').classList.remove('active');
  }
  

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
