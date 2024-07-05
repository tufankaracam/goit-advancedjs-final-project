import axios from 'axios';
import { constants } from './constants';

import { createExerciseMarkup } from './exercise-card-markup';
import { createPagination } from './create-pagination';
import { showSearchForm } from './show-search-form';
import { showToast } from './toast';

export async function fetchExercises(params) {
  const category = document.querySelector('.btn-filter.active').dataset.exercise;

  if (params?.value) {
    params[category] = params?.value;
  }

  const keyword = document.querySelector('.input-search-exersises').value;
  params.keyword = keyword;

  showSearchForm(true);

  let filterParams = '?';
  const content = document.querySelector('.content');
  const loader = document.querySelector('.loader-text');
  loader.style.display = 'block';

  for (const [key, value] of Object.entries(params)) {
    filterParams += `${key}=${value}&`;
  }
  try {
    const { data } = await axios({
      method: 'get',
      url: `${constants.DOMEN}/exercises${filterParams}limit=${window.innerWidth < 768 ? 8 : 10}`,
      responseType: 'json',
    });

    content.innerHTML = createExerciseMarkup(data.results);

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    if (data.totalPages > 1) {
      createPagination({
        params: params,
        totalPages: data?.totalPages,
        method: fetchExercises,
      });
    }
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Server error',
      message: 'Sorry, the exercises information was not retrieved from the server. Please refresh the page',
    });
  } finally {
    loader.style.display = 'none';
  }
}
