'use client'

import dynamic from 'next/dynamic'
import ImageGenerationDemo from "./components/ImageGeneration";
import { useRecordVoice } from './hooks/useRecordVoice';

const TranscribeExample = dynamic(() => import('./components/Transcribe'), { ssr: false })

export default function Home() {
  //transcription 
  const { startRecording, stopRecording, text } = useRecordVoice();

  return (
    <div>
     <main>
      <TranscribeExample startRecording={startRecording} stopRecording={stopRecording} text={text} />
      <ImageGenerationDemo text={text}/>
     </main>
    </div>
  );
}