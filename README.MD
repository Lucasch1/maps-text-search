## Localizador de Estabelecimentos com Google Maps API 🗺

Este projeto utiliza a API do Google Maps para buscar e salvar informações detalhadas sobre estabelecimentos específicos em um arquivo JSON.

### Estrutura do Projeto

```
├── README.md
├── index.js
├── utils
│   └── util.js
├── package.json
├── .gitignore
└── target
    └── <nome-da-busca>.json (ignorada pelo .gitignore)
```

-   **README.md:** Este arquivo, com instruções e informações sobre o projeto.
-   **index.js:** O ponto de entrada da aplicação, que chama a função de busca e define os parâmetros iniciais.
-   **utils/util.js:** Contém a função principal (`find`) que realiza a busca na API, processa os resultados e salva em um arquivo JSON.
-   **package.json:** Contém as dependências do projeto e scripts auxiliares.
-   **.gitignore:** Define os arquivos e pastas que devem ser ignorados pelo Git (incluindo a pasta `target`).
-   **target/<nome-da-busca>.json:** Arquivo JSON que armazena os resultados da busca (gerado automaticamente e ignorado pelo Git).

### Funcionalidades

-   **Busca por tipo e termo:** Permite buscar estabelecimentos por tipo (ex: supermercado) e um termo de busca (ex: "local exemplo").
-   **Múltiplas localizações:** Realiza buscas em várias localizações geográficas, especificadas por latitude e longitude.
-   **Paginação de resultados:** Obtém todos os resultados da API, lidando com a paginação.
-   **Tratamento de erros:** Lida com erros na busca e exibe mensagens informativas.
-   **Armazenamento em JSON:** Salva os resultados em um arquivo JSON formatado, incluindo nome, endereço e um índice.
-   **Atualização de arquivo:** Verifica se o arquivo já existe e adiciona apenas novos resultados, evitando duplicatas.
-   **Exibição de estatísticas:** Mostra o total de lugares encontrados, repetidos e novos.

### Configuração

1. **Crie um arquivo `.env`** na raiz do projeto e adicione sua chave da API do Google Maps:

```
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

2. **Instale as dependências (se ainda não instaladas):**

```bash
npm install
```

### Como Usar

1. **Edite o `index.js`:** Modifique as variáveis `query`, `type` e `locList` para definir seus critérios de busca (por exemplo, use `"local exemplo"` para `query`).
2. **Execute o script:**

```bash
npm start
```

3. **Verifique os resultados:** O script irá criar/atualizar o arquivo JSON na pasta `target`.

### Observações

-   Certifique-se de ter uma chave válida da API do Google Maps.
-   A API do Google Maps possui limites de uso, então use com moderação.
-   O script espera um intervalo de 2 segundos entre as solicitações para evitar exceder os limites da API.
-   A pasta `target` e seus arquivos são ignorados pelo Git, então você não precisa se preocupar em adicioná-los ao controle de versão.

**Importante:** Este README fornece uma visão geral do projeto. Explore o código para entender os detalhes da implementação.
