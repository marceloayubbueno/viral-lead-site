'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface BlogInlineCTAProps {
  type: 'demo' | 'teste' | 'consultoria' | 'download';
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const BlogInlineCTA = ({ type, title, description, buttonText, buttonAction }: BlogInlineCTAProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeStyles = () => {
    switch (type) {
      case 'demo':
        return {
          bg: 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10',
          border: 'border-blue-500/30',
          button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
          icon: '🎥'
        };
      case 'teste':
        return {
          bg: 'bg-gradient-to-r from-green-600/10 to-emerald-600/10',
          border: 'border-green-500/30',
          button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
          icon: '🚀'
        };
      case 'consultoria':
        return {
          bg: 'bg-gradient-to-r from-purple-600/10 to-pink-600/10',
          border: 'border-purple-500/30',
          button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
          icon: '💡'
        };
      case 'download':
        return {
          bg: 'bg-gradient-to-r from-orange-600/10 to-red-600/10',
          border: 'border-orange-500/30',
          button: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
          icon: '📥'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10',
          border: 'border-blue-500/30',
          button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
          icon: '🎯'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <motion.div
      className={`my-8 p-6 rounded-2xl border backdrop-blur-sm ${styles.bg} ${styles.border}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-4">
        {/* Ícone */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
          {styles.icon}
        </div>
        
        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Botão */}
          <motion.button
            onClick={buttonAction}
            className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium text-sm transition-all duration-200 ${styles.button}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
            <svg 
              className="ml-2 w-4 h-4 transition-transform duration-200" 
              style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogInlineCTA;
