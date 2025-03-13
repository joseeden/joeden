// src/components/documentation/ReactPlayerWrapper.js
import React from 'react';
import ReactPlayer from 'react-player';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ReactPlayerWrapper = (props) => {
  return (
    <div className="video-container">
      <TransformWrapper
        wheel={{ step: 0.1 }} // Mouse scroll zoom
        pinch={{ step: 0.1 }} // Pinch-to-zoom gesture on mobile
        minScale={0.5} // Minimum zoom out
        maxScale={3} // Maximum zoom in
      >
        <TransformComponent>
          <ReactPlayer {...props} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ReactPlayerWrapper;
