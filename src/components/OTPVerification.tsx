import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { OTPVerificationProps } from '../types';
import { ArrowLeft } from 'lucide-react';

export default function OTPVerification({ 
  email, 
  phone, 
  password, 
  fullName, 
  onVerificationComplete,
  onBack 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email || `${phone}@phone.theralink.com`,
        token: otp,
        type: 'signup'
      });

      if (verifyError) throw verifyError;
      onVerificationComplete();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email || `${phone}@phone.theralink.com`,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-accent hover:text-accent/80 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to signup
      </button>

      <h2 className="text-2xl font-semibold text-center gradient-text">Verify Your Account</h2>
      
      <p className="text-gray-600 text-center">
        We've sent a verification code to {email || phone}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-dark-text">Verification Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-soft-pink rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter verification code"
            maxLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-accent text-white rounded-lg p-2 hover:bg-accent/90 transition disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>

      <p className="text-center text-gray-600">
        Didn't receive the code?{' '}
        <button
          onClick={handleResend}
          className="text-accent hover:text-accent/80"
        >
          Resend
        </button>
      </p>
    </div>
  );
}