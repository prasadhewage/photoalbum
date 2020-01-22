import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadUserPhotos, saveSelectedPhotos, loadSavedPhotos, showSelectedImages, showUploadedImages } from "../../actions"
import HomeContainer from "./homeContainer";

const mapStateToProps = state => ({
    photosLoading: state.app.photos_loading,
    photoList: state.app.photoList,
    selectedPhotoList: state.app.selectedPhotoList,
    savedPhotosLoading: state.app.saved_photos_loading,
    savedPhotosList: state.app.savedPhotos,
    isSavedPhotosVisible: state.app.isSelectedPhotosVisible,
    isUploadedPhotosVisible: state.app.isUploadedPhotosVisible,
    isReorderPhotoGridVisible: state.app.isReorderPhotoGridVisible,
    savingPhotosToDB: state.app.saving_photos_to_db,
    isDBUpdated: state.app.db_updated,
  })

const mapDispatchToProps = dispatch => bindActionCreators({
    loadUserPhotos,
    loadSavedPhotos,
    showSelectedImages,
    showUploadedImages,
    saveSelectedPhotos,
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)