require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Cria uma instância do cliente com as configurações padrão
const client = new Client({});
// Chave da API do Google Maps
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Função para buscar lugares com base em uma query, tipo e localização central
async function getAllPlaces(query, type, latlong) {
    // Array para armazenar todos os lugares encontrados
    let allPlaces = [];
    // Token para a próxima página
    let nextPageToken = null;
    do {
        console.log("Buscando próxima página com token: ", nextPageToken);
        // Faz a solicitação de busca de lugares
        const response = await client.textSearch({
            params: {
                query: query, // Termo de busca
                key: apiKey, // Chave da API
                type: type, // Tipo de lugar a ser buscado
                pagetoken: nextPageToken, // Token para a próxima página (se houver)
                radius: 100000, // Raio de busca em metros
                location: latlong, // Localização central de São Paulo (latitude, longitude)
            },
        });

        if (response.data.status === "OK") {
            allPlaces = allPlaces.concat(response.data.results);
            nextPageToken = response.data.next_page_token; // Atualiza o token para a próxima página
        } else {
            console.error("Erro na busca:", response.data.status);
            break; // Sai do loop em caso de erro
        }

        // Aguarda um curto período para evitar exceder o limite de solicitações da API
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } while (nextPageToken); // Continua enquanto houver próxima página

    return allPlaces;
}

async function readDataFromFile(filePath, fileType) {
    let dataList = [];

    if (fileType === "csv") {
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    const lat = row.lat;
                    const long = row.lng;
                    dataList.push(`${lat}, ${long}`);
                })
                .on("end", () => {
                    resolve(dataList);
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    } else if (fileType === "json") {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
            data.forEach((item) => {
                const lat = item.lat;
                const long = item.lng;
                dataList.push(`${lat}, ${long}`);
            });
            return dataList;
        } catch (error) {
            throw new Error("Error reading JSON file: " + error.message);
        }
    } else {
        throw new Error("Unsupported file type");
    }
}

async function find(query, type, locList) {
    console.log("🚀 Iniciando busca 🚀");
    console.log("Buscando lugares com a query - tipo: ", query, "-", type);
    console.log(
        "----------------------------------------------------------------------------------------"
    );
    console.log("Verificando existencia de arquivo previo 📂 ...");

    const sanitizedQuery = query.replace(/ /g, "_");
    const filePath = "./target/" + sanitizedQuery + ".json";
    const dirPath = path.dirname(filePath);

    // Verifica se a pasta existe, se não, cria

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    let formatedPlaces = [];

    // Verifica se o arquivo existe, se sim, lê e adiciona os lugares encontrados
    if (fs.existsSync(filePath)) {
        // Lê o arquivo e converte para objeto
        console.log(
            "Arquivo encontrado, lendo e adicionando lugares existentes 📖"
        );
        const data = fs.readFileSync(filePath, "utf8");
        formatedPlaces = JSON.parse(data);
    } else {
        console.log("Arquivo não encontrado 🚫📄");
    }

    console.log(
        "----------------------------------------------------------------------------------------"
    );

    // Inicializa contadores
    let repetidos = 0;
    let lugaresRepetidos = 0;
    let novosLugares = 0;

    // Itera sobre a lista de localizações centrais
    for (const loc of locList) {
        try {
            // Cria um conjunto para rastrear endereços existentes
            const existingAddresses = new Set(
                formatedPlaces.map((place) => place.address)
            );

            //Calcula o index inicial
            let initialIndex = formatedPlaces.length;

            console.log(
                "Iniciando busca próxima localização central 📍: ",
                loc
            );
            const places = await getAllPlaces(query, type, loc);

            places.forEach((place, index) => {
                const name = place.name;
                const address = place.formatted_address;

                // Verifica se o endereço já existe
                if (!existingAddresses.has(address)) {
                    const localObj = {
                        index: initialIndex + index - repetidos,
                        name: name,
                        address: address,
                    };
                    formatedPlaces.push(localObj);
                    novosLugares++;
                } else {
                    repetidos++;
                    lugaresRepetidos++;
                }
            });

            repetidos = 0;

            console.log(
                "Sucesso na busca para a localização central 📍: ",
                loc
            );
            console.log(
                "----------------------------------------------------------------------------------------"
            );
        } catch (e) {
            console.error("Ocorreu um erro:", e);
        }
    }

    // Converte o objeto para JSON e escreve no arquivo
    try {
        console.log("Salvando arquivo 📝 ...");
        const json = JSON.stringify(formatedPlaces, null, 2);
        await fs.writeFile(filePath, json, "utf8", () => {
            console.log("Arquivo criado/atualizado com sucesso ✅");
        });
        console.log(
            "----------------------------------------------------------------------------------------"
        );
    } catch (e) {
        console.error("Erro ao salvar arquivo:", e);
    }

    // Exibe informações sobre a busca
    console.log("Busca finalizada 🏁");
    console.log("🆕 Novos lugares adicionados:", novosLugares);
    console.log("🔁 Lugares repetidos:", lugaresRepetidos);
    console.log(
        "🔎 Total de lugares encontrados:",
        novosLugares + lugaresRepetidos
    );

    console.log("📃 Total de lugares no arquivo:", formatedPlaces.length);
    console.log(
        "----------------------------------------------------------------------------------------"
    );
    console.log("Arquivo salvo em:", filePath);
    console.log(
        "----------------------------------------------------------------------------------------"
    );
}

module.exports = { find, readDataFromFile };
