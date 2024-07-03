/**create markup for category card
 * 
 * @param {object} data 
 * @returns {string}
 */
export const createCategoryMarkup = (data) =>
    data.map(({ filter = 'Not found', name = 'Not found', imgURL }) =>
        `<div class="category_wrap" name="${name}"">
        <img class="category_img" src="${imgURL}" alt="${name}">
        <div class="category_text_wrap">
            <p class="category_title">${name}</p>
            <p class="category_subtitle">${filter}</p>
        </div>
    </div>`).join('');