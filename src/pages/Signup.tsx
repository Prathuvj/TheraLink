import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Lock, User } from 'lucide-react';
import OTPVerification from '../components/OTPVerification';

export default function Signup() {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: isEmail ? email : `${phone}@phone.theralink.com`,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      setShowOTPVerification(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleVerificationComplete = () => {
    navigate('/');
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (showOTPVerification) {
    return (
      <div className="min-h-screen bg-beige pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <OTPVerification
            email={isEmail ? email : undefined}
            phone={!isEmail ? phone : undefined}
            password={password}
            fullName={fullName}
            onVerificationComplete={handleVerificationComplete}
            onBack={() => setShowOTPVerification(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pt-24 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center gradient-text">Create Account</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsEmail(true)}
            className={`flex-1 p-2 rounded-lg transition ${
              isEmail ? 'bg-accent text-white' : 'bg-soft-pink text-dark-text'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setIsEmail(false)}
            className={`flex-1 p-2 rounded-lg transition ${
              !isEmail ? 'bg-accent text-white' : 'bg-soft-pink text-dark-text'
            }`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark-text">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-soft-pink rounded-lg pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {isEmail ? (
            <div>
              <label className="block text-sm font-medium mb-1 text-dark-text">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-soft-pink rounded-lg pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1 text-dark-text">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-soft-pink rounded-lg pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-dark-text">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-soft-pink rounded-lg pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white rounded-lg p-2 hover:bg-accent/90 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="mt-4 w-full bg-soft-pink text-dark-text rounded-lg p-2 hover:bg-soft-pink/80 transition"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}