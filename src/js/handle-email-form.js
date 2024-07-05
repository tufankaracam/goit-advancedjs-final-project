import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.footer-form');
  const emailInput = form.querySelector('.footer-form-input');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const email = emailInput.value;

    if (!validateEmail(email)) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid email address.',
        position: 'topRight'
      });
      return;
    }

    const formData = {
      email: email
    };

    console.log('Form Data:', formData);

    iziToast.success({
      title: 'Success',
      message: 'You have successfully subscribed!',
      position: 'topRight'
    });

    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());
  }
});
