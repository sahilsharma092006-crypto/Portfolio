'use client';

import Link from 'next/link';
import { useAuth } from '@/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-6 md:px-12 backdrop-blur-md bg-black/10 border-b border-white/5">
      <Link href="/" className="text-xl font-bold font-poppins tracking-tighter">
        SAHIL<span className="text-blue-500">.</span>
      </Link>
      
      <div className="flex gap-8 text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">
        <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
        {user ? (
          <Link href="/admin" className="text-blue-400 hover:text-blue-300">Admin</Link>
        ) : (
          <Link href="/login" className="hover:text-white transition-colors">Login</Link>
        )}
      </div>
    </nav>
  );
}