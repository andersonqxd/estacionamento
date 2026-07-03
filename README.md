# Sistema de Estacionamento

Projeto full stack para estudo de **Django + React**, com foco principal no backend e uma interface web para cadastro e visualização de veículos em um estacionamento fictício.

## Objetivo

Este projeto foi criado para praticar a construção de uma aplicação web com:

- Backend em Django
- API para gerenciamento de veículos
- Frontend em React
- Dashboard com indicadores do estacionamento
- Carga de dados iniciais com fixtures

## Funcionalidades

- Cadastro de veículos
- Listagem de veículos
- Edição de veículos
- Remoção de veículos
- Controle de status do veículo no estacionamento
- Dashboard com métricas básicas
- Carga de dados iniciais com `loaddata`

## Tecnologias

### Backend

- Python
- Django
- Django REST Framework
- SQLite

### Frontend

- React
- JavaScript
- CSS

## Estrutura do projeto

```bash
estacionamento/
├─ back/
│  ├─ manage.py
│  ├─ veiculos/
│  └─ ...
└─ front/
   └─ ...
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/andersonqxd/estacionamento
cd estacionamento
```

### 2. Configurar o backend

```bash
cd back
python -m venv .venv
```

Ative o ambiente virtual:

#### Windows PowerShell

```bash
.venv\Scripts\Activate.ps1
```

#### Linux/macOS

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Aplique as migrações:

```bash
python manage.py migrate
```

Carregue os dados iniciais:

```bash
python manage.py loaddata veiculos_iniciais
```

Inicie o servidor Django:

```bash
python manage.py runserver
```

### 3. Configurar o frontend

Em outro terminal:

```bash
cd front
npm install
npm run dev
```

## Fixtures

O projeto utiliza fixtures para popular o banco com dados iniciais de veículos.

Exemplo de comando:

```bash
python manage.py loaddata veiculos_iniciais
```

## API e integração

A aplicação expõe endpoints para o CRUD de veículos e para o dashboard. O frontend consome esses dados para montar a listagem e os indicadores em tela.

## Aprendizados do projeto

Durante a construção deste sistema, os principais pontos de estudo são:

- Estrutura de apps no Django
- Models, migrations e fixtures
- Criação de APIs
- Integração entre React e Django
- Organização de CRUD no frontend
- Evolução incremental com Git

## Versionamento

O projeto utiliza Git para controle de versão. A recomendação é manter commits pequenos e descritivos, por exemplo:

- `feat: adiciona dashboard de veículos`
- `fix: corrige fixture inicial`
- `refactor: organiza serializers de veiculos`

## Próximas melhorias

- Melhorar o layout do CRUD
- Adicionar gráficos no dashboard
- Refinar validações no backend
- Separar componentes no React
- Melhorar experiência de edição e exclusão

## Observações

Este projeto tem finalidade de estudo e evolução prática em desenvolvimento full stack, com ênfase em Django no backend.