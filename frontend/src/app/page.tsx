import dynamic from 'next/dynamic'
import Image from "next/image";
import ImageGenerationDemo from "./components/image_gen_demo";

const TranscribeExample = dynamic(() => import('./components/TranscribeExample'), { ssr: false })

export default function Home() {
  return (
    <div>
     <main>
      <TranscribeExample />
      <ImageGenerationDemo />
     </main>
    </div>
  );
}