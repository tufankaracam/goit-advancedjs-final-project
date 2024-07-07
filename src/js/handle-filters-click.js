import { createPagination } from './create-pagination';
import { showSearchForm } from './show-search-form';
import { setExerciseTitle } from './set-exercise-title';

export async function handleFiltersClick(method) {
  const filterButtons = Array.from(document.querySelectorAll('.btn-filter'));

  filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
      if (button.classList.contains('active')) {
        return;
      }

      const searchForm = document.querySelector('.form-search-exersises');
      searchForm.elements['search'].value = '';
      searchForm.classList.remove('is-hide');
      showSearchForm(false);
      setExerciseTitle('');

      filterButtons.forEach(button => button.classList.remove('active'));
      button.classList.add('active');

      const totalPages = await method({
        filter: button.dataset.category.replace(' ', '+'),
        page: 1,
      });

      createPagination({
        params: { filter: button.dataset.category.replace(' ', '+'), page: 1 },
        totalPages,
        method: method,
      });
    });
  });
}
