'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-1',
    name: 'Metropolis 2077',
    category: 'Architecture',
    year: '2024',
    description: 'A cinematic exploration of a futuristic city using layered parallax effects and scroll-triggered lighting.',
    tags: ['Next.js', 'Framer Motion', '3D'],
    images: {
      thumb: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?auto=format&fit=crop&q=80&w=2070',
      hero: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=2072'
    },
    createdAt: new Date()
  },
  {
    id: 'mock-2',
    name: 'Oceanic Horizon',
    category: 'Motion Graphics',
    year: '2023',
    description: 'Deep sea depth simulation with interactive scroll-triggered depth layers.',
    tags: ['Motion', 'Simulation', 'Visuals'],
    images: {
      thumb: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2070',
      hero: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=2070'
    },
    createdAt: new Date()
  }
];

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
        setProjects(MOCK_PROJECTS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return { projects, loading };
}