import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Therapist } from '../types';
import { Mail, Phone, Clock, User } from 'lucide-react';

export default function Support() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTherapists() {
      try {
        const { data, error } = await supabase
          .from('therapists')
          .select('*')
          .order('name');

        if (error) throw error;
        setTherapists(data || []);
      } catch (error) {
        console.error('Error fetching therapists:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTherapists();
  }, []);

  return (
    <div className="min-h-screen bg-beige pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Professional Support</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with our network of licensed therapists who are here to support you on your mental health journey.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-600">Loading therapist directory...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                {therapist.image_url && (
                  <img
                    src={therapist.image_url}
                    alt={therapist.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-dark-text mb-2">{therapist.name}</h3>
                  <p className="text-accent mb-4">{therapist.specialization}</p>
                  
                  <p className="text-gray-600 mb-4">{therapist.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-accent" />
                      <span>{therapist.availability}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2 text-accent" />
                      <a href={`mailto:${therapist.email}`} className="hover:text-accent">
                        {therapist.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2 text-accent" />
                      <a href={`tel:${therapist.phone}`} className="hover:text-accent">
                        {therapist.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}