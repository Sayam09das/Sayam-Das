"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type ThemePreference = 'system' | 'light' | 'dark';
type ThemeState = {
  preference: ThemePreference;
  isSystemDark: boolean;
};

type ThemeAction = 
  | { type: 'SET_PREFERENCE'; payload: ThemePreference }
  | { type: 'SET_SYSTEM_DARK'; payload: boolean };

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  preference: ThemePreference;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
  setSystem: () => void;
} | null>(null);

// ─── Reducer ──────────────────────────────────────────────────────────────────
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_PREFERENCE':
      return { ...state, preference: action.payload };
    case 'SET_SYSTEM_DARK':
      return { ...state, isSystemDark: action.payload };
    default:
      return state;
  }
}

// ─── Hook to get current system preference ────────────────────────────────────
function getSystemPreference(): boolean {
  const hour = new Date().getHours();
  // 7PM - 7AM = dark (19:00 - 06:59)
  return hour >= 19 || hour < 7;
}

// ─── Provider Component ───────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    preference: 'system',
    isSystemDark: false,
  });

  // ── Load initial state from localStorage ─────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme-preference') as ThemePreference | null;
    if (saved && ['system', 'light', 'dark'].includes(saved)) {
      dispatch({ type: 'SET_PREFERENCE', payload: saved });
    }
  }, []);

  // ── Sync system dark state (runs every minute) ───────────────────────────────
  useEffect(() => {
    const isDark = getSystemPreference();
    dispatch({ type: 'SET_SYSTEM_DARK', payload: isDark });

    const interval = setInterval(() => {
      const newDark = getSystemPreference();
      dispatch({ type: 'SET_SYSTEM_DARK', payload: newDark });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // ── Computed current theme & apply to DOM ────────────────────────────────────
  const currentTheme: 'light' | 'dark' = 
    state.preference === 'light' ? 'light' :
    state.preference === 'dark' ? 'dark' :
    state.isSystemDark ? 'dark' : 'light';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
      
      // Persist preference (not computed theme)
      localStorage.setItem('theme-preference', state.preference);
    }
  }, [currentTheme, state.preference]);

  // ── Toggle actions ───────────────────────────────────────────────────────────
  const toggleTheme = () => {
    const next: ThemePreference[] = ['system', 'light', 'dark'];
    const currentIndex = next.indexOf(state.preference);
    dispatch({
      type: 'SET_PREFERENCE',
      payload: next[(currentIndex + 1) % 3] as ThemePreference,
    });
  };

  const setLight = () => dispatch({ type: 'SET_PREFERENCE', payload: 'light' });
  const setDark = () => dispatch({ type: 'SET_PREFERENCE', payload: 'dark' });
  const setSystem = () => dispatch({ type: 'SET_PREFERENCE', payload: 'system' });

  const value = {
    theme: currentTheme,
    preference: state.preference,
    toggleTheme,
    setLight,
    setDark,
    setSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

