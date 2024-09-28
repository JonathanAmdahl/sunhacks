'use client';

import { useState } from 'react';
import { useRecordVoice } from '../hooks/useRecordVoice';

const TranscribeExample = () => {
  const { startRecording, stopRecording, text } = useRecordVoice();
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