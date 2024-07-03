import { createPagination } from './create-pagination';
import { fetchAndSetQuote } from './fetch-and-set-quote';
import { fetchCategories } from './fetch-categories';

document.addEventListener('DOMContentLoaded', async () => {
  const filter = 'Muscles';
  const page = 1;
  fetchAndSetQuote();
  const totalPages = await fetchCategories({
    filter,
    page,
  });

  if(totalPages > 1) {
    createPagination({
      filter,
      page,
      totalPages,
      method: fetchCategories,
    });
  }
});
