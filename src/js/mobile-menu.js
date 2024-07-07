import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const overlay = document.querySelector('.js-mobile-overlay');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const openMenu = () => {
    mobileMenu.classList.add('is-opening');
    overlay.classList.remove('hidden');
    disableBodyScroll(mobileMenu);

    setTimeout(() => {
      mobileMenu.classList.add('is-open');
      mobileMenu.classList.remove('is-opening');
    }, 50);
  };

  const closeMenu = () => {
    mobileMenu.classList.add('is-closing');
    setTimeout(() => {
      mobileMenu.classList.remove('is-open', 'is-closing');
      enableBodyScroll(mobileMenu);
      overlay.classList.add('hidden');
    }, 250);
  };

  openMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });
})();
