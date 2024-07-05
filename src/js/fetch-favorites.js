import axios from 'axios';
import { constants } from './constants';
import { createExerciseMarkup } from './exercise-card-markup';
import { createPagination } from './create-pagination';

export async function fetchFavorites(params) {
  const { data } = await axios({
    method: 'get',
    url: `${constants.DOMEN}/exercises?page=1&limit=10000`,
    responseType: 'json',
  });
  const perPage = 4;
  const exersises = data.results;
  const favorites = JSON.parse(localStorage.getItem(constants.FAV_KEY)) ?? [];
  if (exersises && favorites && favorites.length) {
    const filteredExersises = exersises.filter(item => favorites.includes(item._id));
    const start = params && params.page ? (parseInt(params.page) - 1) * perPage : 0;
    const slicedExercises = filteredExersises.slice(start, start + perPage);
    document.querySelector('.content').innerHTML = createExerciseMarkup(slicedExercises, true);
    document.querySelector('.pagination').innerHTML = '';
    const totalPages = filteredExersises.length > perPage ? Math.ceil(filteredExersises.length / perPage) : 1;
    if (totalPages > 1) {
      createPagination({
        params: params,
        totalPages: totalPages,
        method: fetchFavorites,
      });
    }
  } else {
    document.querySelector('.content').innerHTML = '';
    document.querySelector('.pagination').innerHTML = '';
  }
}
