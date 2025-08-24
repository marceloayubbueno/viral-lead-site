# Estratégia para Criação do Blog em Next.js

## Visão Geral

A proposta é criar o blog como parte do mesmo projeto Next.js do site principal, utilizando arquivos Markdown (`.md` ou `.mdx`) para os posts. Isso garante performance, SEO, facilidade de deploy e visual 100% integrado ao site.

**NOVO**: Incluímos um editor online integrado para criação e edição de posts, sem necessidade de backend inicial.

---

## Vantagens da Abordagem Markdown
- **Performance:** Conteúdo estático, carregamento instantâneo.
- **SEO:** URLs amigáveis, controle total de metadados.
- **Facilidade de edição:** Qualquer editor de texto serve, versionamento via Git.
- **Deploy automatizado:** Push no Git = blog atualizado na Vercel.
- **Zero dependência de plugins ou banco de dados.**
- **Visual e UX integrados ao site principal.**
- **Editor online integrado:** Criação e edição direta no site.

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
          route.ts        # Verificação de autenticação
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

## Funcionalidades do Editor Online

### Autenticação
- Sistema simples baseado em variáveis de ambiente
- Middleware de proteção para rotas administrativas
- Login/logout básico sem persistência de sessão

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

### Autenticação
- **Variáveis de ambiente** para credenciais
- **Middleware Next.js** para proteção de rotas
- **Sistema simples** sem persistência de sessão

---

## Fluxo de Publicação
1. **Login** no painel administrativo
2. **Criar/Editar** post no editor online
3. **Configurar metadados** (título, descrição, tags, etc.)
4. **Upload de imagens** (base64 temporário)
5. **Preview** do resultado final
6. **Clicar em "Publicar"** para salvar
7. **Post disponível** imediatamente no site

---

## Plano de Implementação

### Fase 1: Estrutura Base (MVP) - 2-3 dias
- [ ] Configuração de autenticação simples
- [ ] Estrutura de dados para posts
- [ ] Editor Markdown básico com preview
- [ ] Sistema de armazenamento em localStorage

### Fase 2: Funcionalidades Core - 2-3 dias
- [ ] Gerenciamento completo de posts
- [ ] Sistema de categorias e tags
- [ ] Upload de imagens
- [ ] Validação e publicação

### Fase 3: Integração e Refinamento - 2-3 dias
- [ ] Página `/blog` listando posts
- [ ] Páginas dinâmicas para cada post
- [ ] Navegação e busca básica
- [ ] Preparação para migração futura

---

## Migração Futura (Sem Perder Trabalho)

### Para CMS Headless
- Estrutura de dados já compatível
- Interface de editor reutilizável
- Sistema de metadados padronizado

### Para Backend Próprio
- APIs já estruturadas
- Autenticação preparada para JWT
- Upload de imagens migrável para Cloudinary

### Para Supabase/Vercel KV
- Dados já estruturados
- Sistema de sincronização preparado
- Interface de usuário adaptável

---

## Próximos Passos
1. ✅ **PLANEJAMENTO COMPLETADO** - Estratégia definida
2. 🔄 **Implementar Fase 1** - Estrutura base do editor
3. 🔄 **Implementar Fase 2** - Funcionalidades core
4. 🔄 **Implementar Fase 3** - Integração com site
5. 🔄 **Testes e refinamentos**
6. 🔄 **Preparação para migração futura**

---

## Observações
- **Editor online integrado** permite criação de conteúdo direto no site
- **Sem backend inicial** acelera desenvolvimento e reduz complexidade
- **Estrutura preparada** para migração sem retrabalho
- **Markdown puro** garante controle total e simplicidade
- **localStorage temporário** permite desenvolvimento rápido

---

**Status: Planejamento aprovado e pronto para implementação!** 🚀 