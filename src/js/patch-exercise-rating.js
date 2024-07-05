import axios from 'axios';
import { constants } from './constants';

export async function patchRating(id, formData) {
  const { data } = await axios({
    method: 'patch',
    url: `${constants.DOMEN}/exercises/${id}/rating`,
    responseType: 'json',
    data: formData,
  });

  return data;
}
