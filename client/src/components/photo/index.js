import React from 'react';

const Photo = React.forwardRef((props, ref ) => {
    
    let handleTileClick = (e) => {
        if(props.handleOnClick) {
            props.handleOnClick({id: props.id, picture: props.src});
        } else {
            e.preventDefault();
        }
    }

    return (
        <div ref={ref} className={`photo-block ${(props.isSelected)? "active" : ""}`} onClick={(e) => handleTileClick(e)}>
            <img className="img-thumbnail" src={props.src} alt="" />
        </div>
    )
})

export default Photo;