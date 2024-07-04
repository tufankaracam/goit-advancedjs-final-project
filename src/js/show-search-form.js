export function showSearchForm(isShow) {
  const searchForm = document.querySelector('.form-search-exersises');
  if (isShow) {
    searchForm.classList.remove('is-hide');
    return;
  }
  //searchForm.reset();
  searchForm.classList.add('is-hide');
}