import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">TheraLink</h3>
            <p className="text-gray-400">
              Your trusted platform for mental health support and resources.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>support@theralink.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+91 - 9999999999</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/resources" className="hover:text-purple-400">Resources</a></li>
              <li><a href="/chat" className="hover:text-purple-400">Chat Support</a></li>
              <li><a href="/login" className="hover:text-purple-400">Login</a></li>
              <li><a href="/signup" className="hover:text-purple-400">Sign Up</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TheraLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}