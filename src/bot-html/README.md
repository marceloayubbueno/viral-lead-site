# Chat Bot de Atendimento

Este é um chat bot simples para atendimento ao cliente que coleta informações e as envia para uma planilha do Google Sheets.

## Configuração

### 1. Configurar o Google Sheets

1. Crie uma nova planilha no Google Sheets
2. Adicione as seguintes colunas na primeira linha:
   - Nome
   - Email
   - Telefone
   - Mensagem
   - Data/Hora

### 2. Configurar o Google Apps Script

1. No Google Sheets, vá em Extensões > Apps Script
2. Cole o seguinte código:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.nome,
    data.email,
    data.telefone,
    data.mensagem,
    new Date()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Publique o script como uma aplicação web:
   - Vá em Implantar > Nova implantação
   - Selecione "Executar como: Eu mesmo"
   - Selecione "Quem tem acesso: Qualquer pessoa"
   - Clique em Implantar
   - Copie a URL fornecida

### 3. Configurar o Chat Bot

1. No arquivo `script.js`, substitua `SUA_URL_DO_GOOGLE_APPS_SCRIPT` pela URL que você copiou do Google Apps Script

## Como Usar

1. Abra o arquivo `index.html` em um navegador
2. O chat bot aparecerá no canto inferior direito da página
3. Siga as instruções do bot para fornecer suas informações
4. Os dados serão automaticamente enviados para a planilha do Google Sheets

## Funcionalidades

- Interface de chat amigável
- Coleta de informações do usuário
- Integração com Google Sheets
- Design responsivo
- Fácil de personalizar

## Personalização

Você pode personalizar o chat bot modificando:
- Cores e estilos no arquivo `styles.css`
- Fluxo de conversa no arquivo `script.js`
- Campos de dados coletados no arquivo `script.js` 