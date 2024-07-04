import axios from 'axios';
import { constants } from './constants';

export async function fetchExercise(id) {
  const { data } = await axios({
    method: 'get',
    url: `${constants.domen}/exercises/${id}`,
    responseType: 'json',
  });

  return data;
}
