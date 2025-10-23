import Card from '@/components/Card';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className='bg-[var(--background2)] min-h-screen transition'>
      <Header />
      <div className='flex gap-20 p-10 flex-wrap flex justify-center'>
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
