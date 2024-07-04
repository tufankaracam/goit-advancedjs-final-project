import { handlePaginationClick } from './handle-pagination-click';

export function createPagination({ params, totalPages, method }) {
  const pagination = document.querySelector('.pagination');
  let buttons = '';

  const page = parseInt(params.page);
  /* for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button class="button${
        i == params.page ? ' active' : ''
      }" data-page="${i}">
        ${i}
      </button>
    `;
  } */

  //left arrow
  /* buttons += `
      <button class="button" data-page="${page - 1}" ${page == 1 && 'disabled'}>
        <
      </button>
    `; */

  if (page > 3) {
    buttons += `
      <button class="button${1 == page ? ' active' : ''}" data-page="${1}">
        ${1}
      </button>
    `;
  }

  if (page - 3 > 1) {
    buttons += `
        <button class="button" data-page="1" disabled>
          ...
        </button>
      `;
  }

  if (page > 2) {
    buttons += `
      <button class="button" data-page="${page - 2}">
        ${page - 2}
      </button>
    `;
  }

  if (page > 1) {
    buttons += `
      <button class="button" data-page="${page - 1}">
        ${page - 1}
      </button>
    `;
  }

  buttons += `
      <button class="button active" data-page="${page}">
        ${page}
      </button>
    `;

  if (page + 1 <= totalPages) {
    buttons += `
      <button class="button" data-page="${page + 1}">
        ${page + 1}
      </button>
    `;
  }

  if (page + 2 <= totalPages) {
    buttons += `
      <button class="button" data-page="${page + 2}">
        ${page + 2}
      </button>
    `;
  }

  if (page + 3 <= totalPages) {
    buttons += `
        <button class="button" data-page="1" disabled>
          ...
        </button>
      `;

    buttons += `
      <button class="button${
        totalPages == page ? ' active' : ''
      }" data-page="${totalPages}">
        ${totalPages}
      </button>
    `;
  }

  //right arrow
  /* buttons += `
      <button class="button" data-page="${page + 1}" ${
    page + 1 > totalPages && 'disabled'
  }>
        >
      </button>
    `; */

  pagination.innerHTML = buttons;
  handlePaginationClick({ params, pagination, method });
}
