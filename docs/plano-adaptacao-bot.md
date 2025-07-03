# Plano de Adaptação do Bot (wordpress-chatbot.html) para Next.js/React

## 1. Objetivo
Adaptar o bot atualmente em HTML, CSS e JS puro (src/bot-html/wordpress-chatbot.html) para um componente React moderno, integrado ao projeto Next.js, preparando o código para futura integração com backend.

---

## 2. Levantamento Inicial
- **Arquivo principal:** `wordpress-chatbot.html`
- **Lógica:** `script.js`
- **Estilos:** `styles.css`
- **Integração atual:** Google Sheets (via requisições JS)

---

## 3. Etapas do Plano

### 3.1. Análise e Organização
- Separar o HTML em estrutura (JSX), lógica (JS) e estilos (CSS).
- Mapear pontos de integração com Google Sheets para futura refatoração.

### 3.2. Conversão para Componente React
- Criar `ChatBot.tsx` em `src/components/`.
- Converter o HTML para JSX, ajustando sintaxe e estrutura.
- Adaptar o CSS para módulo (`ChatBot.module.css`) ou importar globalmente.
- Refatorar o JS para hooks (`useState`, `useEffect`), evitando manipulação direta do DOM.
- Garantir que toda a lógica de envio/recebimento de mensagens seja controlada por estado React.

### 3.3. Integração e Testes
- Importar o componente no site Next.js e testar funcionamento.
- Ajustar responsividade, acessibilidade e integração visual.
- Validar integração com Google Sheets (manter como está até migrar para backend próprio).

### 3.4. Preparação para Backend Futuro
- Isolar funções de integração externa (Google Sheets) em hooks ou serviços.
- Documentar pontos de troca para futura API/Backend.

### 3.5. Refino e Modularização
- Separar subcomponentes se necessário (ex: mensagens, input, header do chat).
- Garantir código limpo, reutilizável e fácil de manter.

---

## 4. Observações e Recomendações
- Priorizar MVP funcional no React, mantendo integração atual.
- Planejar migração para backend próprio de forma incremental.
- Documentar todas as decisões e pontos de integração para facilitar evolução.

---

**Dúvidas ou próximos passos? Atualize este documento conforme o projeto evoluir!** 