# Mão na Massa - Capacitação Profissional

Plataforma mobile para capacitação profissional que oferece cursos práticos em diversas áreas como Elétrica, Hidráulica, Pintura e muito mais.

## Integrantes do Grupo

- RM 560812 - Gabriel Dos Santos Souza
- RM 560649 - Thomas Henrique Baute
- RM 559999 - Bruno Mateus Tizer das Chagas

## Como rodar?

1. Instalar dependências:

```bash
npm install
```

2. Rodar a API Java:

```bash
cd ../mao-na-massa
mvn spring-boot:run
```

3. Iniciar o projeto mobile:

```bash
npx expo start
```

4. Rodar no dispositivo:

- Escanear QR Code com Expo Go (Android/iOS)
- Ou pressionar `a` para Android emulator
- Ou pressionar `i` para iOS simulator
- Ou pressionar `w` para web

## Funcionalidades

### 1. Telas e Navegação (10 pontos)

- 7 telas funcionais (mais que as 5 exigidas)
- Expo Router com navegação por tabs
- 2 tabs principais: Cursos e Áreas
- Tela inicial com logo e botão de entrada
- Navegação para formulários e detalhes

### 2. CRUD com API (40 pontos)

**CRUD completo de Cursos:**
- Create: Formulário para criar curso
- Read: Listagem de cursos e detalhes
- Update: Editar curso existente
- Delete: Excluir curso com modal de confirmação

**CRUD completo de Áreas:**
- Create: Formulário para criar área
- Read: Listagem de áreas
- Update: Editar área existente
- Delete: Excluir área (com validação de integridade)

**Recursos adicionais:**
- Filtro de cursos por área
- Modais customizados para confirmação e alertas
- Tratamento de erros com mensagens claras
- Validação de integridade (não permite deletar área com cursos vinculados)

### 3. Estilização (10 pontos)

- Logo personalizado na tela inicial
- Paleta de cores consistente (laranja, cinza, vermelho)
- Componentes reutilizáveis (Card, ConfirmModal, AlertModal, Loading)
- Loading states em todas as telas
- Design responsivo e funcional

### 4. Arquitetura (20 pontos)

- Código organizado em pastas lógicas
- Separação de responsabilidades clara
- Nomes simples e descritivos
- Componentes reutilizáveis
- TypeScript para tipagem forte

## Estrutura do Projeto

```
src/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Layout das abas
│   │   ├── cursos.tsx           # Lista de cursos
│   │   └── areas.tsx            # Lista de áreas (com CRUD)
│   ├── _layout.tsx              # Layout raiz
│   ├── index.tsx                # Tela inicial com logo
│   ├── curso-detalhes.tsx       # Detalhes do curso (com delete)
│   ├── curso-form.tsx           # Formulário de curso (create/update)
│   ├── area-form.tsx            # Formulário de área (create/update)
│   └── cursos-por-area.tsx      # Cursos filtrados por área
├── api/
│   ├── apiClient.ts             # Configuração Axios
│   ├── areas.ts                 # Endpoints de áreas
│   └── cursos.ts                # Endpoints de cursos
├── types/
│   ├── areas.ts                 # Tipos de áreas
│   └── cursos.ts                # Tipos de cursos

components/
├── Card.tsx                     # Card reutilizável
├── ConfirmModal.tsx             # Modal de confirmação
├── AlertModal.tsx               # Modal de alerta
└── Loading.tsx                  # Componente de loading

constants/
└── Colors.ts                    # Paleta de cores

assets/
└── logo.png                     # Logo do app
```

## Tecnologias Utilizadas

- React Native (para fazer app mobile)
- Expo (para rodar o app)
- Expo Router (para navegação entre telas)
- Axios (para conectar na API)
- TypeScript (para tipagem)
- React Hooks (useState, useEffect)

## API

O app conecta em uma API REST Java/Spring Boot que roda em `http://localhost:8080/api/v1`

Antes de rodar o app, é preciso:
1. Ter a API rodando (Spring Boot)
2. A API deve estar em `http://localhost:8080`

O app faz requisições para:

**Cursos:**
- `GET /cursos` - Listar todos os cursos
- `GET /cursos/{id}` - Buscar curso por ID
- `POST /cursos` - Criar novo curso
- `PUT /cursos/{id}` - Atualizar curso
- `DELETE /cursos/{id}` - Deletar curso
- `GET /cursos?areaId={id}` - Filtrar cursos por área

**Áreas:**
- `GET /areas` - Listar todas as áreas
- `GET /areas/{id}` - Buscar área por ID
- `POST /areas` - Criar nova área
- `PUT /areas/{id}` - Atualizar área
- `DELETE /areas/{id}` - Deletar área (valida se tem cursos vinculados)

## Vídeo de Demonstração

[Link do vídeo no YouTube - será adicionado]

## Diferenciais Implementados

- ✅ Modais customizados (funciona na web e mobile)
- ✅ Loading states em todas as telas
- ✅ Logo personalizado
- ✅ Validação de integridade no backend
- ✅ Mensagens de erro claras e contextuais
- ✅ Filtro de cursos por área
- ✅ 7 telas (mais que as 5 exigidas)
