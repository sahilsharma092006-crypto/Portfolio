'use client';

import { useState, useEffect } from 'react';
import { staticProjects } from './data/projects';

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
  createdAt: any;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading state for the cinematic "Loading Cinematic Universe" effect
    const timer = setTimeout(() => {
      setProjects(staticProjects);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { projects, loading };
}