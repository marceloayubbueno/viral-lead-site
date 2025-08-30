as essa # Estratégia para Criação do Blog em Next.js

## Visão Geral

A proposta é criar o blog como parte do mesmo projeto Next.js do site principal, utilizando arquivos Markdown (`.md` ou `.mdx`) para os posts. Isso garante performance, SEO, facilidade de deploy e visual 100% integrado ao site.

**NOVO**: Implementamos um sistema de autenticação seguro usando Next.js API Routes e variáveis de ambiente da Vercel, sem necessidade de backend separado ou banco de dados.

---

## Vantagens da Abordagem Markdown
- **Performance:** Conteúdo estático, carregamento instantâneo.
- **SEO:** URLs amigáveis, controle total de metadados.
- **Facilidade de edição:** Qualquer editor de texto serve, versionamento via Git.
- **Deploy automatizado:** Push no Git = blog atualizado na Vercel.
- **Zero dependência de plugins ou banco de dados.**
- **Visual e UX integrados ao site principal.**
- **Editor online integrado:** Criação e edição direta no site.
- **Autenticação segura:** Sistema de login real sem complexidade de backend.

---

## Estrutura Recomendada de Pastas

```
/ (raiz do projeto)
  /src
    /app
      /blog
        page.tsx          # Lista de posts
        [slug].tsx        # Página dinâmica para cada post
      /admin
        /login
          page.tsx        # Página de login
        /editor
          page.tsx        # Editor principal
          /[id]
            page.tsx      # Editor para post específico
      /api
        /auth
          /login
            route.ts      # API de login com JWT
    /components
      /admin
        LoginForm.tsx     # Formulário de login
        BlogEditor.tsx    # Editor de posts
        PostForm.tsx      # Formulário de metadados
        ImageUpload.tsx   # Upload de imagens
      /blog
        PostList.tsx      # Lista de posts
        PostCard.tsx      # Card individual do post
    /types
      blog.ts             # Tipos TypeScript para posts
    /utils
      auth.ts             # Utilitários de autenticação
      storage.ts          # Gerenciamento de armazenamento
      markdown.ts         # Processamento de Markdown
  /content
    /blog
      meu-primeiro-post.md
      outro-artigo.md
      ...
/docs
  estrategia-blog.md
```

---

## Sistema de Autenticação Seguro

### Arquitetura de Segurança
- **Next.js API Routes** para validação de credenciais
- **Variáveis de ambiente da Vercel** para armazenar senhas
- **Tokens JWT** para sessões seguras
- **Sem exposição** de credenciais no frontend

### Como Funciona
1. **Credenciais armazenadas** nas variáveis de ambiente da Vercel
2. **Frontend envia** usuário/senha para `/api/auth/login`
3. **API valida** credenciais contra variáveis do servidor
4. **JWT gerado** e retornado para o frontend
5. **Token armazenado** em localStorage/cookie para sessão

### Variáveis de Ambiente na Vercel
```env
ADMIN_USERNAME=marceloayub@virallead
ADMIN_PASSWORD=senha-segura-aqui
JWT_SECRET=chave-secreta-para-jwt
```

### Vantagens da Abordagem
- ✅ **Segurança real** - senhas nunca expostas no frontend
- ✅ **Sem banco de dados** - tudo nas variáveis da Vercel
- ✅ **Deploy automático** - funciona na Vercel sem configuração
- ✅ **Tokens JWT** - sessões seguras e expiráveis
- ✅ **Simplicidade** - sem servidor separado ou complexidade

---

## Funcionalidades do Editor Online

### Autenticação Segura
- Sistema de login real com validação no servidor
- Tokens JWT para sessões seguras
- Middleware de proteção para rotas administrativas
- Logout com invalidação de token

### Editor de Posts
- **Editor Markdown puro** com syntax highlighting
- **Preview em tempo real** do conteúdo
- **Upload de imagens** (base64 temporariamente)
- **Gerenciamento de metadados:**
  - Título
  - Slug (geração automática)
  - Descrição
  - Autor
  - Data de publicação
  - Categorias e tags
  - Imagem de capa

### Gerenciamento de Posts
- Lista de posts existentes
- Criação de novo post
- Edição de posts existentes
- Sistema de categorias e tags
- Botão de publicação direta

---

## Stack Técnica

### Editor e Interface
- **Editor Markdown:** `@uiw/react-md-editor` (simples e robusto)
- **Preview:** Renderização Markdown em tempo real
- **Upload:** Base64 temporário (preparado para migração)

