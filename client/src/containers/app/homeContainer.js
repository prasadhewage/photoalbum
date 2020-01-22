import React from 'react';
import Photo from '../../components/photo';
import PhotoGrid from '../../components/selectedPhotos';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPhotos: {},
            selectedPhotosList: [],
            listOfImagesSelected: [],
            maxNumberOfImagesSelected: false,
            isUploadedPhotosVisible: true,
            isReorderPhotoGridVisible: false
        }

        this.selectableMaxNumberOfPhotos = 9;
    }

    /**
     * load uploaded pictures on component mount
     */
    componentDidMount() {
        this.props.loadSavedPhotos();
    }

    /**
     * update state with selected photos
     */
    handleOnPhotoSelect(photo) {
        let { selectedPhotos, maxNumberOfImagesSelected, selectedPhotosList } = this.state;

        if(!selectedPhotos.hasOwnProperty(photo.id)) {
            if(Object.keys(selectedPhotos).length <= this.selectableMaxNumberOfPhotos - 1) {
                selectedPhotos[photo.id] = {...photo, order: Object.keys(selectedPhotos).length + 1};
                maxNumberOfImagesSelected = false;
            } else {
                maxNumberOfImagesSelected = true;
            }
        } else {
            delete selectedPhotos[photo.id];
            maxNumberOfImagesSelected = false;
        }

        const selectedPhotoArray = Object.keys(selectedPhotos);
        // clear photo list before assigning 
        selectedPhotosList = [];
        for(let i = 0; i < selectedPhotoArray.length; i++) {
            const selectedPhoto = selectedPhotoArray[i];

            selectedPhotosList.push(selectedPhotos[selectedPhoto]);
        }

        
        this.setState({selectedPhotos, selectedPhotosList, maxNumberOfImagesSelected})
    }

    /**
     * Handle photo re ordering in parent level and pass to child
     */
    handlePhotoReorder(photos) {
        
        if(photos.length) {
            this.setState({selectedPhotosList : photos});
        }
    }

    /**
     * save photo grid to db
     */
    savePhotoGridToDB() {
        this.props.saveSelectedPhotos(this.state.selectedPhotosList)
    }

    /**
     * saved images UI
     */
    savedImages() {
        const { savedPhotosList } = this.props;
        const { selectedPhotos, maxNumberOfImagesSelected, selectedPhotosList } = this.state;
        let photoGrid = [];

        photoGrid = savedPhotosList && savedPhotosList.map((photo, key) => {
            let isPhotoSelected = (selectedPhotos.hasOwnProperty(photo.id))? true : false;
            return (
                <div className="col-sm-2" key={photo.id}>
                    <Photo src={photo.picture} id={photo.id} isSelected={isPhotoSelected}  />
                </div>
            )
        })

        return (
            <div>
                <h2 className="text-center">Saved images</h2>
                <div className="row">
                    <div className="photo-list-wrapper d-flex flex-row">
                        {photoGrid}
                    </div>
                    <button className="btn btn-primary" onClick={() => this.props.loadUserPhotos()}>View uploaded photos</button>
                </div>
            </div>
        )
    }

    /**
     * uploaded images UI
     */
    userUploadedImages() {
        const { photosLoading, photoList } = this.props;
        const { selectedPhotos, maxNumberOfImagesSelected, selectedPhotosList } = this.state;
        let photoGrid = [];

        photoGrid = photoList && photoList.map((photo, key) => {
            let isPhotoSelected = (selectedPhotos.hasOwnProperty(photo.id))? true : false;
            return (
                <div className="col-sm-2" key={photo.id}>
                    <Photo src={photo.picture} id={photo.id} isSelected={isPhotoSelected} handleOnClick={(photoData) => this.handleOnPhotoSelect(photoData)} />
                </div>
            )
        })

        return (
            <div>
                {
                    (photosLoading)?
                    <p>loading uploaded photos..</p>
                    :
                    <>
                        <h2 className="text-center">Uploaded images</h2>
                            {
                                (maxNumberOfImagesSelected)?
                                <p>Maximum number of {this.selectableMaxNumberOfPhotos} photos are selected.</p>
                                :
                                null
                            }
                            <div className="row">
                                <div className="photo-list-wrapper d-flex flex-row">
                                    {photoGrid}
                                </div>
                                {
                                    (selectedPhotosList.length)?
                                    <button className="btn btn-primary" onClick={() => this.props.showSelectedImages()}>View selected photos</button>
                                    :
                                    null
                                }
                            </div>
                    </>
                }
            </div>
        )
    }

    /**
     * selected images UI
     */
    loadSelectedImagesComponent() {
        const { savingPhotosToDB, isDBUpdated } = this.props;
        const { selectedPhotos, selectedPhotosList } = this.state;

        return (
            <div>
                {
                    (savingPhotosToDB)?
                    <p>saving photos..</p>
                    :
                    <>
                        <PhotoGrid selectedPhotos={selectedPhotos} selectedPhotosList={selectedPhotosList} reOrderPhotos={(photos) => this.handlePhotoReorder(photos)} />
                        <button className="btn btn-primary float-left mt-2" onClick={() => this.savePhotoGridToDB()}>Save photos</button>
                        <button className="btn btn-primary float-right mt-2" onClick={() => this.props.showUploadedImages()}>show uploaded photos</button>
                    </>
                }
            </div>
        )
    }

    render () {
        const { savedPhotosLoading, photosLoading, isSavedPhotosVisible, isUploadedPhotosVisible, isReorderPhotoGridVisible } = this.props;

        return (
            <div className="App">
                <div className="container">
                    {
                        (savedPhotosLoading)?
                        <p>loading saved photos..</p>
                        :
                        <>
                            {(isSavedPhotosVisible)?
                                this.savedImages()
                                :
                                null
                            }
                            {(isUploadedPhotosVisible)?
                                this.userUploadedImages()
                                :
                                null
                            }
                            {(isReorderPhotoGridVisible)?
                                this.loadSelectedImagesComponent()
                                :
                                null
                            }
                        </>
                    }
                    
                </div>
            </div>
        )
    }
}

export default HomeContainer;