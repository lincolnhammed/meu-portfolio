# React + Docker + Nginx + HTTPS

Tutorial do processo utilizado para colocar um projeto React em produção usando:

* React + Vite
* Docker
* Docker Compose
* Nginx
* Reverse Proxy
* Domínio próprio
* HTTPS com Certbot / Let's Encrypt

---

# 1. Rodar o projeto React localmente

Durante o desenvolvimento, o React pode ser executado diretamente pelo Vite:

```bash
npm run dev
```

Normalmente o Vite disponibiliza o projeto em:

```text
http://localhost:5173
```

Fluxo:

```text
Código React
    ↓
npm run dev
    ↓
localhost:5173
```

Essa forma é utilizada principalmente durante o desenvolvimento.

Para produção, vamos gerar os arquivos finais do React e servi-los através do Nginx.

---

# 2. Criar o Dockerfile do React

Na pasta do projeto:

```bash
cd ~/java-spring/portifolio/meu-portfolio
```

Criar o arquivo:

```bash
nano Dockerfile
```

Conteúdo:

```dockerfile
FROM nginx:alpine

COPY dist/ /usr/share/nginx/html/

EXPOSE 80
```

## O que esse Dockerfile faz?

A imagem utilizada é:

```dockerfile
FROM nginx:alpine
```

Ou seja, o container será baseado no Nginx.

Depois:

```dockerfile
COPY dist/ /usr/share/nginx/html/
```

Copia os arquivos prontos do React para a pasta que o Nginx utiliza para servir arquivos HTML.

E:

```dockerfile
EXPOSE 80
```

documenta que o Nginx dentro do container utiliza a porta 80.

---

# 3. Gerar a pasta dist/

Antes de construir a imagem Docker, precisamos confirmar se a pasta `dist/` existe.

Execute:

```bash
ls
```

Se a pasta `dist` não existir, execute:

```bash
npm run build
```

O Vite vai pegar o projeto React e gerar os arquivos prontos para produção.

Conceitualmente:

```text
src/
   ↓
npm run build
   ↓
dist/
├── index.html
└── assets/
```

A pasta `dist/` é a que será copiada para dentro do container.

---

# 4. Criar o Docker Compose

Ainda dentro da pasta:

```bash
cd ~/java-spring/portifolio/meu-portfolio
```

Criar:

```bash
nano docker-compose.yml
```

Conteúdo:

```yaml
services:
  frontend:
    build: .
    ports:
      - "8086:80"
```

## O que significa `8086:80`?

É uma associação entre:

```text
porta do computador : porta do container
```

Portanto:

```text
8086 → 80
```

A porta `8086` é utilizada no computador.

A porta `80` é utilizada pelo Nginx dentro do container.

Fluxo:

```text
localhost:8086
      ↓
Docker
      ↓
container :80
      ↓
Nginx
      ↓
React
```

---

# 5. Construir a imagem Docker

Na pasta do projeto:

```bash
cd ~/java-spring/portifolio/meu-portfolio
```

Executar:

```bash
sudo docker compose build
```

Esse comando constrói a imagem utilizando o `Dockerfile`.

---

# 6. Subir o container

Executar:

```bash
sudo docker compose up -d
```

Depois conferir:

```bash
sudo docker compose ps
```

Esperamos encontrar algo parecido com:

```text
frontend    ...    0.0.0.0:8086->80/tcp
```

Isso significa:

```text
Computador :8086
       ↓
Container :80
```

Agora podemos testar o React diretamente pelo Docker:

```text
http://localhost:8086
```

Se o portfólio aparecer, significa que:

```text
React
  ↓
dist/
  ↓
Docker
  ↓
Nginx
  ↓
localhost:8086
```

está funcionando.

---

# 7. Nginx como Reverse Proxy

Agora vamos colocar o Nginx do sistema na frente do Docker.

Primeiro vamos testar utilizando uma porta local.

