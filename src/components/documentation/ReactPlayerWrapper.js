// src/components/ReactPlayerWrapper.js
import React from 'react';
import ReactPlayer from 'react-player';

const ReactPlayerWrapper = (props) => {
    return (
        <div className="video-container">
            <ReactPlayer {...props} />
        </div>
    );
};

export default ReactPlayerWrapper;
