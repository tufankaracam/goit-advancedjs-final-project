export function setExerciseTitle(text) {
    const title = document.querySelector('.js-title');
    const titleSlash = document.querySelector('.js-title-slash');

    

    if(text === '') {
      title.classList.add('is-hide');
      titleSlash.classList.add('is-hide');
      return;
    }

    title.textContent = text;
    title.classList.remove('is-hide');
    titleSlash.classList.remove('is-hide');
  }