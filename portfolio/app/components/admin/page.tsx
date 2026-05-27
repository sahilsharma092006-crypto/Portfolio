'use client';

import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from '@/useAuth';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { user, loading } = useAuth();

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl"
      >
        <h1 className="font-poppins text-2xl font-bold tracking-tighter">Access Panel</h1>
        <p className="mt-2 text-sm text-gray-400">Sign in to manage your cinematic portfolio.</p>
        
        <div className="mt-8">
          {loading ? (
            <div className="animate-pulse text-gray-500">Verifying session...</div>
          ) : user ? (
            <div className="space-y-4">
              <p className="text-sm text-blue-400">Logged in as {user.email}</p>
              <button 
                onClick={() => signOut(auth)}
                className="w-full rounded-full border border-white/10 py-3 text-sm font-bold transition-hover hover:bg-white hover:text-black"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="w-full rounded-full bg-white py-3 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </motion.div>
    </main>
  );
}