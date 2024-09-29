import Image from "next/image";

interface TranscribesProps {
    src: string;
}

export default function RightPage({src}: TranscribesProps) {
    
    return (
        <div className="bg-white w-[50%] h-[100%] py-10 px-10 rounded-xl">
            <Image src={src} alt="image" width={500} height={500} />
        </div>
    )
}