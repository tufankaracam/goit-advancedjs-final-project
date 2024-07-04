/**create markup for exercises cards
 * if isFavorite is true - will be create card in Favorite page
 * if isFavorite is false - will be create card in the Home page
 *
 * @param {object} data
 * @param {boolean} isFavorite
 * @returns {string}
 */
export const createExerciseMarkup = (data, isFavorite = false) => {
    if (data.length === 0) {
        return `<p class="not-found-message">No results found.</p>`;
      } else {
        return data.map(({ _id, name, burnedCalories, rating, target, time, bodyPart
        }) => `<div class="exercises-container">
                <div class="exercises-header">
                    <div class="exercises-workout-ratio">
                        <div class="exercises-workout">WORKOUT</div>
                        ${isFavorite ? toggleExercisesCard() : toggleExercisesCard(rating)}
                    </div>
                    <button class="modal-exercise-info" type="button" id="${_id}">
                        <span>Start</span>
                        <svg class="icon-arrow" width="16" height="16">
                            <use href="./img/icons.svg#icon-arrow"></use>
                        </svg>
                    </button>
                </div>
                <div class="exercises-title">
                    <svg class="run-icon" width="24" height="24">
                        <use href="./img/icons.svg#icon-run"></use>
                    </svg>
                    <p class="exercises-name">${name}</p>
                </div>
                <div class="exercises-info">
                    <div class="exercises-info-item">
                        <p class="exercises-info-title">Burned calories:</p>
                        <p class="exercises-info-value burned-calories">${burnedCalories} / ${time} min</p>
                    </div>
                    <div class="exercises-info-item">
                        <p class="exercises-info-title">Body part:</p>
                        <p class="exercises-info-value body-part">${bodyPart}</p>
                    </div>
                    <div class="exercises-info-item">
                        <p class="exercises-info-title">Target:</p>
                        <p class="exercises-info-value target">${target}</p>
                    </div>
                </div>
            </div>
        </div>`).join('');
      }
}




/**choose markup for exercise's card depend on:
 *  if it's the Favorite page or Home
 *  and
 * -if rating is null - will be create trash button
 * -if rating is not null - will be create ratio
 *
 * @param {number} rating
 * @returns {string}
 */
function toggleExercisesCard(rating = null) {
  if (rating || rating === 0) {
    return `<div class="exercises-ratio">
      <p class="ratio-value">${convertRating(rating)}</p>
      <svg class="ratio-star" width="18" height="18">
          <use href="./img/icons.svg#icon-star"></use>
      </svg>
      </div>`;
  }
  return `<button class="trash-btn js-delete-favorite" type="button">
    <svg class="trash-icon" width="16" height="16">
        <use href="./img/icons.svg#icon-trash"></use>
    </svg>
    </button>`;
}

/**convert rating to 0.0 template
 *
 * @param {number} rating
 * @returns {string}
 */
function convertRating(rating) {
    return rating % 1 ? `${Math.round(rating * 10) / 10}` : `${rating}.0`;
}
