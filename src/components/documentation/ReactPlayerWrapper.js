// src/components/ReactPlayerWrapper.js
import React from 'react';
import ReactPlayer from 'react-player';

const ReactPlayerWrapper = (props) => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ReactPlayer {...props} />
        </div>
    );
};

export default ReactPlayerWrapper;
