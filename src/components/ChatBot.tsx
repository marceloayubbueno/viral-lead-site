import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxlsgiP_JXeF7k3aFzwVUe7Wo0bQuW3gRwkspWlCtKD-aqelikAX2brb91cOlZN09X4/exec';
const OBRIGADO_URL = 'https://virallead.com.br/obrigado-lead/';

const initialUserData = {
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  funcionarios: ''
};

type ChatButton = {
  text: React.ReactNode;
  class?: string;
  onClick?: () => void;
};

const ChatBot = ({ fullscreen = false }: { fullscreen?: boolean }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; isUser: boolean }[]>([]);
  const [userData, setUserData] = useState(initialUserData);
  const [input, setInput] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [showButtons, setShowButtons] = useState<ChatButton[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState<'start'|'nome'|'email'|'telefone'|'empresa'|'funcionarios'|'final'>('start');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  console.log('ChatBot RENDER', { windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'ssr' });

  useEffect(() => {
    const el = document.querySelector('.' + styles.chatbotContainer.replace(/\./g, ''));
    if (el) {
      console.log('ChatBot container size:', el.getBoundingClientRect());
    } else {
      console.log('ChatBot container NOT FOUND');
    }
  }, []);

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping, showButtons]);

  // Iniciar chat na primeira renderização
  useEffect(() => {
    if (!initializedRef.current && messages.length === 0 && step === 'start') {
      initializedRef.current = true;
      startChat();
    }
    // eslint-disable-next-line
  }, [messages.length, step]);

  // Função para adicionar mensagem
  const addMessage = (text: React.ReactNode, isUser = false) => {
    setMessages((msgs) => [...msgs, { text, isUser }]);
  };

  // Função para adicionar mensagem com delay e indicador de digitação
  const addMessageWithDelay = async (text: string, isUser = false, delay = 1000) => {
    if (!isUser) setShowTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    if (!isUser) setShowTyping(false);
    addMessage(text, isUser);
  };

  // Função para adicionar botões de resposta
  const addButtons = (buttons: ChatButton[]) => {
    setShowButtons(buttons);
  };

  // Função para adicionar botões com delay
  const addButtonsWithDelay = async (buttons: ChatButton[], delay = 1000) => {
    setShowTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setShowTyping(false);
    addButtons(buttons);
  };

  // Função para enviar dados para o Google Sheets
  const sendToGoogleSheets = async (data: any) => {
    setIsSending(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      setIsSending(false);
      return { status: 'success' };
    } catch (error) {
      setIsSending(false);
      return { status: 'error' };
    }
  };

  // Função para processar a mensagem do usuário
  const processUserMessage = async (message: string) => {
    if (step === 'nome') {
      setUserData((d) => ({ ...d, nome: message }));
      setStep('email');
      await addMessageWithDelay(`Obrigado, ${message}! Qual o seu e-mail corporativo?`, false, 1500);
    } else if (step === 'email') {
      setUserData((d) => ({ ...d, email: message }));
      setStep('telefone');
      await addMessageWithDelay('Qual o seu telefone? (Vamos entrar em contato por ele)', false, 1500);
    } else if (step === 'telefone') {
      setUserData((d) => ({ ...d, telefone: message }));
      setStep('empresa');
      await addMessageWithDelay('De qual empresa você fala?', false, 1500);
    } else if (step === 'empresa') {
      setUserData((d) => ({ ...d, empresa: message }));
      setStep('funcionarios');
      await addMessageWithDelay('Última pergunta, qual número de funcionários da sua empresa?', false, 1500);
      await addButtonsWithDelay([
        { text: '1 a 10', class: 'funcionarios', onClick: () => selectFuncionarios('1 a 10') },
        { text: '11 a 50', class: 'funcionarios', onClick: () => selectFuncionarios('11 a 50') },
        { text: '51 a 500', class: 'funcionarios', onClick: () => selectFuncionarios('51 a 500') },
        { text: '501 a 1.000', class: 'funcionarios', onClick: () => selectFuncionarios('501 a 1.000') },
        { text: 'Acima de 1.000', class: 'funcionarios', onClick: () => selectFuncionarios('Acima de 1.000') },
      ], 1000);
    }
  };

  // Função para selecionar número de funcionários
  const selectFuncionarios = async (numero: string) => {
    setShowButtons([]);
    addMessage(`Número de funcionários: ${numero}`, true);
    setStep('final');
    const data = {
      ...userData,
      funcionarios: numero,
      dataHora: new Date().toLocaleString('pt-BR'),
    };
    await addMessageWithDelay('Enviando suas informações...', false, 1000);
    const result = await sendToGoogleSheets(data);
    if (result.status === 'success') {
      await addMessageWithDelay('Obrigado pelo contato! Redirecionando...', false, 1000);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('leadAcesso', 'ok');
          if (numero === '1 a 10') {
            window.location.href = '/obrigadolead';
          } else {
            window.location.href = '/obrigadoleadqualificado';
          }
        }
      }, 1500);
    } else {
      await addMessageWithDelay('Desculpe, tivemos um problema ao salvar suas informações. Por favor, tente novamente mais tarde.', false, 1500);
    }
    setUserData(initialUserData);
    setStep('final');
  };

  // Função para iniciar o chat
  const startChat = async () => {
    setStep('start');
    await addMessageWithDelay('Olá, tudo bem?', false, 500);
    await addMessageWithDelay('Gostaria de conhecer mais sobre nosso Software?', false, 1500);
    await addButtonsWithDelay([
      { text: (<><span>SIM, QUERO CONHECER</span> <span style={{fontSize:'1.2em',marginLeft:'0.3em'}}>&rarr;</span></>), class: 'sim', onClick: async () => {
        addMessage('SIM, QUERO CONHECER', true);
        setShowButtons([]);
        setStep('nome');
        await addMessageWithDelay('Show! Vou pegar umas informações rápidas', false, 1000);
        await addMessageWithDelay('Qual o seu nome?', false, 1500);
      }},
    ], 1000);
  };

  // Handler de envio
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || showButtons.length > 0) return;
    addMessage(input, true);
    await processUserMessage(input);
    setInput('');
  };

  // Handler de clique nos botões
  const handleButtonClick = async (button: ChatButton) => {
    if (button.onClick) await button.onClick();
  };

  // O input só fica desabilitado se houver botões de escolha OU se estiver enviando
  const inputDisabled = showButtons.length > 0 || isSending || step === 'start' || step === 'final';

  // Função para reiniciar o chat manualmente (caso queira adicionar botão futuramente)
  const resetChat = () => {
    setMessages([]);
    setUserData(initialUserData);
    setStep('start');
  };

  return (
    <div className={fullscreen ? `${styles.chatbotContainer} ${styles.fullscreen}` : styles.chatbotContainer} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header do Chatbot */}
      <div className={styles.chatbotHeader} style={{ flex: '0 0 auto' }}>
        <span>Viral Lead</span>
      </div>
      {/* Área de mensagens */}
      <div className={styles.chatbotMessages} style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: 0 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.isUser ? styles.userMessage : styles.botMessage}
            style={{ marginBottom: 12 }}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {showTyping && (
          <div className={styles.typingIndicator}>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
            <div className={styles.typingDot}></div>
          </div>
        )}
        {showButtons.length > 0 && (
          <div className={styles.messageButtons}>
            {showButtons.map((btn, i) => (
              <button
                key={i}
                className={
                  styles.messageButton + (btn.class ? ' ' + (styles as any)[btn.class] : '')
                }
                onClick={() => handleButtonClick(btn)}
              >
                {btn.text}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input do usuário */}
      <form className={styles.chatbotForm} style={{ flex: '0 0 auto' }} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.chatbotInput}
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={inputDisabled}
        />
        <button
          type="submit"
          className={styles.chatbotSendButton}
          disabled={inputDisabled}
        >
          {isSending ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ChatBot; 