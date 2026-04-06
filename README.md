# Grupo Fera API

<div align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flat&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Prisma-323330?style=flat&logo=Prisma">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MongoDB-323330?style=flat&logo=mongodb">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Vitest-323330?style=flat&logo=vitest">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Mercado%20Pago-323330?style=flat&logo=mercadopago">
  <img width="auto" height="23em" src="https://img.shields.io/badge/AWS%20S3-323330?style=flat&logo=amazonaws">
</div>

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-Requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Database Schema](#-database-schema)
- [Módulos da API](#-módulos-da-api)
- [Autenticação e Segurança](#-autenticação-e-segurança)
- [Integrações Externas](#-integrações-externas)
- [Documentação](#-documentação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy com Docker](#-deploy-com-docker)
- [Contribuição](#-contribuição)

## 🎯 Visão Geral

A **Grupo Fera API** é uma plataforma backend robusta desenvolvida em Node.js com TypeScript, projetada para gerenciar conteúdo educacional, vídeos, cursos, campanhas de marketing, usuários e pagamentos. A API oferece uma infraestrutura completa para aplicações web e mobile, com foco em segurança, escalabilidade e boas práticas de desenvolvimento.

### Principais Funcionalidades

- **Gestão de Usuários**: Sistema completo com roles (admin/user), autenticação JWT e validação por email
- **Plataforma de Vídeos**: Upload, categorização, comentários e métricas de engajamento
- **Sistema de Cursos**: Cursos com módulos, documentos, avaliações e progresso
- **Campanhas de Marketing**: Gestão de campanhas com tracking de visualizações e cliques
- **Sistema de Pagamentos**: Integração com Mercado Pago para assinaturas e pagamentos únicos
- **Gestão de Cupons**: Sistema de cupons de desconto com validade e controle de uso
- **Notificações Push**: Web push notifications para engajamento de usuários
- **Storage Flexível**: Suporte para armazenamento local ou AWS S3
- **API Documentada**: Swagger/OpenAPI para documentação interativa

## 🛠 Tecnologias Utilizadas

### Backend Core
- **Node.js** (v20.10.0) - Runtime JavaScript
- **TypeScript** (v5.3.2) - Superset tipado do JavaScript
- **Express.js** (v4.18.2) - Framework web minimalista
- **Prisma** (v6.15.0) - ORM moderno para MongoDB

### Database & Storage
- **MongoDB** - Banco de dados NoSQL
- **AWS S3** - Storage de arquivos na nuvem
- **Multer** - Middleware para upload de arquivos

### Autenticação & Segurança
- **JWT** (jsonwebtoken) - Tokens de autenticação
- **Passport** - Middleware de autenticação
- **bcryptjs** - Hash de senhas
- **Helmet** - Segurança de headers HTTP

### Pagamentos & Integrações
- **Mercado Pago** (v2.0.15) - Processamento de pagamentos
- **Mailgun** (v12.0.1) - Serviço de email
- **Nodemailer** - Envio de emails
- **Web Push** (v3.6.7) - Notificações push

### Documentação & Testes
- **Swagger UI** - Documentação interativa
- **Vitest** (v0.34.6) - Framework de testes
- **ESLint** - Linting de código

### Utilitários
- **Zod** (v3.22.4) - Validação de schemas
- **Day.js** - Manipulação de datas
- **Compression** - Compressão de respostas
- **CORS** - Compartilhamento de recursos entre origens

## 📁 Estrutura do Projeto

```
grupoFeraApi/
├── src/
│   ├── @types/                 # Tipos TypeScript customizados
│   ├── app.ts                  # Configuração principal da aplicação Express
│   ├── server.ts               # Ponto de entrada do servidor
│   ├── config/                 # Arquivos de configuração
│   │   ├── nodemailer.ts       # Configuração de email
│   │   ├── passport.ts         # Estratégias de autenticação
│   │   ├── ssl.ts              # Configuração SSL
│   │   ├── storage.ts          # Configuração de upload de arquivos
│   │   ├── swagger.ts          # Configuração da documentação
│   │   └── zod-error.ts        # Configuração de erros Zod
│   ├── database/               # Configuração do banco de dados
│   ├── errors/                 # Classes de erro customizadas
│   ├── libs/                   # Bibliotecas compartilhadas
│   ├── modules/                # Módulos de negócio
│   │   ├── admin/              # Gestão de administradores
│   │   ├── admin-permission/   # Permissões de admin
│   │   ├── auth/               # Autenticação e autorização
│   │   ├── brand/              # Gestão de marcas
│   │   ├── contact/            # Contato e suporte
│   │   ├── coupon/             # Sistema de cupons
│   │   ├── dealership/         # Gestão de concessionárias
│   │   ├── faq/                # FAQ e suporte
│   │   ├── mail/               # Serviços de email
│   │   ├── offers/             # Ofertas e promoções
│   │   ├── payment/            # Processamento de pagamentos
│   │   ├── text/               # Gestão de textos institucionais
│   │   ├── upload-file/        # Upload de arquivos
│   │   └── videos/             # Plataforma de vídeos e cursos
│   ├── shared/                 # Componentes compartilhados
│   │   ├── middlewares/        # Middlewares Express
│   │   └── routes/             # Rotas compartilhadas
│   └── utils/                  # Utilitários e helpers
│       ├── abstracts/          # Classes abstratas
│       ├── decorators/         # Decorators TypeScript
│       ├── dtos/               # Data Transfer Objects
│       ├── helpers/            # Funções auxiliares
│       ├── interfaces/         # Interfaces TypeScript
│       └── types/              # Tipos customizados
├── prisma/                     # Configuração do Prisma
│   ├── schema.prisma           # Schema do banco de dados
│   └── seeds/                  # Seeds para dados iniciais
├── docs/                       # Documentação Swagger
│   ├── components/             # Schemas reutilizáveis
│   └── controllers/            # Documentação de endpoints
├── resources/                  # Recursos estáticos
├── scripts/                    # Scripts de automação
├── tests/                      # Testes automatizados
└── dist/                       # Build da aplicação
```

## ✅ Pré-Requisitos

- **Node.js** (v20.10.0 ou superior)
- **npm** (v10.2.3 ou superior)
- **MongoDB** (v6.0 ou superior)
- **Git** para controle de versão

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone <repository-url>
cd grupoFeraApi
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
cp .env.example .env
# Editar o arquivo .env com suas configurações
```

### 4. Configurar Banco de Dados
```bash
# Rodar migrations (se aplicável)
npm run prisma:migration

# Popular banco com dados iniciais
npm run prisma:seed
```

### 5. Build e Execução
```bash
# Build para produção
npm run build

# Executar em desenvolvimento
npm run start:dev

# Executar em produção
npm start
```

## ⚙️ Variáveis de Ambiente

### Configurações do Servidor
```env
# Server Configuration
URL=http://localhost
PORT=3009
APP_URL=${URL}:${PORT}
NODE_ENV=development  # development | production
```

### Database
```env
# MongoDB Configuration
DB_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

### Autenticação
```env
# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=10000  # Tempo em segundos
```

### Email (SMTP)
```env
# Email Service Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_TO=noreply@example.com
SMTP_FROM=noreply@example.com
SMTP_USERNAME=noreply@example.com
SMTP_PASSWORD=your-email-password
```

### Storage de Arquivos
```env
# Storage Configuration
STORAGE_TYPE=local  # local | s3
STORAGE_LOCAL=tmp/uploads

# AWS S3 (se STORAGE_TYPE=s3)
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### SSL (Produção)
```env
# SSL Certificate
SSL_KEY=/etc/letsencrypt/live/domain/privkey.pem
SSL_CERT=/etc/letsencrypt/live/domain/fullchain.pem
SSL_CA=/etc/letsencrypt/live/domain/chain.pem
```

## 🗄️ Database Schema

O projeto utiliza **MongoDB** com **Prisma ORM**. O schema principal inclui:

### Modelos Principais

#### Usuários e Autenticação
- **User**: Usuários do sistema com perfil completo
- **Admin**: Administradores com permissões especiais
- **Security**: Códigos de verificação e recuperação de senha
- **Permission**: Sistema de permissões granular

#### Conteúdo Educacional
- **Videos**: Vídeos com métricas de engajamento
- **Courses**: Cursos estruturados com módulos
- **Module**: Módulos dos cursos com vídeos e documentos
- **Document**: Documentos anexados aos módulos
- **Review**: Avaliações dos cursos

#### Marketing e Campanhas
- **Campaigns**: Campanhas de marketing
- **CategoryHomeContent**: Conteúdo dinâmico da home
- **ViewCompaign/ClickCompaign**: Métricas de engajamento

#### Sistema de Pagamentos
- **Coupon**: Cupons de desconto
- **CouponUsage**: Registro de utilização de cupons

#### Outros Modelos
- **Faq**: Perguntas frequentes
- **Text**: Textos institucionais (sobre, privacidade, termos)
- **Subscription**: Web push notifications
- **NotificationLog**: Logs de notificações enviadas
- **Dealership**: Concessionárias parceiras
- **Brand**: Marcas cadastradas

### Enums Principais
- **AccountRole**: admin | user
- **AccountStatus**: ativo | inativo | pendente
- **Permissions**: configuracoes | faqs | textos
- **TextType**: about | privacy | terms

## 📚 Módulos da API

### 1. Autenticação (`/auth`)
- **Login de Usuários**: Autenticação com JWT
- **Login de Admin**: Acesso restrito ao painel administrativo
- **Recuperação de Senha**: Fluxo completo com código de verificação
- **Validação de Conta**: Ativação via email

### 2. Gestão de Usuários (`/admins`, `/users`)
- **CRUD Completo**: Criação, leitura, atualização e exclusão
- **Gerenciamento de Status**: Ativo, inativo, pendente
- **Atualização de Perfil**: Informações pessoais e imagem

### 3. Plataforma de Vídeos (`/videos`)
- **Upload de Vídeos**: Com metadados e thumbnails
- **Sistema de Comentários**: Comentários aninhados com respostas
- **Métricas de Engajamento**: Views, likes, dislikes
- **Categorização**: Organização por categorias
- **Busca e Paginação**: Recursos avançados de busca

### 4. Sistema de Cursos (`/courses`)
- **Estrutura Modular**: Cursos com múltiplos módulos
- **Gestão de Documentos**: PDFs e materiais de apoio
- **Sistema de Avaliação**: Notas e feedback dos alunos
- **Progresso do Aluno**: Acompanhamento de conclusão

### 5. Pagamentos (`/process_payment`)
- **Integração Mercado Pago**: Pagamentos e assinaturas
- **Gestão de Preferências**: Criação de checkout personalizado
- **Webhooks**: Notificações de status de pagamento
- **Atualização de Status**: Sincronização com banco de dados

### 6. Sistema de Cupons (`/coupons`)
- **Criação de Cupons**: Com percentuais de desconto
- **Validação por Data**: Controle de validade
- **Rastreamento de Uso**: Histórico de utilização
- **Integração com Pagamentos**: Aplicação automática

### 7. Conteúdo Dinâmico (`/texts`, `/faqs`)
- **Textos Institucionais**: Sobre, privacidade, termos
- **FAQ Dinâmico**: Perguntas e respostas gerenciáveis
- **Atualização em Tempo Real**: Sem necessidade de deploy

### 8. Upload de Arquivos (`/upload-file`)
- **Suporte Múltiplo**: Local ou AWS S3
- **Validação de Tipos**: Apenas imagens (JPEG, PNG)
- **Limite de Tamanho**: 2MB por arquivo
- **Hash Único**: Nomes de arquivo seguros

### 9. Campanhas de Marketing (`/offers`, `/category-home`)
- **Gestão de Campanhas**: Criação e edição
- **Métricas Detalhadas**: Views, cliques, conversões
- **Segmentação**: Por estado e perfil de usuário
- **A/B Testing**: Múltiplas variações

### 10. Notificações (`/subscription`)
- **Web Push Notifications**: Notificações browser
- **Gestão de Inscrições**: Subscribe/Unsubscribe
- **Envio Segmentado**: Por perfil de usuário

## 🔐 Autenticação e Segurança

### JWT (JSON Web Tokens)
- **Geração de Tokens**: Com payload personalizado
- **Tempo de Expiração**: Configurável via environment
- **Refresh Token**: Para sessões prolongadas

### Middleware de Segurança
- **Helmet**: Proteção contra vulnerabilidades conhecidas
- **CORS**: Configuração de origens permitidas
- **Rate Limiting**: Prevenção contra abuse
- **Input Validation**: Com Zod schemas

### Criptografia
- **bcryptjs**: Hash de senhas com salt
- **Variáveis Sensíveis**: Protegidas via environment
- **HTTPS**: Suporte SSL em produção

## 🔌 Integrações Externas

### Mercado Pago
- **Pagamentos Únicos**: Processamento imediato
- **Assinaturas Recorrentes**: Planos mensais/anuais
- **Webhooks**: Notificações de status em tempo real
- **Checkout Personalizado**: Branding adaptado

### AWS S3
- **Storage de Imagens**: Upload direto para nuvem
- **CDN Integration**: Distribuição global
- **Controle de Acesso**: Políticas de segurança
- **Backup Automático**: Redundância de dados

### Email Services
- **Mailgun**: Envio transacional de emails
- **Nodemailer Templates**: Emails HTML dinâmicos
- **Recuperação de Senha**: Fluxo automatizado
- **Notificações**: Emails de sistema

### APIs de Terceiros
- **Alloyal Smartlink**: Integração com sistema de cupons
- **Web Push**: Notificações push do browser
- **Google Cloud Storage**: Storage alternativo

## 📖 Documentação

### Swagger/OpenAPI
A API possui documentação interativa completa acessível em:
```
http://localhost:3009/swagger
```

### Estrutura da Documentação
- **Endpoints**: Todos os endpoints documentados
- **Schemas**: Modelos de request/response
- **Autenticação**: Exemplos de uso de tokens
- **Testes**: Interface para testar endpoints

### Documentação de Código
- **TypeScript**: Tipagem forte para melhor DX
- **JSDoc**: Comentários descritivos em funções
- **READMEs**: Documentação por módulo
- **Arquitetura**: Decisões de design documentadas

## 🎬 Scripts Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia servidor com watch
npm run start:dev  # Modo desenvolvimento
npm run build      # Build para produção
npm run start:alt  # Executa build da dist/
```

### Banco de Dados
```bash
npm run prisma:migration  # Aplica migrations
npm run prisma:seed       # Popula dados iniciais
npm run prisma:reset      # Reset completo do banco
```

### Qualidade de Código
```bash
npm run eslint      # Linting e auto-fix
npm test           # Executa testes automatizados
```

## 🐳 Deploy com Docker

### Docker Compose
O projeto inclui configuração Docker para deploy simplificado:

```bash
# Configurar variáveis de ambiente
# Importante: DB_HOST deve ser 'app_mysql' para Docker

# Subir todos os serviços
docker compose up

# Executar seeds dentro do container
docker exec -it [nome_do_container] bash
npm run prisma:seed
```

### Serviços Incluídos
- **API**: Aplicação Node.js
- **MongoDB**: Banco de dados
- **Nginx**: Reverse proxy (opcional)

## 🤝 Contribuição

### Fluxo de Trabalho
1. **Fork** do repositório
2. **Branch** feature/nome-da-feature
3. **Commit** com mensagens descritivas
4. **Push** para o branch
5. **Pull Request** para revisão

### Padrões de Código
- **TypeScript**: Estrito e tipado
- **ESLint**: Seguir regras configuradas
- **Convenções**: Nomenclatura consistente
- **Testes**: Cobertura mínima exigida

### Boas Práticas
- **Commits Semânticos**: Conventional Commits
- **Code Review**: Revisão obrigatória
- **Documentação**: Atualizar docs com mudanças
- **Testes**: Escrever testes para novas features

---

## 📞 Suporte

Para dúvidas, sugestões ou report de issues:
- **Email**: adriancosta1215@gmail.com
- **Issues**: GitHub Issues do repositório
- **Documentação**: `/swagger` para referência da API

---

**Desenvolvido por Adrian Costa**
