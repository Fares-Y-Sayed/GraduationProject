import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Typewriter = ({ text, speed = 50, eraseSpeed = 30, pause = 1200 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (typing) {
      if (displayedText.length < text.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        timeoutId = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, eraseSpeed);
      } else {
        timeoutId = setTimeout(() => setTyping(true), pause / 2);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [displayedText, typing, text, speed, eraseSpeed, pause]);

  return (
    <span className="typewriter-text">
      {displayedText}
    </span>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  eraseSpeed: PropTypes.number,
  pause: PropTypes.number,
};

// ExplanationTypewriter: types each line one by one, no erase, no loop
export const ExplanationTypewriter = ({ text, speed = 20, linePause = 400 }) => {
  // Split text into lines using robust rules
  const lines = React.useMemo(() => (
    (text || '')
      .replace(/(:)(?!\n)/g, '$1\n') // break after colon
      .replace(/(\d+\.)/g, '\n$1')   // break before 1. 2. 3.
      .replace(/\. (?=[A-Z])/g, '.\n') // break after period+space+capital
      .split(/\n+/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
  ), [text]);

  const [currentLine, setCurrentLine] = React.useState(0);
  const [displayedLines, setDisplayedLines] = React.useState([]);
  const [displayedText, setDisplayedText] = React.useState('');
  const charIdxRef = React.useRef(0);
  const timeoutRef = React.useRef();

  // Reset animation when text changes
  React.useEffect(() => {
    setCurrentLine(0);
    setDisplayedLines([]);
    setDisplayedText('');
    charIdxRef.current = 0;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [lines]);

  // Animate typing for each line
  React.useEffect(() => {
    if (!lines.length || currentLine >= lines.length) return;
    charIdxRef.current = 0;
    setDisplayedText('');
    function typeChar() {
      charIdxRef.current++;
      setDisplayedText(lines[currentLine].slice(0, charIdxRef.current));
      if (charIdxRef.current < lines[currentLine].length) {
        timeoutRef.current = setTimeout(typeChar, speed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayedLines(prev => [...prev, lines[currentLine]]);
          setDisplayedText('');
          setCurrentLine(prev => prev + 1);
        }, linePause);
      }
    }
    timeoutRef.current = setTimeout(typeChar, speed);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [currentLine, lines, speed, linePause]);

  return (
    <span>
      {displayedLines.map((line, idx) => (
        <span className="explanation-typewriter-line" key={idx}>{line}</span>
      ))}
      {currentLine < lines.length && (
        <span className="explanation-typewriter-line">{displayedText}</span>
      )}
    </span>
  );
};

ExplanationTypewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  linePause: PropTypes.number,
};

export default Typewriter; 