# 💰 Let Tip

> Uma aplicação moderna e responsiva para **divisão de gorjetas**, desenvolvida com **Vue 3**, **Vite** e **Tailwind CSS**.  
> O projeto demonstra boas práticas de arquitetura front-end, reatividade e consumo de APIs REST para conversão de moedas.

---

## 🧾 Avaliação Técnica Frontend

### 🎯 Desafio
Desenvolver uma **SPA (Single Page Application)** responsiva para o **cálculo e divisão de gorjetas**.

O objetivo é demonstrar domínio em:
- **Vue.js**  
- Boas práticas de **arquitetura front-end**  
- **Estilização responsiva**  
- Consumo de **APIs REST** para conversão de moedas  

---

## 🚀 Tecnologias Utilizadas

- **Vue 3** com Vite  
- **TypeScript**  
- **Pinia** ou **Composition API** para gerenciamento de estado  
- **Axios** para requisições HTTP  
- **Tailwind CSS**  
- **Shadcn Vue**  
- **Yarn PnP**  
- **API de conversão**: [AwesomeAPI Moedas](https://docs.awesomeapi.com.br/api-de-moedas)

---

## 🧭 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/let_tip.git

# Acesse o diretório
cd let_tip

# Instale as dependências
yarn install

# Execute o servidor de desenvolvimento
yarn dev
```

> O projeto será iniciado em **http://localhost:5173**

---

## 📱 Responsividade

O projeto é **totalmente responsivo**, adaptando-se automaticamente ao dispositivo do usuário:

| Dispositivo | Layout |
|--------------|---------|
| 💻 **Desktop** | Painel de entrada e resultados lado a lado |
| 📱 **Mobile** | Painéis alternados com botões `>` e `<` para navegação |

---

## ⚙️ Funcionalidades

### 🧮 Cálculo de Gorjeta
- Inserção do **valor da conta**, **porcentagem da gorjeta** e **número de pessoas**  
- Exibição automática dos resultados:  
  - Gorjeta calculada  
  - Total da conta  
  - Valor por pessoa  

### 🌍 Conversão de Moeda
- Seletor de moeda (USD / EUR)  
- Conversão dinâmica para **BRL (R$)** via API REST  
- Exibição automática do símbolo da moeda (`$`, `€`, `R$`)

### ⚡ Reatividade
- Cálculos e conversões ocorrem **em tempo real**, sem necessidade de clique  
- Atualização imediata dos valores ao alterar qualquer campo  

---

## 🧠 Regras de Negócio

| Campo | Valor Padrão | Intervalo |
|--------|---------------|-----------|
| Valor | `0` | — |
| Gorjeta (%) | `10` | `10 – 20` |
| Pessoas | `2` | `2 – 16` |

- Impede exibição de valores inválidos  
- Resultados são recalculados automaticamente  

---

## 🧩 User Stories

### Cenário: Cálculo Padrão
| Conta | Gorjeta (%) | Pessoas | Gorjeta Calculada | Total | Por Pessoa |
|--------|--------------|----------|-------------------|--------|-------------|
| 73.23 | 13 | 10 | 9.52 | 82.75 | 8.28 |
| 60.00 | 10 | 3 | 6.00 | 66.00 | 22.00 |
| 13.00 | 15 | 2 | 1.95 | 14.95 | 7.48 |
| 2.58 | 17 | 3 | 0.44 | 3.02 | 1.01 |

### Cenário: Conversão em Reais
- Conversão automática de EUR/USD → BRL  
- Exibição do valor convertido em “R$”  

### Cenário: Experiência Mobile
- Painéis alternados com botões `>` e `<`  
- Transição suave entre **entrada** e **resultado**

---

## 🪶 Badges

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646cff?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-Store-F7E07D?style=flat-square&logo=pinia&logoColor=black)
![Shadcn Vue](https://img.shields.io/badge/Shadcn-Vue-8B5CF6?style=flat-square&logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![BEM CSS](https://img.shields.io/badge/BEM-CSS-1E90FF?style=flat-square&logo=css3&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🧩 Estrutura Básica do Projeto

```
src/
├── assets/         # Imagens, ícones e estilos globais
├── components/     # Componentes reutilizáveis
├── composables/    # Lógicas reativas reutilizáveis
├── lib/            # Funções utilitárias
├── services/       # Funções para requisições
├── stores/         # Arquivos de configuração pinia
├── App.vue         # Componente raiz
└── main.ts         # Ponto de entrada da aplicação
```

---

## 📜 Licença

Distribuído sob a licença **MIT**.  
Consulte o arquivo `LICENSE` para mais detalhes.

---

Feito com 💚 por [Everton Oliveira](https://www.linkedin.com/in/evertonco/)
