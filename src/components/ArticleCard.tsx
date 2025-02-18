import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-dark-text mb-2">{article.title}</h3>
      <p className="text-gray-600 mb-4">{article.preview}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-accent hover:text-accent/80"
        >
          <span>Read More</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}