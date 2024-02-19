import React, { useEffect, useState, useMemo } from "react";

const ReadAndHighlight = ({
  paragraph,
  replay,
  setReplay,
  setRotate,
  scrollToBottomSmoothly,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-2);
  const words = useMemo(
    () => paragraph.split("  ") || [],
    [paragraph]
  );

  const totalWords = words.length;
  
  useEffect(() => {
    let highlightInterval;

    const handleSpeakEnd = () => {
      clearInterval(highlightInterval);
      setCurrentWordIndex(-5);
      setRotate(false);
      scrollToBottomSmoothly();
    };

    const speakAndHighlight = () => {
      if (!paragraph) return;

      const utterance = new SpeechSynthesisUtterance(paragraph);
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices[2];
      utterance.onend = handleSpeakEnd;
      speechSynthesis.speak(utterance);

      setCurrentWordIndex(0);

      highlightInterval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          const nextIndex = prevIndex + 5;
          if (nextIndex >= totalWords) {
            clearInterval(highlightInterval);
            handleSpeakEnd();
          }
          return nextIndex;
        });
      }, utterance.rate * 1800);
    };

    if (words.length > 0) {
      speakAndHighlight();
    }

    return () => {
      speechSynthesis.cancel();
      clearInterval(highlightInterval);
      setCurrentWordIndex(-2);
      setReplay(false);
    };
  }, [paragraph, replay, setReplay, setRotate, totalWords, words]);

  return (
    <p>
    <span style={{ display: "inline-block" }}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            backgroundColor:
              index >= currentWordIndex && index < currentWordIndex + 5
                ? "#7E418B70"
                : "transparent",
            transition: "background-color 0.3s ease",
          }}
          dangerouslySetInnerHTML={{ __html: word + " " }}
        ></span>
      ))}
    </span>
  </p>
  );
};

export default ReadAndHighlight;
