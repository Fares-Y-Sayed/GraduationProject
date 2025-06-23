import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text) {
      // Format the text to add a newline before each numbered list item
      const formattedText = text.replace(/\s(?=\d+\.)/g, '\n');
      setDisplayedText('');
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < formattedText.length) {
          setDisplayedText((prev) => prev + formattedText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [text, speed]);

  return (
    <span className="typewriter-text">
      {displayedText.split('\n').map((item, index, arr) => (
        <React.Fragment key={index}>
          {item}
          {index < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

export default Typewriter; 