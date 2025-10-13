'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '../types/blog';
import { formatDate } from '../utils/markdown';
import { 
  Newspaper, 
  Target, 
  TrendingUp, 
  Gift, 
  Bot, 
  Settings, 
  BarChart3, 
  Shield,
  ArrowRight,
  Clock,
  Calendar,
  User
} from 'lucide-react';

interface BlogCategorySectionProps {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  icon: React.ComponentType<any>;
  color: string;
  maxPosts?: number;
}

export default function BlogCategorySection({ 
  title, 
  subtitle, 
  posts, 
  icon: IconComponent, 
  color,
  maxPosts = 6 
}: BlogCategorySectionProps) {
  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Categoria */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mr-6 shadow-lg`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Descrição */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime} min
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                </div>

                {/* Link */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className={`inline-flex items-center px-6 py-3 rounded-xl font-medium text-white ${color} hover:opacity-90 transition-all duration-200 group-hover:scale-105`}
                >
                  Ler Post
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Botão Ver Todos (sempre que houver posts) */}
        {displayPosts.length > 0 && (
          <div className="text-center">
            <Link 
              href={`/blog?categoria=${title.toLowerCase().replace(' ', '-')}`}
              className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-white ${color} hover:opacity-90 transition-all duration-200 hover:scale-105`}
            >
              Ver Todos os Posts de {title}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