A ideia será:

```text
localhost:8090
      ↓
Nginx do sistema
      ↓
localhost:8086
      ↓
Docker
      ↓
React
```

---

# 8. Criar uma configuração Nginx local

Criar:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Colocar:

```nginx
server {
    listen 8090;

    server_name localhost;

    location / {
        proxy_pass http://127.0.0.1:8086;
    }
}
```

## O que essa configuração significa?

```nginx
listen 8090;
```

O Nginx vai escutar a porta `8090`.

```nginx
server_name localhost;
```

Essa configuração será utilizada para requisições destinadas a `localhost`.

E:

```nginx
location / {
    proxy_pass http://127.0.0.1:8086;
}
```

significa:

> Tudo que chegar nesse Nginx será encaminhado para `127.0.0.1:8086`.

Portanto:

```text
localhost:8090
       ↓
Nginx
       ↓
127.0.0.1:8086
       ↓
Docker
       ↓
React
```

---

# 9. Ativar a configuração do Nginx

Criar o arquivo em:

```text
/etc/nginx/sites-available/portfolio
```

não significa que o Nginx já está utilizando essa configuração.

O Nginx normalmente trabalha com:

```text
sites-available/
       ↓
configurações disponíveis

sites-enabled/
       ↓
configurações ativas
```

Criar o link simbólico:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
```

Agora a configuração está ativa.

---

# 10. Testar a configuração do Nginx

Executar:

```bash
sudo nginx -t
```

Se aparecer:

```text
syntax is ok
test is successful
```

a configuração está correta.

---

# 11. Recarregar o Nginx

Depois do teste:

```bash
sudo systemctl reload nginx
```

Agora podemos testar:

```text
http://localhost:8090
```

Se o portfólio aparecer, temos:

```text
localhost:8090
       ↓
Nginx
       ↓
localhost:8086
       ↓
Docker
       ↓
React
```

---

# 12. Criar a configuração do domínio

Depois de confirmar que o Reverse Proxy funciona localmente, podemos substituir o teste local pelo domínio real.

Criar:

```bash
sudo nano /etc/nginx/sites-available/lincolnsilva.dev
```

Configuração inicial, sem HTTPS:

```nginx
server {
    listen 80;

    server_name lincolnsilva.dev;

    location / {
        proxy_pass http://127.0.0.1:8086;
    }
}
```

Agora o fluxo passa a ser:

```text
lincolnsilva.dev
       ↓
porta 80
       ↓
Nginx
       ↓
127.0.0.1:8086
       ↓
Docker
       ↓
React
```

---

# 13. Remover a configuração local de teste

A configuração:

```text
portfolio
```

foi apenas utilizada para aprender e testar o Reverse Proxy com:

```text
localhost:8090
```

Depois que o teste funcionar, ela pode ser removida.

Primeiro remover o link ativo:

```bash
sudo rm /etc/nginx/sites-enabled/portfolio
```

Depois remover o arquivo:

```bash
sudo rm /etc/nginx/sites-available/portfolio
```

---

# 14. Testar novamente o Nginx

Executar:

```bash
sudo nginx -t
```

Esperamos:

```text
syntax is ok
test is successful
```

Se aparecer um aviso como:

```text
conflicting server name "localhost" on 0.0.0.0:8090, ignored
```

significa que ainda existe outra configuração utilizando:

```text
listen 8090;
server_name localhost;
```

Nesse caso, essa configuração deve ser localizada e removida ou desativada.

Depois de remover a configuração conflitante:

```bash
sudo nginx -t
```

deve ficar sem esse aviso.

---

# 15. Recarregar o Nginx

Depois de confirmar que a configuração está correta:

```bash
sudo systemctl reload nginx
```

Agora testar:

```text
http://lincolnsilva.dev
```

O fluxo será:

```text
lincolnsilva.dev
       ↓
Nginx
       ↓
