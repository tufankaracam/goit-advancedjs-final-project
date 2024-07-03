import axios from 'axios';
import { constants } from './constants';
import { createCategoryMarkup } from './category-card-markup';

export async function fetchCategories(params) {
  let filterParams = '?';
  const content = document.querySelector('.content');

  for (const [key, value] of Object.entries(params)) {
    filterParams += `${key}=${value}&`;
  }

  const { data } = await axios({
    method: 'get',
    url: `${constants.domen}/filters${filterParams}limit=12`,
    responseType: 'json',
  });

  content.innerHTML = createCategoryMarkup(data.results);

  return data.totalPages;
}
