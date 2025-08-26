"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Users, BarChart3, Target, Zap, UserCheck, Repeat } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxlsgiP_JXeF7k3aFzwVUe7Wo0bQuW3gRwkspWlCtKD-aqelikAX2brb91cOlZN09X4/exec';

interface UserData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  funcionarios: string;
}

interface CalculatorData {
  baseClientes: number;
  ticketMedio: number;
  taxaConversaoIndicacao: number;
  comissaoIndicacao: number;
  frequenciaIndicacoes: number;
  margemLucro: number;
}

export default function CalculadoraPage() {
  const [step, setStep] = useState<'calculator' | 'form' | 'results' | 'final'>('calculator');
  const [userData, setUserData] = useState<UserData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    funcionarios: ''
  });
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    baseClientes: 1000,
    ticketMedio: 500,
    taxaConversaoIndicacao: 15,
    comissaoIndicacao: 20,
    frequenciaIndicacoes: 2,
    margemLucro: 70
  });
  const [isSending, setIsSending] = useState(false);

  // Cálculos baseados na base de clientes existente
  const resultados = {
    // Dados atuais
    receitaAtual: calculatorData.baseClientes * calculatorData.ticketMedio,
    
    // Potencial de indicações (baseado em estatísticas reais)
    indicacoesMensais: calculatorData.baseClientes * calculatorData.frequenciaIndicacoes,
    leadsGerados: calculatorData.baseClientes * calculatorData.frequenciaIndicacoes,
    conversoesIndicacao: (calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao) / 100,
    
    // Receitas
    receitaIndicacoes: (calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * calculatorData.ticketMedio,
    receitaTotal: (calculatorData.baseClientes * calculatorData.ticketMedio) + 
                  ((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * calculatorData.ticketMedio),
    
    // Custos
    custoComissoes: (calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * 
                     (calculatorData.ticketMedio * calculatorData.comissaoIndicacao / 100),
    
    // Lucros
    lucroIndicacoes: ((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * calculatorData.ticketMedio) - 
                      ((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * 
                       (calculatorData.ticketMedio * calculatorData.comissaoIndicacao / 100)),
    
    // Crescimento
    crescimentoReceita: (((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * calculatorData.ticketMedio) / 
                         (calculatorData.baseClientes * calculatorData.ticketMedio)) * 100,
    
    // ROI
    roi: ((((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * calculatorData.ticketMedio) - 
            ((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * 
             (calculatorData.ticketMedio * calculatorData.comissaoIndicacao / 100))) / 
           ((calculatorData.baseClientes * calculatorData.frequenciaIndicacoes * calculatorData.taxaConversaoIndicacao / 100) * 
            (calculatorData.ticketMedio * calculatorData.comissaoIndicacao / 100))) * 100
  };

  const handleCalculatorSubmit = () => {
    setStep('form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('results');
  };

  const handleLeadCapture = async () => {
    setIsSending(true);
    try {
      const data = {
        ...userData,
        ...calculatorData,
        resultados: JSON.stringify(resultados),
        dataHora: new Date().toLocaleString('pt-BR'),
        origem: 'calculadora'
      };

      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, String(data[key as keyof typeof data])));

      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setIsSending(false);
      setStep('final');

      // Redirecionar baseado no perfil
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('leadAcesso', 'ok');
          if (userData.funcionarios === '1 a 10') {
            window.location.href = '/obrigadolead';
          } else {
            window.location.href = '/obrigadoleadqualificado';
          }
        }
      }, 2000);

    } catch (error) {
      setIsSending(false);
      console.error('Erro ao enviar dados:', error);
    }
  };

  const updateCalculatorData = (field: keyof CalculatorData, value: number) => {
    setCalculatorData(prev => ({ ...prev, [field]: value }));
  };

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Calculadora de <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Potencial de Indicações
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Descubra o potencial de crescimento do seu negócio baseado na sua base atual de clientes. 
            Analise quanto você pode ganhar com um programa de indicações otimizado usando estatísticas reais.
          </p>
        </motion.div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto">
          {step === 'calculator' && (
            <CalculatorStep 
              data={calculatorData}
              onUpdate={updateCalculatorData}
              onSubmit={handleCalculatorSubmit}
            />
          )}

          {step === 'form' && (
            <FormStep 
              userData={userData}
              onUpdate={updateUserData}
              onSubmit={handleFormSubmit}
              onBack={() => setStep('calculator')}
            />
          )}

          {step === 'results' && (
            <ResultsStep 
              resultados={resultados}
              onCapture={handleLeadCapture}
              isSending={isSending}
            />
          )}

          {step === 'final' && (
            <FinalStep />
          )}
        </div>
      </div>
    </main>
  );
}

// Componente da Calculadora
function CalculatorStep({ data, onUpdate, onSubmit }: {
  data: CalculatorData;
  onUpdate: (field: keyof CalculatorData, value: number) => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center mb-8">
        <Calculator className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Configure seu Negócio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Base de Clientes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Base de Clientes Atual
          </label>
          <div className="relative">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={data.baseClientes}
              onChange={(e) => onUpdate('baseClientes', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>100</span>
              <span className="font-bold text-blue-600">{data.baseClientes.toLocaleString('pt-BR')}</span>
              <span>10k</span>
            </div>
          </div>
        </div>

        {/* Ticket Médio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Ticket Médio por Venda
          </label>
          <div className="relative">
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={data.ticketMedio}
              onChange={(e) => onUpdate('ticketMedio', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>R$ 50</span>
              <span className="font-bold text-blue-600">R$ {data.ticketMedio}</span>
              <span>R$ 5k</span>
            </div>
          </div>
        </div>

        {/* Taxa de Conversão por Indicação */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Taxa de Conversão por Indicação (%)
          </label>
          <div className="relative">
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={data.taxaConversaoIndicacao}
              onChange={(e) => onUpdate('taxaConversaoIndicacao', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>5%</span>
              <span className="font-bold text-blue-600">{data.taxaConversaoIndicacao}%</span>
              <span>30%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Baseado em estatísticas reais de programas de indicação
            </p>
          </div>
        </div>

        {/* Comissão por Indicação */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Comissão por Indicação (%)
          </label>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={data.comissaoIndicacao}
              onChange={(e) => onUpdate('comissaoIndicacao', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>10%</span>
              <span className="font-bold text-blue-600">{data.comissaoIndicacao}%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Frequência de Indicações */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Indicações por Cliente/Mês
          </label>
          <div className="relative">
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={data.frequenciaIndicacoes}
              onChange={(e) => onUpdate('frequenciaIndicacoes', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0.5</span>
              <span className="font-bold text-blue-600">{data.frequenciaIndicacoes}</span>
              <span>5</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Média de indicações por cliente por mês
            </p>
          </div>
        </div>

        {/* Margem de Lucro */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Margem de Lucro (%)
          </label>
          <div className="relative">
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              value={data.margemLucro}
              onChange={(e) => onUpdate('margemLucro', Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>30%</span>
              <span className="font-bold text-blue-600">{data.margemLucro}%</span>
              <span>90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Rápido */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Resumo Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-600 font-semibold">Receita Atual:</span>
            <p className="text-blue-900 font-bold">R$ {(data.baseClientes * data.ticketMedio / 1000).toFixed(1)}k/mês</p>
          </div>
          <div>
            <span className="text-blue-600 font-semibold">Potencial de Indicações:</span>
            <p className="text-blue-900 font-bold">{data.baseClientes * data.frequenciaIndicacoes} leads/mês</p>
          </div>
          <div>
            <span className="text-blue-600 font-semibold">Conversões Esperadas:</span>
            <p className="text-blue-900 font-bold">{Math.round(data.baseClientes * data.frequenciaIndicacoes * data.taxaConversaoIndicacao / 100)} vendas/mês</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calcular Potencial de Crescimento
        </button>
      </div>
    </motion.div>
  );
}

// Componente do Formulário
function FormStep({ userData, onUpdate, onSubmit, onBack }: {
  userData: UserData;
  onUpdate: (field: keyof UserData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center mb-8">
        <Users className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Seus Dados</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              value={userData.nome}
              onChange={(e) => onUpdate('nome', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Corporativo *
            </label>
            <input
              type="email"
              required
              value={userData.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              required
              value={userData.telefone}
              onChange={(e) => onUpdate('telefone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Empresa *
            </label>
            <input
              type="text"
              required
              value={userData.empresa}
              onChange={(e) => onUpdate('empresa', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome da sua empresa"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de Funcionários *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['1 a 10', '11 a 50', '51 a 500', '501 a 1.000', 'Acima de 1.000'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onUpdate('funcionarios', option)}
                  className={`py-3 px-4 rounded-lg border transition-all duration-200 ${
                    userData.funcionarios === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ← Voltar
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            Ver Análise Completa
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Componente dos Resultados
function ResultsStep({ resultados, onCapture, isSending }: {
  resultados: any;
  onCapture: () => void;
  isSending: boolean;
}) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Resumo dos Resultados */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-8">
          <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Análise do Potencial de Crescimento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Receita Total</h3>
            <p className="text-3xl font-bold text-blue-600">
              R$ {(resultados.receitaTotal / 1000).toFixed(1)}k
            </p>
            <p className="text-sm text-gray-600">por mês</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Crescimento</h3>
            <p className="text-3xl font-bold text-green-600">
              +{resultados.crescimentoReceita.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">na receita</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <UserCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Novos Clientes</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(resultados.conversoesIndicacao)}
            </p>
            <p className="text-sm text-gray-600">por mês</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">ROI</h3>
            <p className="text-3xl font-bold text-orange-600">
              {resultados.roi.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">retorno</p>
          </div>
        </div>
      </div>

      {/* Detalhamento */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalhamento do Programa de Indicações</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">📊 Métricas de Indicação</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Indicações Geradas:</span>
                <span className="font-semibold">{Math.round(resultados.indicacoesMensais).toLocaleString('pt-BR')}/mês</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Conversão:</span>
                <span className="font-semibold">{resultados.taxaConversaoIndicacao}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Novos Clientes:</span>
                <span className="font-semibold">{Math.round(resultados.conversoesIndicacao)}/mês</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-600 border-t pt-3">
                <span>Potencial:</span>
                <span>{Math.round(resultados.conversoesIndicacao * 12)}/ano</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">💰 Análise Financeira</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Receita por Indicações:</span>
                <span className="font-semibold">R$ {(resultados.receitaIndicacoes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Custo em Comissões:</span>
                <span className="font-semibold">R$ {(resultados.custoComissoes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lucro Líquido:</span>
                <span className="font-semibold">R$ {(resultados.lucroIndicacoes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-3">
                <span>Lucro Anual:</span>
                <span>R$ {(resultados.lucroIndicacoes * 12 / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">🚀 Recomendações para Otimização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-blue-800">Aumente a frequência de indicações com campanhas sazonais</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-blue-800">Implemente sistema de recompensas para clientes mais ativos</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-blue-800">Otimize a taxa de conversão com materiais de apoio</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-blue-800">Monitore e ajuste comissões baseado no desempenho</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={onCapture}
          disabled={isSending}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-12 rounded-xl text-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isSending ? 'Enviando...' : 'Receber Análise Detalhada + Plano de Implementação'}
        </button>
        <p className="text-gray-600 mt-4">
          Enviaremos uma análise completa com estratégias personalizadas para maximizar seu programa de indicações
        </p>
      </div>
    </motion.div>
  );
}

// Componente Final
function FinalStep() {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Análise Enviada com Sucesso!
      </h2>
      
      <p className="text-xl text-gray-600 mb-8">
        Sua análise personalizada foi enviada para seu email. 
        Em breve nossa equipe entrará em contato para discutir as estratégias de implementação 
        e como maximizar o potencial do seu programa de indicações.
      </p>
      
      <div className="text-sm text-gray-500">
        Redirecionando para a página de agradecimento...
      </div>
    </motion.div>
  );
}
