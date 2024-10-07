// import React, { useState } from "react";
// import axios from "axios";

// const Speech = () => {
//   const [paragraphs, setParagraphs] = useState([
//     "This is the first paragraph.",
//     "This is the second paragraph.",
//   ]);

//   const handleConvert = async () => {
//     try {
//       // Sending paragraphs to backend to convert to mp3
//       const response = await axios.post(
//         "http://localhost:3000/api/Text_to_Speech",
//         {
//           paragraphs,
//         }
//       );

//       // Create a link to download the MP3 file
//       const link = document.createElement("a");
//       link.href = response.data; // Response will be the file download URL
//       link.download = "output.mp3";
//       link.click();
//     } catch (error) {
//       console.error("Error converting text to speech", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Convert Text to Speech</h2>
//       <button onClick={handleConvert}>Convert to MP3</button>
//     </div>
//   );
// };

// export default Speech;


// import React from "react";

// const Speech = () => {

//   const speak = () => {
//     const utterance = new SpeechSynthesisUtterance(
//       "Hello, this is a text-to-speech demo,  here i am writing aman!"
//     );
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div>
//       <button onClick={speak}>Speak</button>
//     </div>
//   );
// };

// export default Speech;


import React, { useState, useEffect } from "react";

const Speech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [text, setText] = useState(
    "hiii my name is aman sharma  and i am the fullstack developer in the mxpertz infolabs"
  );

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    // Load voices when they are loaded by the browser
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice, pitch, and rate
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    // Handle speech synthesis events
    utterance.onstart = () => console.log("Speech started");
    utterance.onend = () => console.log("Speech ended");
    utterance.onerror = (event) => console.error("Speech error:", event.error);

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div>
      <h1>Text-to-Speech Demo</h1>

      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />

      {/* Voice Selection */}
      <div>
        <label htmlFor="voice">Choose Voice: </label>
        <select
          id="voice"
          onChange={(e) =>
            setSelectedVoice(
              voices.find((voice) => voice.name === e.target.value)
            )
          }
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Pitch Control */}
      <div>
        <label htmlFor="pitch">Pitch: {pitch}</label>
        <input
          type="range"
          id="pitch"
          min="0.5"
          max="2"
          value={pitch}
          step="0.1"
          onChange={(e) => setPitch(e.target.value)}
        />
      </div>

      {/* Rate Control */}
      <div>
        <label htmlFor="rate">Rate: {rate}</label>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2"
          value={rate}
          step="0.1"
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      {/* Buttons to control speech synthesis */}
      <div>
        <button onClick={handleSpeak}>Speak</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Speech;

