import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

export default function Resources() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-beige pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Mental Health Resources</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of articles and resources designed to support your mental well-being journey.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-600">Loading resources...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}