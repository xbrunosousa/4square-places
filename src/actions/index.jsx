import { ADD_ARTICLE } from "./../constants/actionTypes";

export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});
