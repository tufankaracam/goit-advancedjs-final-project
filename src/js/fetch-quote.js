import axios from 'axios';
import { constants } from './constants';

export async function fetchQuote() {
  const { data } = await axios({
    method: 'get',
    url: `${constants.domen}/quote`,
    responseType: 'json',
  });

  return data;
}
