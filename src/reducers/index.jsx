import { ADD_ARTICLE } from './../constants/actionTypes';

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
  lng: undefined,
  lat: undefined,
  isLoading: false,
  errorLocate: false,
  code: undefined,
  venues: undefined,
  accessLocation: 'Permitir acesso à localização',
  fourSquareClientId: 'T2LPSOLZ5QN313AVWZIOFYMTENZFECV3I2H33V0Q435ANRED',
  fourSquareClientSecret: 'RZTUNDKJ12MBH1GR30YPHJU3RCRLR5VT20ELPYTQJ1XH3HUL',
  photosData: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
