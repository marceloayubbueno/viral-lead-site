# Implementação do Google Analytics em Site HTML

## Objetivo
Documentar o processo de implantação do Google Analytics no site, garantindo rastreamento de acessos e facilitando futuras manutenções.

---

## Passo a Passo da Implementação

1. **Criação da Conta**
   - Acesse [Google Analytics](https://analytics.google.com/).
   - Crie uma conta e uma propriedade para o site.
   - Copie o ID de medição (exemplo: `G-3LD18W31KC`).

2. **Obtenção da Tag**
   - No painel do Google Analytics, acesse o fluxo de dados da propriedade.
   - Copie o código da tag global (Gtag.js):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3LD18W31KC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3LD18W31KC');
</script>
```

3. **Inclusão da Tag**
   - Adicione o código acima antes da tag `</head>` em **todas as páginas HTML** do site.
   - No projeto, a tag foi incluída nos arquivos:
     - `src/bot-html/index.html`
     - `src/bot-html/wordpress-chatbot.html`
     - `src/bot-html/wordpress-chatbot-copy.html`
     - `src/bot-html/wordpress-chatbot-fullscreen.html`

4. **Publicação**
   - Faça o deploy dos arquivos atualizados para o servidor/hosting.

5. **Validação**
   - Acesse o site publicado e verifique em "Tempo real" no painel do Google Analytics.
   - Opcional: Utilize a extensão "Tag Assistant" do Google Chrome para validar a tag.

---

## Boas Práticas e Segurança
- **Não compartilhe publicamente o ID de medição.**
- Se o site evoluir para frameworks ou templates, centralize a tag para facilitar manutenção.
- Caso o site colete dados pessoais, inclua aviso de cookies/privacidade para conformidade com LGPD/GDPR.

---

## Possíveis Melhorias Futuras
- **Automatizar a inclusão da tag** em novos arquivos HTML via script ou template engine.
- **Adicionar aviso de cookies/privacidade** para informar usuários sobre o uso de Analytics.
- **Migrar a tag para o local adequado** caso o site utilize frameworks modernos (ex: Next.js, React, etc.).
- **Monitorar atualizações do Google Analytics** para garantir que a tag esteja sempre atualizada.

---

## Referências
- [Documentação Oficial Google Analytics](https://support.google.com/analytics/answer/1008080?hl=pt-BR)
- [Tag Assistant (by Google)](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-goo/)

---

**Responsável pela implementação:**
- Engenharia de Software
- Data: <!-- Atualize com a data da implantação --> 