### Armazenamento (Fase 1 - MVP)
- **localStorage** para persistência temporária
- **Estrutura preparada** para migração futura
- **Sincronização automática** entre editor e visualização

### Autenticação Segura
- **Next.js API Routes** para validação de credenciais
- **Variáveis de ambiente da Vercel** para senhas
- **JWT (jsonwebtoken)** para sessões seguras
- **Middleware de proteção** para rotas admin

---

## Fluxo de Autenticação
1. **Usuário acessa** `/admin/login`
2. **Digita credenciais** no formulário
3. **Frontend envia** dados para `/api/auth/login`
4. **API valida** contra variáveis da Vercel
5. **JWT gerado** e retornado
6. **Token armazenado** no frontend
7. **Acesso liberado** para rotas admin

---

## Fluxo de Publicação
1. **Login** no painel administrativo (com JWT)
2. **Criar/Editar** post no editor online
3. **Configurar metadados** (título, descrição, tags, etc.)
4. **Upload de imagens** (base64 temporário)
5. **Preview** do resultado final
6. **Clicar em "Publicar"** para salvar
7. **Post disponível** imediatamente no site

---

## Plano de Implementação

### Fase 1: Estrutura Base (MVP) - 2-3 dias ✅
- [x] Configuração de autenticação segura com API Routes
- [x] Estrutura de dados para posts
- [x] Editor Markdown básico com preview
- [x] Sistema de armazenamento em localStorage

### Fase 2: Funcionalidades Core - 2-3 dias ✅
- [x] Gerenciamento completo de posts
- [x] Sistema de categorias e tags
- [x] Upload de imagens
- [x] Validação e publicação

### Fase 3: Integração e Refinamento - 2-3 dias ✅
- [x] Página `/blog` listando posts
- [x] Páginas dinâmicas para cada post
- [x] Navegação e busca básica
- [x] Preparação para migração futura

### Fase 4: Autenticação Segura - IMPLEMENTADO ✅
- [x] API Routes para login
- [x] Sistema JWT para sessões
- [x] Variáveis de ambiente na Vercel
- [x] Middleware de proteção

---

## Migração Futura (Sem Perder Trabalho)

### Para CMS Headless
- Estrutura de dados já compatível
- Interface de editor reutilizável
- Sistema de metadados padronizado
- Autenticação preparada para OAuth

### Para Backend Próprio
- APIs já estruturadas
- Autenticação preparada para JWT
- Upload de imagens migrável para Cloudinary
- Sistema de sessões escalável

### Para Supabase/Vercel KV
- Dados já estruturados
- Sistema de sincronização preparado
- Interface de usuário adaptável
- Autenticação migrável para Supabase Auth

---

## Próximos Passos
1. ✅ **PLANEJAMENTO COMPLETADO** - Estratégia definida
2. ✅ **FASE 1 IMPLEMENTADA** - Estrutura base do editor
3. ✅ **FASE 2 IMPLEMENTADA** - Funcionalidades core
4. ✅ **FASE 3 IMPLEMENTADA** - Integração com site
5. ✅ **FASE 4 IMPLEMENTADA** - Autenticação segura
6. 🔄 **Testes e refinamentos**
7. 🔄 **Deploy em produção na Vercel**

---

## Configuração de Produção

### Variáveis de Ambiente na Vercel
1. **Dashboard da Vercel** → Settings → Environment Variables
2. **Adicionar:**
   - `ADMIN_USERNAME` = seu-usuario-admin
   - `ADMIN_PASSWORD` = sua-senha-segura
   - `JWT_SECRET` = chave-secreta-aleatoria-32-caracteres

### Deploy Automático
- **Push para GitHub** = deploy automático na Vercel
- **Variáveis configuradas** = sistema de auth funcionando
- **Sem configuração adicional** necessária

---

## Observações
- **Editor online integrado** permite criação de conteúdo direto no site
- **Sistema de auth seguro** sem complexidade de backend
- **Variáveis da Vercel** garantem segurança em produção
- **Estrutura preparada** para migração sem retrabalho
- **Markdown puro** garante controle total e simplicidade
- **localStorage temporário** permite desenvolvimento rápido
- **JWT tokens** garantem sessões seguras e expiráveis

---

**Status: Sistema completo implementado com autenticação segura! 🚀**

**Próximo: Deploy em produção na Vercel com variáveis de ambiente configuradas.** 