"use client";

import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import CaseStudies from '@/components/CaseStudies';
import HowItWorks from '@/components/HowItWorks';
import { Users, Zap, TrendingUp, Mail, Smartphone } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ApresentacaoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-hidden">
      <Header />
      <div className="container py-10">
        <Swiper
          modules={[Pagination, Keyboard]}
          pagination={{ clickable: true, dynamicBullets: true }}
          keyboard={{ enabled: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="!pb-16"
        >
          {/* Slide 1: Abertura Impactante */}
          <SwiperSlide>
            <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">Como as maiores empresas do mundo crescem com <span className="gradient-text">indicação</span></h1>
                <p className="text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-medium drop-shadow">Programas de indicação são responsáveis por até <span className="font-bold text-cyan-200">35% do crescimento</span> de gigantes como Dropbox, Uber, Airbnb e Hilton.</p>
                <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                  <Image src="/images/logo-branca.svg" alt="Logo Viral Lead" width={120} height={40} className="opacity-80 grayscale" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Uber_logo_2018.png" alt="Uber" width={80} height={40} className="opacity-80 grayscale" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Dropbox_logo_2017.svg" alt="Dropbox" width={100} height={40} className="opacity-80 grayscale" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" alt="Airbnb" width={80} height={40} className="opacity-80 grayscale" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Hilton_Hotels_logo.svg" alt="Hilton" width={80} height={40} className="opacity-80 grayscale" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Zara_Logo_2019.png" alt="Zara" width={80} height={40} className="opacity-80 grayscale" />
                </div>
                <span className="text-white/70 text-sm">Fontes: Dropbox, Airbnb, Hilton, Zara, Uber, <a href='https://fortune.com/2025/04/17/hilton-benefits-program-employees-hated-now-makes-millions-in-revenue/' target='_blank' className='underline'>Fortune</a></span>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-700/60 to-cyan-500/40 z-0" />
            </section>
          </SwiperSlide>
          {/* Slide 2: Dado de Mercado */}
          <SwiperSlide>
            <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-cyan-600 via-blue-500 to-blue-900">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">Empresas com programa de indicação crescem até <span className="text-cyan-200">30% mais rápido</span></h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium drop-shadow">Segundo a Harvard Business Review, programas de indicação aumentam a taxa de aquisição de clientes e reduzem o custo de marketing em até 50%.</p>
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="w-full max-w-md h-40 bg-white/10 rounded-2xl flex items-end justify-center relative overflow-hidden">
                    <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ duration: 1.2 }} className="bg-cyan-400 w-1/3 rounded-t-xl mx-2" style={{height: '80%'}} />
                    <motion.div initial={{ height: 0 }} animate={{ height: '60%' }} transition={{ duration: 1.2, delay: 0.2 }} className="bg-blue-400 w-1/3 rounded-t-xl mx-2" style={{height: '60%'}} />
                    <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ duration: 1.2, delay: 0.4 }} className="bg-blue-900 w-1/3 rounded-t-xl mx-2" style={{height: '40%'}} />
                  </div>
                  <span className="text-white/70 text-xs">Fonte: Harvard Business Review, 2024</span>
                </div>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 via-blue-500/60 to-blue-900/40 z-0" />
            </section>
          </SwiperSlide>
          {/* Slides seguintes permanecem para MVP, serão evoluídos após validação */}
        </Swiper>
      </div>
      <ModernFooter />
    </main>
  );
} 