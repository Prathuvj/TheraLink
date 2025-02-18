import React from 'react';
import ChatBot from '../components/ChatBot';

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">AI Support Chat</h1>
        <ChatBot />
      </div>
    </div>
  );
}