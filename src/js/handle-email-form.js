import { showToast } from './toast';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.footer-form');
  const emailInput = form.querySelector('.footer-form-input');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const email = emailInput.value;

    if (!validateEmail(email)) {
      showToast(
        'error',
        'Error',
        'Please enter a valid email address.'
      );
      return;
    }

    showToast(
      'success',
      'Success',
      'You have successfully subscribed!'
    );

    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());
  }
});
