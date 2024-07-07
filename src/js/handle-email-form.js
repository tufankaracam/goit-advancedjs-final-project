import axios from 'axios';
import { showToast } from './toast';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.footer-form');
  const emailInput = form?.querySelector('.footer-form-input');

  form?.addEventListener('submit', async event => {
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

    try {
      const response = await axios.post('https://your-energy.b.goit.study/api/subscription', { email });

      showToast({
        type: 'success',
        title: 'Success',
        message: response.data.message,
      });
    } catch (error) {
      if (error.response) {
        handleErrorResponse(error.response.status, error.response.data.message);
      } else {
        showToast({
          type: 'error',
          title: 'Error',
          message: 'An unexpected error occurred. Please try again later.',
        });
      }
    }

    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function handleErrorResponse(status, message) {
    switch (status) {
      case 400:
        showToast({
          type: 'error',
          title: 'Bad Request',
          message: 'Invalid request body. Please check your input.',
        });
        break;
      case 404:
        showToast({
          type: 'error',
          title: 'Not Found',
          message: 'The requested resource could not be found.',
        });
        break;
      case 409:
        showToast({
          type: 'warning',
          title: 'Already Subscribed',
          message: 'You are already subscribed to this service.',
        });
        break;
      case 500:
        showToast({
          type: 'error',
          title: 'Server Error',
          message: 'There was a problem with the server. Please try again later.',
        });
        break;
      default:
        showToast({
          type: 'error',
          title: 'Error',
          message: message || 'An unexpected error occurred. Please try again later.',
        });
    }
  }
});
