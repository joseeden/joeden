import React, { useEffect, useState } from 'react';
import readingTime from 'reading-time/lib/reading-time';

function ReadingTime(props) {
  const [readingTimeInWords, setReadingTimeInWords] = useState('');

  useEffect(() => {
    setReadingTimeInWords(
      readingTime(document.querySelector('.markdown').innerText).text,
    );
  });
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      {/* <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-small text-gray-800"> */}
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-small" style={{ color: '#757575', fontSize: '0.75rem', backgroundColor: 'transparent' }}> 
        {readingTimeInWords}
      </span>
    </div>
  );
}

export default ReadingTime;