import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Photo from '../photo';

/**
 * re-order the image array with start and end indexes
 */
const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

/**
 * styles from plugin
 */
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

const ref = React.createRef();

class PhotoGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            items: {},
            itemsArr: []
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const orderedPhotos = reorder(
          this.props.selectedPhotosList,
          result.source.index,
          result.destination.index
        );

        this.props.reOrderPhotos(orderedPhotos);
    }

    render () {
        const {items, itemsArr} = this.state;
        const {selectedPhotos, selectedPhotosList } = this.props;

        let photoList = Object.keys(items);
        let photoGrid = [];

        photoGrid = selectedPhotosList && selectedPhotosList.map((photo, key) => {
            let selectedPhoto = photo;
            
            return (
                <Draggable key={selectedPhoto.id} draggableId={`${selectedPhoto.id}`} index={key}>
                    {(provided, snapshot) => (
                        <div className="col-sm-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                            <Photo src={selectedPhoto.picture} id={selectedPhoto.id} key={selectedPhoto.id} />
                        </div>
                    )}
                </Draggable>
            )
        });

        return (
            <div className="row">
                <h2 className="text-center">Selected images</h2>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        >
                        {
                            (photoGrid.length)?
                            photoGrid
                            :
                            <p>Please select an image from uplodaed images.</p>
                        }
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

export default PhotoGrid;