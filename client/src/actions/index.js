import { GET, POST } from '../services/http';

import {
  LOAD_PHOTOS,
  LOAD_PHOTOS_SUCCESS,
  LOAD_PHOTOS_FAIL,
  LOAD_SAVED_PHOTOS,
  LOAD_SAVED_PHOTOS_SUCCESS,
  LOAD_SAVED_PHOTOS_FAIL,
  TOGGLE_SELECTED_IMAGES_VIEW,
  TOGGLE_UPLOADED_IMAGES_VIEW,
  SAVE_SELECTED_PHOTO_LIST,
  SAVE_SELECTED_PHOTO_LIST_SUCCESS,
  SAVE_SELECTED_PHOTO_LIST_FAIL,
} from "../constants/actionTypes";

export const loadSavedPhotos = () => async dispatch => {
  dispatch({
    type: LOAD_SAVED_PHOTOS
  })

  try {

    const response = await GET('/api/photoGallery');
        const data = response.data.data;

        let arr = [];
        if (data.length) {
          arr = data;

          dispatch({
            type: LOAD_SAVED_PHOTOS_SUCCESS,
            savedPhotos: arr
          })
        } else {
          dispatch(loadUserPhotos())
        }


  } catch (err) {
    dispatch({
      type: LOAD_SAVED_PHOTOS_FAIL
    })
  }

};

export const loadUserPhotos = () => async dispatch => {
  dispatch({
    type: LOAD_PHOTOS
  })

  try {

    const response = await GET('/api/loadPhotos');
        const data = response.data;

        let arr = [];
        if (data) {
          arr = data.entries;
        }

        dispatch({
          type: LOAD_PHOTOS_SUCCESS,
          photoList: arr,
        })

  } catch (err) {
    dispatch({
      type: LOAD_PHOTOS_FAIL
    })
  }

};

export const saveSelectedPhotos = (dataList) => async dispatch => {
  dispatch({
    type: SAVE_SELECTED_PHOTO_LIST
  })

  try {
    const response = await POST('/api/savePhotoGallery', dataList);
        const data = response.data;

        let arr = [];
        if (data.length) {
          arr = data;
        }

        dispatch({
          type: SAVE_SELECTED_PHOTO_LIST_SUCCESS,
          savedPhotoList: arr,
        })

  } catch (err) {
    dispatch({
      type: SAVE_SELECTED_PHOTO_LIST_FAIL
    })
  }

};

export const showSelectedImages = () => dispatch => {
  return dispatch({ 
    type: TOGGLE_SELECTED_IMAGES_VIEW
  });
};

export const showUploadedImages = () => dispatch => {
  return dispatch({ 
    type: TOGGLE_UPLOADED_IMAGES_VIEW
  });
};