# Projeto de Perfil + Link Hub em React

Este repositório reúne **duas telas** conectadas entre si e ambas foram desenvolvidas por mim:

1. **Página inicial estática (HTML + CSS)** com card de perfil, criada do zero por mim.
2. **Aplicação React (Vite + TypeScript)** também construída por mim, com meus conhecimentos e com apoio de IA para acelerar partes do processo.

A ideia é simples: você abre a página inicial, clica no botão e segue para a tela React.

---

## 📁 Estrutura do projeto

```bash
.
├── index.html                 # Página inicial (card de perfil)
├── style.css                  # Estilos da página inicial
├── images/                    # Imagens e favicon da página inicial
└── link-hub-pro-main/         # App React (Vite + TS)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── src/
```

---


## ✍️ Autoria e contexto

- A **primeira página** (HTML/CSS básico) foi feita por mim, de forma autoral.
- A **segunda tela** em React também foi feita por mim, aplicando meus conhecimentos.
- Em alguns momentos, utilizei **IA como apoio** (ideias, ajustes e produtividade), mas o projeto foi desenvolvido por mim.

---

## 🚀 Tecnologias utilizadas

### Página inicial
- HTML5
- CSS3

### Página React
- React 18
- Vite
- TypeScript
- Radix UI / utilitários de UI (dependências do projeto)

---

## ▶️ Como executar o projeto

> Recomendado: usar **dois terminais**.

### 1) Subir a aplicação React

No terminal 1:

```bash
cd link-hub-pro-main
npm install
npm run dev
```

A aplicação React é servida na porta `8080`.

### 2) Abrir a página inicial estática

No terminal 2 (na raiz do projeto):

- Opção A (VS Code): extensão **Live Server**
- Opção B (Node):

```bash
npx serve .
```

Depois, abra o `index.html` raiz no navegador e clique em **“Ir para outra página”**.

---

## 🔄 Fluxo de navegação

1. Você acessa a página inicial (`/index.html`).
2. Clica no botão do card.
3. O navegador abre `link-hub-pro-main/index.html`.
4. Esse arquivo encaminha para `http://localhost:8080/` quando necessário, garantindo que o React rode via Vite.

---

## ✅ Pontos positivos para apresentação

- Separação clara entre uma tela estática e uma SPA em React.
- Estrutura de projeto organizada por responsabilidade.
- Setup simples para desenvolvimento local.
- Boa base para evolução (rotas, backend, deploy etc.).

---

## 🛠️ Próximas melhorias sugeridas

- Melhorar os textos de apresentação e dados do perfil.
- Criar uma rota interna no React para unificar ainda mais o fluxo.
- Adicionar testes básicos (Vitest/RTL).
- Fazer deploy da versão React e da landing page.

---

## 👤 Autor

**Leonardo Fernandes Mastroto**

Projeto autoral com apoio de IA como ferramenta de produtividade.