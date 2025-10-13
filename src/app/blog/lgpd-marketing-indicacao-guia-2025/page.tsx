'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ShareButton from '@/components/ShareButton';
import MarkdownWithCTA from '@/components/MarkdownWithCTA';
import { formatDate } from '../../../utils/markdown';
import Head from 'next/head';

export default function LGPDMarketingIndicacaoGuia2025Page() {
  const post = {
    title: "LGPD e Marketing de Indicação: Guia Prático 2025 | Viral Lead",
    slug: "lgpd-marketing-indicacao-guia-2025",
    description: "Descubra como fazer marketing de indicação em compliance com LGPD. Guia completo com boas práticas, templates e checklist de conformidade.",
    updatedAt: new Date().toISOString(),
    content: `# LGPD e Marketing de Indicação: Guia Prático 2025

**Se você tem programa de indicação mas não está em compliance com LGPD, está correndo riscos enormes**. **Empresas responsáveis** já descobriram que **compliance não é obstáculo** - é **oportunidade** de construir **confiança** e **diferenciar-se** da concorrência, gerando **até 40% mais indicações** por transparência.

LGPD não é burocracia - é **proteção** para você e seus clientes. Programas em compliance evitam multas de até R$ 50 milhões, processos judiciais, e principalmente, perda de confiança que pode destruir seu negócio.

## O Que é LGPD e Por Que Importa

### **Lei Geral de Proteção de Dados Explicada**

LGPD é lei brasileira (Lei 13.709/2018) que regula **coleta, uso, armazenamento e compartilhamento** de dados pessoais. Inspirada na GDPR europeia, protege privacidade dos cidadãos.

**Dados pessoais incluem**: Nome, email, telefone, CPF, endereço, IP, cookies, histórico de compras, comportamento online - **tudo que identifica pessoa**.

**Por que importa para indicações**: Programas de indicação **coletam e compartilham** dados pessoais (quem indicou quem, contatos, comportamento). Sem compliance, você está violando a lei.

**Penalidades por não compliance**:
- Multas de até 2% do faturamento (máximo R$ 50 milhões)
- Proibição de coletar dados
- Publicização da infração
- Processos judiciais
- Perda de confiança dos clientes

## Princípios da LGPD Para Indicações

### **Os 10 Princípios Fundamentais**

**Princípio 1: Finalidade**

Dados só podem ser usados para **propósito específico** informado ao titular.

**Na prática**: Se você coleta email para programa de indicação, não pode usar para outras finalidades sem novo consentimento.

**Princípio 2: Adequação**

Coleta deve ser **compatível** com finalidade informada.

**Na prática**: Não peça CPF se não precisa dele para programa funcionar.

**Princípio 3: Necessidade**

Colete apenas dados **estritamente necessários**.

**Na prática**: Para indicação, você precisa de nome e contato. Não precisa de data de nascimento, estado civil, etc.

**Princípio 4: Livre Acesso**

Titular tem direito de **acessar seus dados** quando quiser.

**Na prática**: Forneça dashboard onde cliente vê todos dados que você tem dele.

**Princípio 5: Qualidade dos Dados**

Dados devem estar **corretos e atualizados**.

**Na prática**: Permita que cliente atualize dados facilmente.

**Princípio 6: Transparência**

Informações sobre tratamento devem ser **claras e acessíveis**.

**Na prática**: Política de privacidade em linguagem simples, não juridiquês.

**Princípio 7: Segurança**

Dados devem ser **protegidos** contra acessos não autorizados.

**Na prática**: Criptografia, backups, controle de acesso, servidores seguros.

**Princípio 8: Prevenção**

Medidas para **prevenir** danos.

**Na prática**: Auditorias regulares, testes de segurança, plano de resposta a incidentes.

**Princípio 9: Não Discriminação**

Dados não podem ser usados para **discriminar**.

**Na prática**: Não use dados para negar serviço ou cobrar mais de grupos específicos.

**Princípio 10: Responsabilização**

Empresa deve **demonstrar** compliance.

**Na prática**: Documentação de processos, registros de consentimento, auditorias.

## Como Fazer Programa LGPD-Compliant

### **Passo 1: Obtenha Consentimento Explícito**

**Consentimento deve ser**: Livre, informado, inequívoco, específico.

**Template de consentimento**:
"Ao participar do programa de indicação, você autoriza a Viral Lead a:
- Coletar e armazenar seu nome, email e telefone
- Rastrear indicações feitas através do seu link
- Compartilhar seu nome com pessoas indicadas
- Enviar comunicações sobre o programa

Você pode revogar este consentimento a qualquer momento através de [email/link].

[ ] Li e concordo com os termos acima"

**Erro fatal**: Consentimento pré-marcado ou implícito. Precisa ser **ação ativa** do usuário.

### **Passo 2: Seja Transparente**

**Crie política de privacidade clara** específica para programa de indicação.

**O que incluir**:
- Quais dados coletamos e por quê
- Como usamos os dados
- Com quem compartilhamos
- Por quanto tempo armazenamos
- Como protegemos
- Direitos do titular
- Como exercer direitos

**Linguagem**: Simples, clara, sem juridiquês. Cliente precisa **entender**.

### **Passo 3: Implemente Direitos dos Titulares**

**Titulares têm direitos que você DEVE respeitar**:

**Direito de Acesso**: Ver quais dados você tem.
**Solução**: Dashboard com todos os dados.

**Direito de Correção**: Corrigir dados incorretos.
**Solução**: Formulário de atualização.

**Direito de Exclusão**: Deletar dados.
**Solução**: Botão "Excluir minha conta" que realmente deleta.

**Direito de Portabilidade**: Receber dados em formato legível.
**Solução**: Exportação em CSV/PDF.

**Direito de Revogação**: Cancelar consentimento.
**Solução**: Opt-out fácil e imediato.

### **Passo 4: Proteja os Dados**

**Segurança não é opcional** - é obrigatória.

**Medidas essenciais**:
- Criptografia de dados sensíveis
- HTTPS em todo site
- Backups regulares criptografados
- Controle de acesso por função
- Logs de auditoria
- Testes de segurança regulares
- Plano de resposta a incidentes

### **Passo 5: Documente Tudo**

**LGPD exige que você demonstre compliance**.

**Documentação necessária**:
- Política de privacidade
- Termos de uso
- Registros de consentimento
- Processos de tratamento de dados
- Medidas de segurança
- Treinamento de equipe
- Auditorias realizadas

## Checklist de Compliance LGPD

### **Auditoria Completa**

**Coleta de Dados:**
- [ ] Consentimento explícito obtido
- [ ] Finalidade clara comunicada
- [ ] Apenas dados necessários coletados
- [ ] Formulários com opt-in ativo

**Uso de Dados:**
- [ ] Dados usados apenas para finalidade informada
- [ ] Compartilhamento apenas com consentimento
- [ ] Terceiros em compliance
- [ ] Transferência internacional regulamentada

**Armazenamento:**
- [ ] Dados criptografados
- [ ] Backups seguros
- [ ] Retenção limitada ao necessário
- [ ] Exclusão após término da finalidade

**Direitos dos Titulares:**
- [ ] Acesso facilitado aos dados
- [ ] Correção possível
- [ ] Exclusão funcional
- [ ] Portabilidade implementada
- [ ] Revogação imediata

**Segurança:**
- [ ] HTTPS implementado
- [ ] Controle de acesso
- [ ] Logs de auditoria
- [ ] Plano de resposta a incidentes
- [ ] Testes de segurança regulares

**Governança:**
- [ ] DPO nomeado (se necessário)
- [ ] Políticas documentadas
- [ ] Equipe treinada
- [ ] Processos mapeados
- [ ] Auditorias regulares

## Erros Fatais de LGPD

### **Erro 1: Ignorar LGPD**

Achar que não se aplica ou que ninguém fiscaliza.

**Realidade**: LGPD se aplica a TODAS as empresas brasileiras. Multas estão acontecendo.

**Solução**: Implemente compliance imediatamente.

### **Erro 2: Copiar Política Genérica**

Baixar template da internet sem adaptar.

**Realidade**: Política precisa refletir **suas práticas reais**.

**Solução**: Customize política para seu negócio específico.

### **Erro 3: Consentimento Vago**

"Aceito receber comunicações" sem especificar quais.

**Realidade**: Consentimento precisa ser **específico**.

**Solução**: Liste exatamente o que você vai fazer com dados.

### **Erro 4: Não Implementar Direitos**

Ter política bonita mas não permitir exercício de direitos.

**Realidade**: Titular precisa **conseguir exercer** direitos facilmente.

**Solução**: Implemente funcionalidades reais, não apenas texto.

## Oportunidade: LGPD como Diferencial

### **Transforme Compliance em Vantagem**

**Empresas transparentes ganham confiança**. Use compliance como diferencial competitivo.

**Como comunicar**:
- "100% em compliance com LGPD"
- "Seus dados protegidos e seguros"
- "Transparência total sobre uso de dados"
- "Você controla seus dados"

**Resultado**: Clientes preferem empresas confiáveis. Compliance aumenta conversão.

## Conclusão: Compliance como Fundação

### **Proteção e Oportunidade**

LGPD não é obstáculo - é **fundação** para programa sustentável. Compliance protege você, seus clientes, e constrói confiança essencial para crescimento.

**A implementação requer disciplina**: audite situação atual, corrija gaps, documente tudo, treine equipe, monitore constantemente.

O momento de garantir compliance é agora. Cada dia sem compliance é risco desnecessário - **implemente hoje mesmo**.`,
    author: "Marcelo Ayub",
    publishedAt: new Date().toISOString(),
    categories: ["Compliance", "Legal"],
    tags: ["LGPD", "Privacidade", "Compliance", "Legal", "Proteção de Dados"],
    coverImage: "",
    readTime: 14
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
      
      <main className="overflow-hidden">
        <Header />
        
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
          </div>

          <div className="container relative">
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Início</Link></li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link href="/blog" className="ml-4 text-gray-400 hover:text-white transition-colors duration-200">Blog</Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-white font-medium truncate max-w-xs">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="text-center max-w-4xl mx-auto">
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {post.categories.map(category => (
                    <span key={category} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30">{category}</span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">{post.description}</p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Por {post.author}
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {post.readTime} min de leitura
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-24">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="w-full">
              <article className="bg-gray-800 rounded-2xl p-8 border border-gray-700 w-full">
                <MarkdownWithCTA content={post.content} postTitle={post.title} />

                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Compartilhar</h3>
                  <div className="flex space-x-4">
                    <ShareButton title={post.title} description={post.description} url={`https://virallead.com.br/blog/${post.slug}`} />
                  </div>
                </div>
              </article>

              <div className="mt-12 flex justify-center">
                <Link href="/blog" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 group">
                  ← Ver Todos os Posts
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ModernFooter />
      </main>
    </>
  );
}

