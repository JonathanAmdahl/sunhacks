//import Image from 'next/image'
//import MicIcon from '../icons/MicIcon.svg'
import { useState } from 'react'

interface TranscribesProps {
    isDisabled: boolean;
    isRecording: boolean;
    handleRecord: () => void;
    text: string;
}

export default function Transcribes({ handleRecord, text, isRecording, isDisabled }: TranscribesProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        handleRecord();
        
        // Reset after 3 seconds
        setTimeout(() => {
            setIsClicked(false);
        }, 3000);
    }
    
    return (
        <div className="bg-white w-[50%] h-[100%] py-10 px-10 rounded-xl">
            <div>
                <p className='text-3xl text-[#8E60C0] h-[calc(100%-6rem)] font-black overflow-hidden overflow-ellipsis'>
                    {text ?? "Press the microphone and begin transcribing..."}
                </p>
            </div>
            
            <div className='h-[80%] flex justify-center items-end'>
                {isRecording && !isDisabled && (
                    <button 
                        onClick={handleClick} 
                        disabled={isClicked}
                        className={`relative bottom-0 left-0 mb-0 mr-20 px-4 py-2 rounded-full text-3xl font-black text-white 
                            ${isClicked ? 'bg-green-500 cursor-not-allowed' : 'bg-[#8E60C0] hover:bg-[#7D4FAF]'}
                            transition-colors duration-300`}
                    >
                        Generate Page
                    </button>
                )}
            </div>
        </div>
    )
}