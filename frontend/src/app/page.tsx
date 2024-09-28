import dynamic from 'next/dynamic'

const TranscribeExample = dynamic(() => import('./components/TranscribeExample'), { ssr: false })

export default function Home() {
  return (
    <div>
     <main>
      <TranscribeExample />
     </main>
    </div>
  );
}