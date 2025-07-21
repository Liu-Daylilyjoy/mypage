'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface VisitTrackerProps {
  enabled?: boolean;
}

const VisitTracker: React.FC<VisitTrackerProps> = ({ enabled = true }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;

    const trackVisit = async () => {
      try {
        await fetch('/api/stats/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname
          }),
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    const timer = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timer);
  }, [pathname, enabled]);

  return null;
};

export default VisitTracker; 