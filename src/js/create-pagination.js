import { handlePaginationClick } from './handle-pagination-click';

export function createPagination({ filter, page, totalPages, method }) {
  const pagination = document.querySelector('.pagination');
  let buttons = '';

  for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button class="button${i === 1 ? ' active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  pagination.innerHTML = buttons;
  handlePaginationClick({ filter, page, pagination, method });
}
