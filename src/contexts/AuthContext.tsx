import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  title?: string;
  location?: string;
  linkedinUrl?: string;
  profilePhoto?: string;
  languages?: string[];
  bio?: string;
  preferredCoachees?: number;
  calendlyUrl?: string;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('coachPortalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials
    if (email === 'coach@example.com' && password === 'password') {
      const userData: User = {
        id: '1',
        email: 'coach@example.com',
        name: 'Sarah Johnson',
        title: 'Senior Career Coach',
        location: 'New York, NY',
        linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
        profilePhoto: '',
        languages: ['English', 'Spanish'],
        bio: 'Experienced career coach specializing in tech transitions.',
        preferredCoachees: 30,
        calendlyUrl: 'https://calendly.com/sarah-johnson',
        isOnboarded: true
      };
      setUser(userData);
      localStorage.setItem('coachPortalUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('coachPortalUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('coachPortalUser', JSON.stringify(updatedUser));
    }
  };

  const completeOnboarding = () => {
    updateUser({ isOnboarded: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};