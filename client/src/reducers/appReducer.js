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
} from '../constants/actionTypes';

const initialState = {
    photos_loading: null,
    photoList: null,
    selectedPhotoList: {},
    saved_photos_loading: null,
    savedPhotos: null,
    isSelectedPhotosVisible: false,
    isUploadedPhotosVisible: false,
    isReorderPhotoGridVisible: false,
    saving_photos_to_db: false,
    db_updated: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SAVED_PHOTOS:
            return { ...state, saved_photos_loading: true, isSelectedPhotosVisible: true, isUploadedPhotosVisible: false, isReorderPhotoGridVisible: false};

        case LOAD_SAVED_PHOTOS_SUCCESS:
            return { ...state, saved_photos_loading: false, savedPhotos: action.savedPhotos, isSelectedPhotosVisible: true};

        case LOAD_SAVED_PHOTOS_FAIL:
            return { ...state, saved_photos_loading: false, isSelectedPhotosVisible: false };

        case LOAD_PHOTOS:
            return { ...state, photos_loading: true, isUploadedPhotosVisible: true, isSelectedPhotosVisible: false, isReorderPhotoGridVisible: false};

        case LOAD_PHOTOS_SUCCESS:
            return { ...state, photos_loading: false, photoList: action.photoList, isUploadedPhotosVisible: true};

        case LOAD_PHOTOS_FAIL:
            return { ...state, photos_loading: false, isUploadedPhotosVisible: true};

        case SAVE_SELECTED_PHOTO_LIST:
            return { ...state, saving_photos_to_db: true};

        case SAVE_SELECTED_PHOTO_LIST_SUCCESS:
            return { ...state, saving_photos_to_db: false, db_updated: true};

        case SAVE_SELECTED_PHOTO_LIST_FAIL:
            return { ...state, saving_photos_to_db: false, db_updated: false };

        case TOGGLE_UPLOADED_IMAGES_VIEW:
            return { ...state, isReorderPhotoGridVisible: false, isSelectedPhotosVisible: false, isUploadedPhotosVisible: true };

        case TOGGLE_SELECTED_IMAGES_VIEW:
            return { ...state, isReorderPhotoGridVisible: true, isSelectedPhotosVisible: false, isUploadedPhotosVisible: false };

        default:
            return state;
    }
}

export default appReducer;