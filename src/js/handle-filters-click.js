import axios from 'axios';
import { constants } from './constants';
import { createPagination } from './create-pagination';

export async function handleFiltersClick(method) {
  const filterButtons = Array.from(document.querySelectorAll('.btn-filter'));

  filterButtons.forEach(button => {
    button.addEventListener('click', async() => {
      if (!button.classList.contains('active')) {
        filterButtons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');

        const totalPages = await method({
          filter: button.dataset.category.replace(' ', '+'),
          page: 1,
        });

        createPagination({
          filter: button.dataset.category.replace(' ', '+'),
          page: 1,
          totalPages,
          method: method,
        });
      }
    });
  });
}
