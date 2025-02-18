import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, BookOpen, MessageSquare, Home, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="flex items-center space-x-1 hover:text-accent transition">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link to="/resources" className="flex items-center space-x-1 hover:text-accent transition">
        <BookOpen className="w-5 h-5" />
        <span>Resources</span>
      </Link>
      <Link to="/chat" className="flex items-center space-x-1 hover:text-accent transition">
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
      </Link>
      {user ? (
        <>
          <Link to="/settings" className="flex items-center space-x-1 hover:text-accent transition">
            <span>Settings</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1 hover:text-accent transition"
          >
            <span>Sign Out</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="flex items-center space-x-1 hover:text-accent transition">
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="flex items-center space-x-1 hover:text-accent transition">
            <UserPlus className="w-5 h-5" />
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-sm text-dark-text p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">TheraLink</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-soft-pink rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLinks />
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
}