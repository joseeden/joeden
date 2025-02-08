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
    <div>
      {/* <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-small text-gray-800"> */}
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-small" style={{ backgroundColor: '#f0f0f0', color: '#c8bcb8', fontSize: '0.75rem' }}> {/* Apply styles */}
        {readingTimeInWords}
      </span>
    </div>
  );
}

export default ReadingTime;