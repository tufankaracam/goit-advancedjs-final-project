export function handlePaginationClick({ filter, page, pagination, method }) {
  const buttons = Array.from(pagination.querySelectorAll('.button'));
  let curentPage = page;

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      if (!button.classList.contains('active')) {
        curentPage = button.dataset.page;
        method({
          filter,
          page: curentPage,
        });
        buttons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });
}
