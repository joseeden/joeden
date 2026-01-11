import React from 'react';
import Header from '@theme-original/DocItem/Header';

export default function HeaderWrapper(props) {
  return (
    <>
      <Header {...props} />
      <div className="custom-tags-header">
        <div style={{background: 'red', padding: '10px', color: 'white'}}>
          DEBUG: Custom header component is working!
        </div>
      </div>
    </>
  );
}