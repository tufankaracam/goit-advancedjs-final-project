import axios from 'axios';
import { constants } from './constants';

import { createExerciseMarkup } from './exercise-card-markup';
import { createPagination } from './create-pagination';

export async function fetchExercises(params) {

  const { filter, muscles, keyword, page } = params;
  let filterParams = '?';
  const content = document.querySelector('.content');

  for (const [key, value] of Object.entries(params)) {
    filterParams += `${key}=${value}&`;
  }

  const { data } = await axios({
    method: 'get',
    url: `${constants.domen}/exercises${filterParams}limit=10`,
    responseType: 'json',
  });

  content.innerHTML = createExerciseMarkup(data.results);

  const titleExercise = document.querySelector('.js-title');
  const titleExerciseSlash = document.querySelector('.js-title-slash');

  titleExercise.textContent = muscles;
  titleExercise.classList.remove('is-hide');
  titleExerciseSlash.classList.remove('is-hide');

  

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (data.totalPages > 1) {
    createPagination({
      params: {
        filter,
        muscles,
        keyword,
        page,
      },
      totalPages: data?.totalPages,
      method: fetchExercises,
    });
  }
}
