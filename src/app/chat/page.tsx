"use client";
import ChatBot from '@/components/ChatBot';

export default function ChatPage() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #18181b 0%, #23232b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <ChatBot fullscreen />
    </div>
  );
} 