"use client";

import { useEffect } from 'react';

interface BlogViewTrackerProps {
  slug: string;
}

export default function BlogViewTracker({ slug }: BlogViewTrackerProps) {
  useEffect(() => {
    // Track view after a short delay to ensure it's a genuine read
    const timer = setTimeout(() => {
      fetch('/api/blog/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      }).catch(error => {
        console.error('Error tracking blog view:', error);
      });
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [slug]);

  return null; // This component doesn't render anything
}