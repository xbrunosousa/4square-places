import {
  ADD_PHOTOS,
  ADD_VENUES,
  ADD_LOCATION,
  ACCESS_LOCATION
} from './../constants/actionTypes';

export const addPhotos = photos => ({
  type: ADD_PHOTOS,
  payload: photos
});

export const addVenues = venues => ({
  type: ADD_VENUES,
  payload: venues
});

export const addLocation = location => ({
  type: ADD_LOCATION,
  payload: location
});

export const accessLocation = accessLocation => ({
  type: ACCESS_LOCATION,
  payload: accessLocation
});
