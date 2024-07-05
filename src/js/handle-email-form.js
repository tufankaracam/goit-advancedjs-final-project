import { showToast } from './toast';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.footer-form');
  const emailInput = form?.querySelector('.footer-form-input');

  form?.addEventListener('submit', event => {
    event.preventDefault();

    const email = emailInput.value;

    if (!validateEmail(email)) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Please enter a valid email address.',
      });

      return;
    }

    showToast({
      type: 'success',
      title: 'Success',
      message: 'You have successfully subscribed!',
    });

    console.log('SENT TO THE SERVER:', email);

    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());
  }
});
