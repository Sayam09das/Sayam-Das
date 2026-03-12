"use client";

import { useEffect, useState } from 'react';

export function TimeBasedThemeManager() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');
    const hour = new Date().getHours();
    const timeDark = hour >= 18 || hour < 6;

    const shouldDark = !savedTheme || savedTheme === 'auto' ? timeDark : savedTheme === 'dark';

    document.documentElement.classList.toggle('dark', shouldDark);

    if (!savedTheme || savedTheme === 'auto') {
      localStorage.setItem('theme', shouldDark ? 'dark' : 'light');
    }

    const listener = () => {
      const currentSaved = localStorage.getItem('theme');
      if (!currentSaved || currentSaved === 'auto') {
        const h = new Date().getHours();
        const newDark = h >= 18 || h < 6;
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
      }
    };

    const interval = setInterval(listener, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return null;
}

