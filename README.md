# Meu portifólio

Projeto pessoal com **duas experiências conectadas** para apresentar meu perfil, minha evolução nos estudos e meus principais links:

- **Página inicial estática** em HTML e CSS com card de apresentação.
- **Página de portfólio em React + Vite + TypeScript** com seções sobre mim, skills, certificados e contato.

A proposta é abrir a landing page inicial e, a partir dela, acessar a aplicação React com uma experiência mais completa.

---

## Estrutura do projeto

```text
.
├── index.html                       # Página inicial estática
├── style.css                        # Estilos da landing page
├── images/                          # Foto e favicon da primeira página
├── README.md                        # Documentação principal
└── student-coder-journey-main/      # Aplicação React (segunda página)
    ├── index.html                   # Entrada da aplicação
    ├── package.json                 # Scripts e dependências
    ├── public/                      # Assets públicos, incluindo favicon
    └── src/                         # Código-fonte React
```

---

## Tecnologias utilizadas

### Primeira página
- HTML5
- CSS3
- Google Fonts

### Segunda página
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- React Router
- Vitest

---

## Como executar localmente

### 1. Suba a aplicação React

```bash
cd student-coder-journey-main
npm install
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em `http://localhost:8080/` neste projeto.

### 2. Abra a página inicial estática

Na raiz do repositório, você pode:

- abrir `index.html` com uma extensão como **Live Server**; ou
- servir a pasta com um servidor simples.

Exemplo:

```bash
npx serve .
```

Depois, abra a página inicial no navegador e clique no botão para ir para a página React.

---

## Fluxo de navegação

1. O visitante acessa a **página inicial**.
2. Visualiza o card com a apresentação pessoal.
3. Clica em **Ir para a página React**.
4. É direcionado para a **segunda página**, onde está o portfólio completo.

---

## O que o projeto apresenta

- Identidade visual pessoal.
- Resumo profissional e acadêmico.
- Organização de conteúdo em seções.
- Espaço para evolução contínua com novos projetos, links e certificados.

---

## Melhorias futuras

- Publicar uma versão online com deploy.
- Adicionar projetos reais na seção principal do portfólio.
- Criar formulários ou integrações para contato.
- Adicionar testes visuais e de navegação.
- Unificar ainda mais a experiência entre a landing page e a SPA.

---

## Observação sobre o nome do repositório

O nome de apresentação do projeto foi atualizado para **Meu portifólio** nos arquivos do projeto.
Se você quiser mudar também o nome do repositório hospedado no GitHub, isso precisa ser feito diretamente nas configurações do próprio repositório na plataforma.

---

## Autor

**Leonardo Fernandes Mastroto**

Projeto autoral desenvolvido como portfólio pessoal, com apoio de IA para produtividade e refinamento.
