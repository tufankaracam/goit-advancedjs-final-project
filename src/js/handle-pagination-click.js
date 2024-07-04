export function handlePaginationClick({ params, pagination, method }) {
  const buttons = Array.from(pagination.querySelectorAll('.button'));
  let currentPage = 1;

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      currentPage = button.dataset.page;
      method({
        ...params,
        page: currentPage,
      });
      buttons.forEach(button => button.classList.remove('active'));
      button.classList.add('active');
    });
  });
}
