# Meu portifólio — aplicação React

Esta pasta contém a **segunda página** do projeto: uma aplicação React criada com Vite e TypeScript para apresentar o portfólio de Leonardo Fernandes Mastroto.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run test
```

## Estrutura principal

- `src/pages/Index.tsx`: composição da página principal.
- `src/components/portfolio/`: seções do portfólio.
- `public/meu-portifolio-favicon.svg`: favicon da segunda página.

## Objetivo

Entregar uma experiência mais completa do que a landing page inicial, reunindo apresentação, habilidades, certificados e contato em uma interface moderna.

## Contador de commits (GitHub + Upstash + Vercel Cron)

Para atualizar automaticamente o card de `Commits` da seção "sobre-mim", configure:

- `GITHUB_USERNAME` (ex.: `fernandes053`)
- `GITHUB_TOKEN` (token com acesso de leitura)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `CRON_SECRET`

Endpoints:

- `GET /api/commit-count`: retorna o total salvo em cache (ou busca no GitHub se cache ainda vazio), somando commits de autoria do usuário nos repositórios do próprio perfil.
- `GET /api/cron/sync-commit-count`: rota chamada pelo Vercel Cron para sincronizar o contador 1 vez por dia (00:00 UTC).

Cron:

- Configurado em `vercel.json` com `0 0 * * *` (execução diária às 00:00 UTC).
