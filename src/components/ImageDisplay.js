import React from 'react';


const ImageDisplay = (props) => {
    const {celebrityFound} = props;
    return (
        <div>
            {celebrityFound}
        </div>
    )
}

export default ImageDisplay;