127.0.0.1:8086
       ↓
Docker
       ↓
Nginx do container
       ↓
React
```

---

# 16. HTTPS com Certbot

Agora que o domínio está funcionando através de HTTP, podemos configurar HTTPS.

Primeiro verificar se o Certbot está instalado:

```bash
certbot --version
```

Exemplo:

```text
certbot 1.21.0
```

---

# 17. Solicitar/configurar o certificado HTTPS

Executar:

```bash
sudo certbot --nginx -d lincolnsilva.dev
```

O parâmetro:

```text
--nginx
```

informa ao Certbot que estamos utilizando Nginx.

O Certbot pode perguntar algumas informações, como:

* e-mail;
* aceitação dos termos;
* redirecionamento HTTP para HTTPS.

Se aparecer uma opção semelhante a:

```text
Please choose whether or not to redirect HTTP traffic to HTTPS
```

escolher:

```text
Redirect
```

Assim:

```text
http://lincolnsilva.dev
        ↓
       301
        ↓
https://lincolnsilva.dev
```

---

# 18. O que o Certbot altera?

O Certbot pode editar automaticamente:

```text
/etc/nginx/sites-available/lincolnsilva.dev
```

e adicionar configurações como:

```nginx
listen 443 ssl;

ssl_certificate /etc/letsencrypt/live/lincolnsilva.dev/fullchain.pem;

ssl_certificate_key /etc/letsencrypt/live/lincolnsilva.dev/privkey.pem;
```

A configuração do Reverse Proxy continua apontando para:

```nginx
proxy_pass http://127.0.0.1:8086;
```

Portanto, o HTTPS não muda onde o React está rodando.

O fluxo passa a ser:

```text
https://lincolnsilva.dev
          ↓
        Nginx
          ↓
127.0.0.1:8086
          ↓
       Docker
          ↓
        React
```

---

# 19. Arquitetura final

Depois de todas essas etapas:

```text
                         INTERNET
                            │
                            ▼
                  lincolnsilva.dev
                            │
                  ┌─────────┴─────────┐
                  │                   │
               HTTP :80           HTTPS :443
                  │                   │
                  │             Certificado
                  │                   │
                  └─────────┬─────────┘
                            ▼
                     Nginx do sistema
                            │
                            ▼
                    127.0.0.1:8086
                            │
                            ▼
                       Docker
                            │
                            ▼
                    Nginx do container
                            │
                            ▼
                         dist/
                            │
                            ▼
                      React/Vite
```

## Resumo dos principais comandos

### Desenvolvimento

```bash
npm run dev
```

```text
localhost:5173
```

### Gerar produção

```bash
npm run build
```

```text
dist/
```

### Construir Docker

```bash
sudo docker compose build
```

### Subir Docker

```bash
sudo docker compose up -d
```

### Ver containers

```bash
sudo docker compose ps
```

### Testar Nginx

```bash
sudo nginx -t
```

### Recarregar Nginx

```bash
sudo systemctl reload nginx
```

### Verificar Certbot

```bash
certbot --version
```

### Configurar HTTPS

```bash
sudo certbot --nginx -d lincolnsilva.dev
```

---

# Conceitos aprendidos

```text
React
  ↓
npm run build
  ↓
dist/
  ↓
Docker
  ↓
Nginx dentro do container
  ↓
porta 8086
  ↓
Nginx do sistema
  ↓
Reverse Proxy
  ↓
Domínio
  ↓
HTTPS
```

A ideia principal do Reverse Proxy é:

```nginx
location / {
    proxy_pass http://127.0.0.1:8086;
}
```

Ou seja:

> O Nginx recebe a requisição do usuário e encaminha essa requisição para a aplicação que está rodando em outra porta.

No nosso caso:

```text
lincolnsilva.dev
       ↓
Nginx
       ↓
localhost:8086
       ↓
Docker
       ↓
React
```
