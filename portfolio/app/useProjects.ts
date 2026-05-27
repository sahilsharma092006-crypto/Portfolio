'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  images: {
    thumb?: string;
    hero?: string;
  };
  createdAt: unknown; // Firebase Timestamp (avoid explicit any)
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a query to get projects ordered by creation time
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));

    // Mark loading false even if Firestore is unreachable so the UI can render.
    // (Right now, when Firestore fails, pages may look blank if downstream components
    // wait for `loading` to turn false.)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setProjects([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return { projects, loading };
}