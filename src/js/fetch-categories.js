import axios from 'axios';
import { constants } from './constants';
import { createCategoryMarkup } from './category-card-markup';
import { showToast } from './toast';

export async function fetchCategories(params) {
  let filterParams = '?';
  const content = document.querySelector('.content');
  const loader = document.querySelector('.loader-text');
  loader.style.display = 'inline-block';

  for (const [key, value] of Object.entries(params)) {
    filterParams += `${key}=${value}&`;
  }

  try {
    const response = await axios({
      method: 'get',
      url: `${constants.DOMEN}/filters${filterParams}limit=${window.innerWidth < 768 ? 9 : 12}`,
      responseType: 'json',
    });

    content.innerHTML = createCategoryMarkup(response.data.results);
    return response.data.totalPages;
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Server error',
      message: 'Sorry, the category information was not retrieved from the server. Please refresh the page',
    });
  } finally {
    loader.style.display = 'none';
  }
}
