# Estratégia para Criação do Blog em Next.js

## Visão Geral

A proposta é criar o blog como parte do mesmo projeto Next.js do site principal, utilizando arquivos Markdown (`.md` ou `.mdx`) para os posts. Isso garante performance, SEO, facilidade de deploy e visual 100% integrado ao site.

---

## Vantagens da Abordagem Markdown
- **Performance:** Conteúdo estático, carregamento instantâneo.
- **SEO:** URLs amigáveis, controle total de metadados.
- **Facilidade de edição:** Qualquer editor de texto serve, versionamento via Git.
- **Deploy automatizado:** Push no Git = blog atualizado na Vercel.
- **Zero dependência de plugins ou banco de dados.**
- **Visual e UX integrados ao site principal.**

---

## Estrutura Recomendada de Pastas

```
/ (raiz do projeto)
  /src
    /app
      /blog
        [slug].tsx   # Página dinâmica para cada post
  /content
    /blog
      meu-primeiro-post.md
      outro-artigo.md
      ...
/docs
  estrategia-blog.md
```

---

## Fluxo de Publicação
1. Escreva o post em Markdown e salve em `/content/blog/nome-do-post.md`.
2. Commit e push no repositório.
3. Deploy automático na Vercel.
4. O post já estará disponível em `/blog/nome-do-post`.

---

## Sugestão de Stack
- **Leitura de Markdown:** `gray-matter` (frontmatter) + `remark`/`rehype` ou `next-mdx-remote`.
- **Roteamento dinâmico:** `[slug].tsx` em `/app/blog`.
- **SEO:** Gerar metadados a partir do frontmatter do Markdown.
- **Listagem:** Página `/blog` lista todos os posts lendo os arquivos da pasta.

---

## Próximos Passos
1. Realizar o deploy do site principal na Vercel.
2. Criar a estrutura `/content/blog` e `/app/blog/[slug].tsx`.
3. Implementar leitura dos arquivos Markdown e renderização dos posts.
4. (Opcional) Migrar posts do WordPress para Markdown.
5. Integrar navegação e identidade visual.

---

## Observações
- Se desejar, é possível evoluir para um CMS headless no futuro, sem perder o trabalho feito.
- O blog pode ser expandido com categorias, tags, busca, comentários, etc.

---

**Dúvidas ou próximos passos? Só avisar!** 