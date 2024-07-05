import axios from 'axios';
import { constants } from './constants';

import { createExerciseMarkup } from './exercise-card-markup';
import { createPagination } from './create-pagination';
import { showSearchForm } from './show-search-form';

export async function fetchExercises(params) {
  const category =
    document.querySelector('.btn-filter.active').dataset.exercise;

  if (params?.value) {
    params[category] = params?.value;
  }

  const keyword = document.querySelector('.input-search-exersises').value;
  params.keyword = keyword;

  showSearchForm(true);

  let filterParams = '?';
  const content = document.querySelector('.content');

  for (const [key, value] of Object.entries(params)) {
    filterParams += `${key}=${value}&`;
  }

  const { data } = await axios({
    method: 'get',
    url: `${constants.domen}/exercises${filterParams}limit=${
      window.innerWidth < 768 ? 8 : 10
    }`,
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
}
