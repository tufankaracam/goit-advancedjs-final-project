/**create markup for category card
 * 
 * @param {object} data 
 * @returns {string}
 */
export const createCategoryMarkup = data =>
  data.map(({ filter = 'Not found', name = 'Not found', imgURL }) =>
      `<div class="category-wrap" name="${name}">
      <img class="category-img" src="${imgURL}" alt="${name}">
      <div class="category-text-wrap">
          <p class="category-title">${name}</p>
          <p class="category-subtitle">${filter}</p>
      </div>
  </div>`).join('');