import { createPagination } from './create-pagination';
import { showSearchForm } from './show-search-form';
import { setExerciseTitle } from './set-exercise-title';

export async function handleFiltersClick(method) {
  const filterButtons = Array.from(document.querySelectorAll('.btn-filter'));
  const breadcrumb = document.querySelector('.breadcrumb');

  filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
      if (button.classList.contains('active')) {
        return;
      }

      const searchForm = document.querySelector('.form-search-exersises');
      const filter = button.dataset.category.replace(' ', '+');
      searchForm.elements['search'].value = '';
      searchForm.classList.remove('is-hide');
      showSearchForm(false);
      setExerciseTitle('');
      breadcrumb.classList.remove('clickable');
      breadcrumb.dataset.category = filter;

      filterButtons.forEach(button => button.classList.remove('active'));
      button.classList.add('active');

      const totalPages = await method({
        filter,
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
