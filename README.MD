## Localizador de locais pelo Google maps 🗺

Este script Node.js usa a API do Google Maps Places para encontrar supermercados 3B na Cidade do México (ou qualquer local que você especificar).

### Pré-requisitos

1. **Node.js e NPM:** Certifique-se de ter o Node.js e o NPM (gerenciador de pacotes do Node) instalados. Você pode baixá-los em [https://nodejs.org/](https://nodejs.org/).

2. **Chave de API do Google Maps:** Obtenha uma chave de API do Google Maps Places em [https://developers.google.com/maps/documentation/places/web-service/get-api-key](https://developers.google.com/maps/documentation/places/web-service/get-api-key)

3. **Pacote `dotenv`:** Instale o pacote `dotenv` para gerenciar variáveis de ambiente:

    ```bash
    npm install dotenv
    ```

4. **Pacote `@googlemaps/google-maps-services-js`:** Instale o pacote da biblioteca do Google Maps:
    ```bash
    npm install @googlemaps/google-maps-services-js
    ```

### Configuração

1. **Crie um arquivo `.env`:**

    ```
    GOOGLE_MAPS_API_KEY=SUA_CHAVE_DE_API
    ```

2. **Substitua `SUA_CHAVE_DE_API`** pela sua chave de API do Google Maps.

### Uso

1. **Execute o script:**

    ```bash
    node script.js
    ```

    (Certifique-se de que o script se chama "script.js" ou altere o comando de acordo)

2. **Resultados:** O script imprimirá no console um array com os detalhes dos supermercados 3B encontrados dentro do raio especificado a partir da localização fornecida.

### Personalização

-   **Nome:** Modifique `"Serrano"` (linha 10) para outro nome, se desejar buscar outros estabelecimentos.
-   **Localização:** Altere as coordenadas `"19.435332, -99.130427"` (linha 11) para a latitude e longitude da sua área de interesse.
-   **Raio:** Ajuste o valor de `1000000` (linha 12) para aumentar ou diminuir o raio de busca em metros.
-   **Tipo:** Substitua `"supermarket"` (linha 14) por outro tipo de lugar, como `"grocery_or_supermarket"`, `"store"`, `"food"`, etc. (consulte a documentação da API para obter uma lista completa de tipos).

### Observações

-   **Limites da API:** Esteja ciente dos limites de uso da API do Google Maps Places para evitar cobranças inesperadas.
-   **Manipulação de Erros:** O script inclui tratamento básico de erros para verificar se a solicitação à API foi bem-sucedida.
-   **Processamento dos Resultados:** No momento, o script apenas imprime os resultados no console. Adapte o código dentro do bloco `if (response.data.status === "OK")` (linha 17) para realizar outras ações com os dados dos supermercados (exibir em um mapa, salvar em um banco de dados, etc.).

---

**Dica:** Para visualizar os resultados em um mapa, você pode usar a API do Google Maps JavaScript em conjunto com este script.

Let me know if you'd like help adapting the script for any of these customizations.
