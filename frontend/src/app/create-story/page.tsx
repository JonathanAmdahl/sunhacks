import Picture from "@/components/Picture";
import Transcribes from "@/components/Transcribes";

export default function CreateStory() {
    return (
      <div className="bg-[#1E1E1E] h-screen w-screen items-center justify-center flex flex-col">
        <div className="flex gap-10 w-screen px-[10%] h-[70%] justify-center items-center mt">
          <Transcribes/>
          <Picture/>
        </div>
        <div className='w-full px-[10%] flex justify-between mt-10'>
          <button className='text-3xl font-black text-white'>
            &lt; Previous Page
          </button>
          <button className='text-3xl font-black text-white bg-[#8E60C0]'>
            Save Fable
          </button>
          <button className='text-3xl font-black text-white'>
            Next Page &gt;
          </button>
        </div>
      </div>
    )
}