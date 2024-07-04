import { createPagination } from './create-pagination';
import { fetchAndSetQuote } from './fetch-and-set-quote';
import { fetchCategories } from './fetch-categories';
// import { fetchExcercises } from './fetch-excercises';
import { handleFiltersClick } from './handle-filters-click';

document.addEventListener('DOMContentLoaded', async () => {
  const filter = 'Muscles';
  const page = 1;
  const method = fetchCategories;

  fetchAndSetQuote();
  // if (isExcercisesPage) {
  //   method = fetchExcercises;
  // }
  handleFiltersClick(method);

  const totalPages = await method({
    filter,
    page,
  });

  createPagination({
    filter,
    page,
    totalPages,
    method: method,
  });
});
