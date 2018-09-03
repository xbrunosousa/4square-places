import {
  ADD_ARTICLE,
  ADD_PHOTOS,
  ADD_VENUES,
  ADD_LOCATION,
  ACCESS_LOCATION
} from './../constants/actionTypes';

const initialState = {
  articles: [],
  toastDefaultProps: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  },
  venues: [],
  userLocation: {
    lng: undefined,
    lat: undefined
  },
  accessLocation: 'Permitir acesso à localização',
  fourSquareClientId: 'T2LPSOLZ5QN313AVWZIOFYMTENZFECV3I2H33V0Q435ANRED',
  fourSquareClientSecret: 'RZTUNDKJ12MBH1GR30YPHJU3RCRLR5VT20ELPYTQJ1XH3HUL',
  photosData: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    case ADD_PHOTOS:
      return { ...state, photosData: action.payload };
    case ADD_VENUES:
      return { ...state, venues: action.payload };
    case ADD_LOCATION:
      return { ...state, userLocation: action.payload };
    case ACCESS_LOCATION:
      return {...state, accessLocation: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
