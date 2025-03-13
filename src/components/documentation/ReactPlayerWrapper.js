// src/components/documentation/ReactPlayerWrapper.js
import React from 'react';
import ReactPlayer from 'react-player';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ReactPlayerWrapper = (props) => {
  return (
    <div className="video-container">
      <TransformWrapper
        defaultScale={1}
        wheel={{ step: 0.1 }}
        pinch={{ step: 0.1 }}
        minScale={0.5}
        maxScale={3}
      >
        <TransformComponent>
          <ReactPlayer {...props} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ReactPlayerWrapper;
