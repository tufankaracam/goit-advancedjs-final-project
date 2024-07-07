import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showToast({ type, title, message, position = 'topRight' }) {
  switch (type) {
    case 'error':
      iziToast.error({
        title,
        message,
        position,
      });
      break;
    case 'success':
      iziToast.success({
        title,
        message,
        position,
      });
      break;
    case 'warning':
      iziToast.warning({
        title,
        message,
        position,
      });
      break;
    case 'info':
      iziToast.info({
        title,
        message,
        position,
      });
      break;
    default:
      console.warn('Unknown toast type:', type);
  }
}
