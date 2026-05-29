'use client';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
=======
import { User } from 'firebase/auth';
import { auth } from '@/firebase';

>>>>>>> 95a7616fab6c8b98d972030617beb18090d80590

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}