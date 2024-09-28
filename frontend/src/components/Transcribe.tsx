'use client';

import { useState } from 'react';

interface TranscribeProps {
  startRecording: () => void;
  stopRecording: () => void;
  text: string;
}

const TranscribeExample: React.FC<TranscribeProps> = ({ startRecording, stopRecording, text }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(oldState => !oldState);
  }

  return (
    <>
    <p>currently: {isRecording ? 'recording' : 'not recording'}</p>
    <button
      onClick={handleClick}
      className="border-none bg-transparent w-10"
    >
      record
      </button>
      <p>{text}</p>
      </>
  );
};

export default TranscribeExample;