export interface Article {
  id: string;
  title: string;
  url: string;
  preview: string;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  full_name?: string;
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  availability: string;
  bio: string;
  image_url?: string;
  created_at: string;
}

export interface OTPVerificationProps {
  email: string;
  phone?: string;
  password: string;
  fullName: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}