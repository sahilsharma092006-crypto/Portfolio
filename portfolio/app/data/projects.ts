'use client';

import { Project } from '../useProjects';

export const staticProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Electricity Bill Management',
    category: 'Console App',
    year: '2024',
    description: 'A C++ console application for calculating and managing electricity bills with tiered billing logic and a clean user interface.',
    tags: ['C++', 'OOPs', 'Console App'],
    images: {
      thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
      hero: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
    },
    createdAt: new Date('2024-01-15T10:00:00Z').getTime(),
  },
  {
    id: 'project-2',
    name: 'Student Management System',
    category: 'DBMS',
    year: '2024',
    description: 'Database-driven application to handle student records, manage grades and information with secure structured data storage.',
    tags: ['C++', 'MySQL', 'DBMS'],
    images: {
      thumb: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop',
      hero: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1920&auto=format&fit=crop',
    },
    createdAt: new Date('2024-02-20T10:00:00Z').getTime(),
  },
  {
    id: 'project-3',
    name: 'Portfolio Website',
    category: 'Web Dev',
    year: '2024',
    description: 'Responsive personal portfolio built from scratch showcasing skills, projects, and experience with a modern performant design.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: {
      thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
      hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop',
    },
    createdAt: new Date('2024-03-20T10:00:00Z').getTime(),
  }
];
