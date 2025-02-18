import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: AuthError | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: async () => {},
  isLoading: true,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the initial session and auth code
    const initializeAuth = async () => {
      try {
        // Check for auth code in URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
          // Exchange code for session
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          if (data.session) {
            setUser(data.session.user);
            // Clean up URL and redirect to home
            window.history.replaceState(null, '', '/');
            navigate('/');
            return;
          }
        }

        // If no code, check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        setUser(session?.user ?? null);
      } catch (error: any) {
        setError(error);
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOut, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}