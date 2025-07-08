"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';

export default function ObrigadoLeadQualificadoPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.sessionStorage.getItem('leadAcesso') !== 'ok') {
        router.replace('/');
        return;
      }
      // Disparar evento personalizado do Pixel
      if (typeof window.fbq === 'function') {
        (window.fbq as (...args: any[]) => void)('trackCustom', 'QualifiedLead');
      }
      // Limpar flag para evitar acesso futuro
      window.sessionStorage.removeItem('leadAcesso');
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
      <Header />
      <section className="flex-1 flex justify-center items-center py-16 px-4">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Obrigado pelo interesse!</h1>
          <p className="text-lg text-gray-200 mb-6">Em breve entraremos em contato.</p>
        </div>
      </section>
      <ModernFooter />
    </main>
  );
} 