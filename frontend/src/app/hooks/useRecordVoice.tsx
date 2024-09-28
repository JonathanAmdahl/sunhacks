import { useEffect, useState, useRef, useCallback } from "react";
import { blobToBase64 } from "../utils/blobToBase64";

export const useRecordVoice = () => {
  const [text, setText] = useState("");
  // State to hold the media recorder instance
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // State to track whether recording is currently in progress
  const [recording, setRecording] = useState<boolean>(false);

  // Ref to store audio chunks during recording
  const chunks = useRef<Blob[]>([]);

  // Function to start the recording
  const startRecording = (): void => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  // Function to stop the recording
  const stopRecording = (): void => {
    if (mediaRecorder) {
      mediaRecorder.stop(); 
      setRecording(false);
    }
  };

  const getText = async (base64data:string) => {
    try {
      const response = await fetch("/api/speechToText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());
      const { transcription } = response;
      setText(transcription);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to initialize the media recorder with the provided stream
  const initialMediaRecorder = useCallback((stream: MediaStream): void => {
    const mediaRecorder = new MediaRecorder(stream);

    // Event handler when recording starts
    mediaRecorder.onstart = () => {
      chunks.current = []; // Resetting chunks array
    };

    // Event handler when data becomes available during recording
    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data); // Storing data chunks
    };

    // Event handler when recording stops
    mediaRecorder.onstop = () => {
      // Creating a blob from accumulated audio chunks with WAV format
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      console.log(audioBlob, 'audioBlob');
      blobToBase64(audioBlob, getText);

      // You can do something with the audioBlob, like sending it to a server or processing it further
    };

    setMediaRecorder(mediaRecorder);
  }, [setMediaRecorder]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, [initialMediaRecorder]); 

  return { recording, startRecording, stopRecording, text };
};