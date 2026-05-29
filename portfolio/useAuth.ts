'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/firebase';


/**
 * Custom hook to manage Firebase Authentication state.
 * Provides the current user object and a loading state.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
}