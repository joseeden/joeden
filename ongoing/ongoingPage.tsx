import React from 'react';
import 'ongoing.scss';

const Error404Page: React.FC = () => {
  return (
    <div className="ongoing-container">
      <img src={require('ongoing.png').default} alt="Ongoing" className="ongoing-image" />
    </div>
  );
};

export default Error404Page;
