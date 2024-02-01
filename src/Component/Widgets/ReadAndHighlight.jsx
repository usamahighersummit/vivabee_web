import React, { useEffect, useState } from "react";

const ReadAndHighlight = ({ paragraph, replay, setReplay, setRotate }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(-5);
  const words = paragraph.match(/"[^"]+"|[^\s_=]+/g) || [];

  const totalWords = words.length;

  useEffect(() => {
    let highlightInterval;

    const handleSpeakEnd = () => {
      clearInterval(highlightInterval);
      setCurrentWordIndex(-4);
      setRotate(false);
    };

    const speakAndHighlight = () => {
      if (!paragraph) return;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find((voice) => voice.name === "Samantha");

      const utterance = new SpeechSynthesisUtterance(words);
      utterance.rate = 0.6;
      utterance.voice = selectedVoice;
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
      }, utterance.rate * 3600);
    };

    if (words.length > 0) {
      speakAndHighlight();
    }

    return () => {
      speechSynthesis.cancel();
      clearInterval(highlightInterval);
      setCurrentWordIndex(-5);
      setReplay(false);
    };
  }, [paragraph, replay, setReplay, setRotate, totalWords]);

  return (
    <p>
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
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
};

export default ReadAndHighlight;
