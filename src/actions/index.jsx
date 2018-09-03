import { ADD_ARTICLE, ADD_PHOTOS } from "./../constants/actionTypes";

export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});

export const addPhotos = photos => ({
  type: ADD_PHOTOS,
  payload: photos
});
