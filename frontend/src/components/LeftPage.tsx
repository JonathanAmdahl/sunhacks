interface TranscribesProps {
    text: string;
}

export default function LeftPage({text}: TranscribesProps) {
    
    return (
        <div className="bg-white w-[50%] h-[100%] py-10 px-10 rounded-xl">
            <p className='text-3xl font-body text-[#8E60C0] h-[calc(100%-6rem)] font-normal overflow-hidden overflow-ellipsis'>
                {text}
            </p>
        </div>
    )
}