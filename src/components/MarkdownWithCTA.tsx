'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BlogInlineCTA from './BlogInlineCTA';

interface MarkdownWithCTAProps {
  content: string;
  postTitle?: string;
}

const MarkdownWithCTA = ({ content, postTitle }: MarkdownWithCTAProps) => {
  // CTAs disponíveis - alternam entre vídeo e teste grátis
  const ctaOptions = [
    {
      type: 'demo' as const,
      title: 'Veja o Viral Lead em Ação',
      description: 'Assista a uma demonstração de 5 minutos e descubra como nossa plataforma pode transformar seu negócio.',
      buttonText: 'Ver Demonstração',
      buttonAction: () => {
        if (typeof window !== 'undefined') {
          window.open('https://www.youtube.com/watch?v=uZg1vqi4Ajk', '_blank');
        }
      }
    },
    {
      type: 'teste' as const,
      title: 'Teste Grátis nossa Plataforma',
      description: 'Implemente um programa de indicação completo na sua empresa sem compromisso. Configure em minutos e veja os resultados.',
      buttonText: 'Começar Teste Grátis',
      buttonAction: () => {
        if (typeof window !== 'undefined') {
          window.open('https://app.virallead.com.br/pages/teste-gratis.html', '_blank');
        }
      }
    }
  ];

  // Função para processar conteúdo e inserir CTAs
  const processContent = (text: string) => {
    if (!text || text.trim() === '') {
      return [<BlogInlineCTA key="cta-empty" {...ctaOptions[0]} />];
    }

    // Divide o conteúdo em parágrafos
    const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
    const elements = [];
    let ctaCount = 0; // Contador de CTAs inseridos
    let h2Count = 0; // Contador de H2s encontrados
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      
      // Verifica se é um H2 (## no markdown)
      if (paragraph.trim().startsWith('## ')) {
        h2Count++;
        
        // CTA 1: Antes do terceiro H2
        if (h2Count === 3 && ctaCount === 0) {
          elements.push(
            <BlogInlineCTA key={`cta-1`} {...ctaOptions[0]} />
          );
          ctaCount++;
        }
        
        // CTA 2: Antes do sexto H2
        if (h2Count === 6 && ctaCount === 1) {
          elements.push(
            <BlogInlineCTA key={`cta-2`} {...ctaOptions[1]} />
          );
          ctaCount++;
        }
      }
      
      // Adiciona o parágrafo como markdown
      elements.push(
        <div key={`para-${i}`} className="mb-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {paragraph}
          </ReactMarkdown>
        </div>
      );
    }
    
    return elements;
  };

  return (
    <div className="markdown-content">
      {processContent(content)}
    </div>
  );
};

export default MarkdownWithCTA;
