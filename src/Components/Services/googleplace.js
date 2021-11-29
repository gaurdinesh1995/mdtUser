import {request} from './APICentral';

export const googlePlaces = (data) => {
  return request(
    {
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=`,
      method: 'POST',
      data,
    },
    true,
    false,
  );
};
