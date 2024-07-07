import { constants } from './constants';
import { createExerciseMarkup } from './exercise-card-markup';
import { createPagination } from './create-pagination';
import { attachExerciseModalListeners, attachRemoveFavoriteListeners } from './modal-listener';

export function fetchFavorites(params) {
  const perPage = window.innerWidth > 1280 ? 10000 : window.innerWidth < 768 ? 8 : 10;
  const favoritesMap = JSON.parse(localStorage.getItem(constants.FAV_KEY)) ?? [];
  const exercises = Object.values(favoritesMap);
  if (exercises && exercises.length) {
    const start = params && params.page ? (parseInt(params.page) - 1) * perPage : 0;
    const slicedExercises = exercises.slice(start, start + perPage);
    document.querySelector('.content').innerHTML = createExerciseMarkup(slicedExercises, true);
    document.querySelector('.pagination').innerHTML = '';
    const totalPages = exercises.length > perPage ? Math.ceil(exercises.length / perPage) : 1;
    if (totalPages > 1) {
      createPagination({
        params: params,
        totalPages: totalPages,
        method: fetchFavorites,
      });
    }
    attachExerciseModalListeners();
    attachRemoveFavoriteListeners();
  } else {
    document.querySelector('.content').innerHTML = `<p class="empty">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites for easier access in the future.
      </p>`;
    document.querySelector('.pagination').innerHTML = '';
  }
}
