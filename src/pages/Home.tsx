import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Home() {
  const { user } = useAuth();
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-beige">
      <div className="container mx-auto px-4 pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold gradient-text">
              Unlock<br />Your<br />Potential
            </h1>
            {user && (
              <h2 className="text-2xl text-gray-600">
                {greeting}, {user.user_metadata.full_name || 'User'}
              </h2>
            )}
            <p className="text-xl text-gray-600 max-w-lg">
              Explore our comprehensive suite of mental health support services, designed to empower you on the path to lasting well-being.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136"
              alt="Peaceful moment"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Tailored Support for Your Needs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-soft-pink p-8 rounded-lg hover:shadow-lg transition">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p className="text-gray-600 mb-4">
                Access curated articles and resources for mental well-being
              </p>
              <Link to="/resources" className="text-accent hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-soft-pink p-8 rounded-lg hover:shadow-lg transition">
              <MessageSquare className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Chat Support</h3>
              <p className="text-gray-600 mb-4">
                Talk to our AI assistant for guidance and support
              </p>
              <Link to="/chat" className="text-accent hover:underline">
                Start chatting →
              </Link>
            </div>

            <div className="bg-soft-pink p-8 rounded-lg hover:shadow-lg transition">
              <Brain className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 mb-4">
                Connect with licensed therapists ready to help
              </p>
              <Link to="/support" className="text-accent hover:underline">
                Get support →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}