import Image from 'next/image'
import MicIcon from '../icons/MicIcon.svg'

interface TranscribesProps {
    handleRecord: () => void;
    text: string;
  }

export default function Transcribes({ handleRecord, text }: TranscribesProps) {
    return (<div className="bg-white w-[50%] h-[100%] py-10 px-10 rounded-xl">
        <p className='text-3xl text-[#8E60C0] h-[calc(100%-6rem)] font-black'>{text ?? "Press the microphone and begin transcribing..."}</p>
        <div className='h-[6rem] flex justify-between items-end'>
            <button onClick={handleRecord}>
                <Image src={MicIcon} width={55} height={80} alt="Mic Icon" />
            </button>
            <button className='px-4 py-2 rounded-full text-3xl font-black text-white bg-[#8E60C0]'>Generate Page</button>
        </div>
    </div>)
}