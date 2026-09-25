# Lincoln Silva — Portfolio

Portfólio pessoal desenvolvido com **React** e **Vite**, criado para apresentar os meus projetos, tecnologias e experiência como desenvolvedor com foco em **Backend Java**.

O projeto utiliza uma estrutura simples de páginas em React e é preparado para execução em produção através de **Docker e Nginx**.

## Tecnologias

* React
* JavaScript
* Vite
* HTML5
* CSS3
* Docker
* Nginx
* Git

## Estrutura

```text
meu-portfolio/
├── public/
├── src/
│   ├── assets/
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── NotFound.jsx
│   ├── ProjectsPage.jsx
│   ├── about.jsx
│   ├── index.jsx
│   ├── main.jsx
│   └── styles.css
├── Dockerfile
├── DEPLOY.md
├── docker-compose.yml
├── nginx.conf
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Desenvolvimento local

### Pré-requisitos

* Node.js
* npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/lincolnhammed/meu-portfolio.git
cd meu-portfolio
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará o projeto localmente.

## Build

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta:

```text
dist/
```

## Execução com Docker

O projeto também pode ser executado utilizando Docker.

Depois de instalar as dependências e gerar o build:

```bash
npm run build
```

Execute:

```bash
sudo docker compose up -d --build
```

O container utiliza **Nginx** para servir os arquivos estáticos da aplicação.

A configuração do container está em:

```text
nginx.conf
```

Ela também permite o funcionamento das rotas da aplicação React através de:

```nginx
try_files $uri $uri/ /index.html;
```

## Deploy

O projeto foi preparado para ser executado em um servidor Linux utilizando:

```text
Internet
   ↓
Nginx
   ↓
Docker
   ↓
Nginx
   ↓
React
```

O Nginx do servidor funciona como reverse proxy, enquanto o Nginx dentro do container serve os arquivos estáticos gerados pelo Vite.

O projeto utiliza o domínio:

```text
https://lincolnsilva.dev
```

## Reinício automático

O `docker-compose.yml` utiliza:

```yaml
restart: unless-stopped
```

Dessa forma, depois que o Docker iniciar no servidor, o container do portfólio pode ser iniciado automaticamente após uma reinicialização do sistema.

## Projetos

Alguns projetos apresentados no portfólio possuem seus próprios ambientes:

* **TodoList** — Java, Spring Boot, MySQL e Docker
* **Diário** — Java, Spring Boot, MySQL e Docker

## Objetivo

Este projeto foi desenvolvido como parte do meu processo de aprendizagem e evolução em desenvolvimento web, com foco principal em **Backend Java e Spring Boot**.

Além de apresentar os projetos, o portfólio também serve como aplicação prática de conceitos de:

* desenvolvimento frontend;
* organização de aplicações React;
* criação de builds de produção;
* Docker;
* Nginx;
* deploy em servidor Linux;
* configuração de domínio e HTTPS.

## Autor

**Lincoln Silva**

Foco: **Desenvolvimento Backend Java**

Tecnologias principais:

```text
Java · Spring Boot · REST APIs · JPA/Hibernate · MySQL · Docker · Git · Linux
```
