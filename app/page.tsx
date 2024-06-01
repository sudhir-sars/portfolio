import Hero from '@/components/main/Hero';
import Skills from '@/components/main/Skills';
import { minify } from 'next/dist/build/swc';
import Image from 'next/image';
import Board from '@/components/main/TaskBoard';
import TaskBoard from '@/components/main/TaskBoard';
import GitBoard from '@/components/main/GitBoard';
export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="flex flex-col h-[850px] gap-20 text-white">
        <Hero />
      </div>
      <TaskBoard />
      <GitBoard />
      <Skills />
    </main>
  );
}
