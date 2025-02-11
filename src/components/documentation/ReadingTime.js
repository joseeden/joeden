import React, { useEffect, useState } from 'react';
import readingTime from 'reading-time/lib/reading-time';

function ReadingTime({ lastUpdated }) {
  const [readingTimeInWords, setReadingTimeInWords] = useState('');

  useEffect(() => {
    setReadingTimeInWords(
      readingTime(document.querySelector('.markdown').innerText).text,
    );
  }, []);

  const formattedDate = lastUpdated
    ? lastUpdated.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : '';

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <span 
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-small" 
        style={{ color: '#757575', fontSize: '0.80rem', backgroundColor: 'transparent' }}
      >
        {formattedDate && `Updated ${formattedDate} · `}{readingTimeInWords}
      </span>
    </div>
  );
}

export default ReadingTime;
