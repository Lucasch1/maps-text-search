## Localizador de Estabelecimentos com Google Maps API

Este projeto utiliza a API do Google Maps para buscar e salvar informações detalhadas sobre estabelecimentos específicos em um arquivo JSON. Ele permite buscar por tipo e termo em múltiplas localizações, com a flexibilidade de usar um arquivo CSV ou JSON para definir as coordenadas de busca.

### Estrutura do Projeto

```
├── README.md
├── index.js
├── utils
│   └── util.js
├── package.json
├── .gitignore
├── assets
│   └── <seus-arquivos.csv ou .json>
└── target
    └── <nome-da-busca>.json (ignorada pelo .gitignore)
```

-   **README.md:** Este arquivo, com instruções e informações sobre o projeto.
-   **index.js:** O ponto de entrada da aplicação, que interage com o usuário para definir as opções de busca e chama a função principal.
-   **utils/util.js:** Contém as funções principais:
    -   `find`: Realiza a busca na API, processa os resultados e salva em um arquivo JSON.
    -   `readDataFromFile`: Lê as coordenadas de um arquivo CSV ou JSON.
-   **package.json:** Contém as dependências do projeto e scripts auxiliares.
-   **.gitignore:** Define os arquivos e pastas que devem ser ignorados pelo Git (incluindo a pasta `target`).
-   **assets:** Pasta para armazenar seus arquivos CSV ou JSON com as coordenadas de busca.
-   **target/<nome-da-busca>.json:** Arquivo JSON que armazena os resultados da busca (gerado automaticamente e ignorado pelo Git).

### Funcionalidades

-   **Busca por tipo e termo:** Permite buscar estabelecimentos por tipo (ex: supermercado) e um termo de busca (ex: "Serrano").
-   **Múltiplas localizações:** Realiza buscas em várias localizações geográficas, especificadas por:
    -   Uma lista de coordenadas no código.
    -   Um arquivo CSV ou JSON na pasta `assets`.
-   **Paginação de resultados:** Obtém todos os resultados da API, lidando com a paginação.
-   **Tratamento de erros:** Lida com erros na busca e exibe mensagens informativas.
-   **Armazenamento em JSON:** Salva os resultados em um arquivo JSON formatado, incluindo nome, endereço e um índice.
-   **Atualização de arquivo:** Verifica se o arquivo já existe e adiciona apenas novos resultados, evitando duplicatas.
-   **Exibição de estatísticas:** Mostra o total de lugares encontrados, repetidos e novos.
-   **Interação com o usuário:** Pergunta se o usuário deseja usar um arquivo de coordenadas e lê o arquivo se a resposta for positiva.

### Configuração

1. **Crie um arquivo `.env`** na raiz do projeto e adicione sua chave da API do Google Maps:

```
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

2. **Instale as dependências (se ainda não instaladas):**

```bash
npm install
```

3. **Prepare seus arquivos de coordenadas:**
    - Crie arquivos CSV (com colunas `lat` e `lng`) ou JSON (com objetos contendo `lat` e `lng`) na pasta `assets`.

### Como Usar

1. **Edite o `index.js`:** Modifique as variáveis `query` e `type` para definir seus critérios de busca.
2. **Execute o script:**

```bash
npm start
```

3. **Responda à pergunta:** O script perguntará se você deseja usar um arquivo de coordenadas. Responda "s" para usar um arquivo da pasta `assets` ou "n" para usar a lista de coordenadas definida no código.

### Observações

-   Certifique-se de ter uma chave válida da API do Google Maps.
-   A API do Google Maps possui limites de uso, então use com moderação.
-   O script espera um intervalo de 2 segundos entre as solicitações para evitar exceder os limites da API.
-   A pasta `target` e seus arquivos são ignorados pelo Git, então você não precisa se preocupar em adicioná-los ao controle de versão.

**Importante:** Este README fornece uma visão geral do projeto. Explore o código para entender os detalhes da implementação.
