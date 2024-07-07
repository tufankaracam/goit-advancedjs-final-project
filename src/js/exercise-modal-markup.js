export function renderExcerciseModal(exerciseData) {
  const container = document.getElementById('modalOverlay');
  const burnedCalories = `${exerciseData.burnedCalories}/${exerciseData.time} min`;
  const target = capitalizeFirst(exerciseData.target);
  const bodyPart = capitalizeFirst(exerciseData.bodyPart);
  const exerciseTitle = capitalizeFirst(exerciseData.name);
  const ratingValue = exerciseData.rating.toFixed(1);
  const exerciseModalHTML = `
    <div class="modal-window" id="exerciseModal">
    <span class="close-button icon-x" id="closeExerciseButton"></span>
    <div class="exercise-wrapper">
      <img src="${exerciseData.gifUrl}" alt="${exerciseTitle}" class="exercise-image">
      <div class="exercise-details">
        <div class="exercise-header">
          <h2 class="exercise-title-js" data-value="${exerciseTitle}">${exerciseTitle}</h2>
          <div class="rating">
            <span class="rating-value rating-value-js" data-value="${ratingValue}">${ratingValue}</span>
            <span class="icon-star"></span>
            <span class="icon-star"></span>
            <span class="icon-star"></span>
            <span class="icon-star"></span>
            <span class="icon-star"></span>
          </div>
        </div>
        <ul class="exercise-info">
          <li class="details-column">
            <div class="details-title">Target</div>
            <div class="details-value details-target-js" data-value="${target}">${target}</div>
          </li>
          <li class="details-column">
            <div class="details-title">Body Part</div>
            <div class="details-value details-body-part-js" data-value="${bodyPart}">${bodyPart}</div>
          </li>
          <li class="details-column">
            <div class="details-title">Equipment</div>
            <div class="details-value">${capitalizeFirst(exerciseData.equipment)}</div>
          </li>
          <li class="details-column">
            <div class="details-title">Popular</div>
            <div class=" details-value">${exerciseData.popularity}</div>
          </li>
          <li class="details-column">
            <div class="details-title">Burned Calories</div>
            <div class="details-value details-burned-calories-js" data-value="${burnedCalories}">${burnedCalories}</div>
          </li>
        </ul>
        <p class="exercise-description">${exerciseData.description}</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="add-favorites-btn" id="addFavoritesButton" data-id="${exerciseData._id}">Add to favorites<span
          class="icon-heart"></span></button>
      <button class="remove-favorites-btn hidden" id="removeFavoritesButton" data-id="${exerciseData._id}">Remove from favorites<span
          class="icon-trash"></span></button>
      <button class="give-rating-btn" id="addRatingButton">Give a rating</button>
    </div>
  </div>
  `;

  container.insertAdjacentHTML('beforeend', exerciseModalHTML);
  renderStars(exerciseData.rating);
}

function renderStars(rating) {
  exerciseModal.querySelectorAll('.icon-star').forEach((star, index) => {
    star.classList.toggle('empty', index >= Math.round(rating));
  });
}

function capitalizeFirst(str) {
  str = String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}
