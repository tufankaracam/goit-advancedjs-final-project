import axios from 'axios';
import { constants } from './constants';
import { showToast } from './toast';

export async function fetchQuote() {
  const loader = document.querySelector('.loader-text');
  loader.style.display = 'block';
  try {
    const { data } = await axios({
      method: 'get',
      url: `${constants.domen}/quote`,
      responseType: 'json',
    });

    return data;
  } catch (error) {
    showToast({
      type: 'info',
      title: 'Server error',
      message: 'Sorry, today quote was not retrieved from the server. But previous one was pretty good',
    });
    return {
      author: "Shaquille O'Neal",
      quote: 'Excellence is not a singular act but a habit. You are what you do repeatedly.',
    };
  } finally {
    loader.style.display = 'none';
  }
}
