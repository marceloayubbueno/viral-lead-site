// Configuração do Google Sheets
const SCRIPT_URL = 'SUA_URL_DO_GOOGLE_APPS_SCRIPT'; // Substitua pela URL do seu Google Apps Script

// Elementos do DOM
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const closeChat = document.getElementById('closeChat');

// Estado do chat
let isChatOpen = true;
let userData = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
};

// Função para adicionar mensagem ao chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para enviar dados para o Google Sheets
async function sendToGoogleSheets(data) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
}

// Função para processar a mensagem do usuário
function processUserMessage(message) {
    if (!userData.nome) {
        userData.nome = message;
        addMessage(`Obrigado, ${message}! Qual é o seu email?`);
    } else if (!userData.email) {
        userData.email = message;
        addMessage('E qual é o seu telefone?');
    } else if (!userData.telefone) {
        userData.telefone = message;
        addMessage('Por fim, qual é a sua mensagem?');
    } else {
        userData.mensagem = message;
        addMessage('Obrigado pelo contato! Suas informações foram registradas e entraremos em contato em breve.');
        
        // Enviar dados para o Google Sheets
        sendToGoogleSheets(userData);
        
        // Resetar dados do usuário
        userData = {
            nome: '',
            email: '',
            telefone: '',
            mensagem: ''
        };
    }
}

// Event Listeners
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        processUserMessage(message);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

closeChat.addEventListener('click', () => {
    isChatOpen = false;
    document.querySelector('.chat-container').style.display = 'none';
});

// Mensagem inicial
addMessage('Olá! Para começarmos, qual é o seu nome?'); 