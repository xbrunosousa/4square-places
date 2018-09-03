import store from './../store/index';
import format from 'date-fns/format';

const date = format(new Date(), 'YYYYMMDD');

const getVenues = `https://api.foursquare.com/v2/venues/search?ll=${
  store.getState().userLocation.lat
},${store.getState().userLocation.lng}&client_id=${
  store.getState().fourSquareClientId
}&client_secret=${store.getState().fourSquareClientSecret}&limit=10&v=${date}`;

export default getVenues