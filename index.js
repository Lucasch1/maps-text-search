require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

async function getPlaces() {
    const response = await client.textSearch({
        params: {
            query: "Supermercado", // Substitua pelo nome desejado
            location: "19.435332, -99.130427", // Mexico City (latitude, longitude)
            radius: 1000000, // Raio de busca em metros
            key: apiKey, // Substitua pela sua chave de API
            type: "supermarket", // Tipo de lugar a ser buscado
        },
    });

    if (response.data.status === "OK") {
        const places = response.data.results;
        // Faça o que quiser com os resultados (places)
        console.log(places);
        return places;
    } else {
        console.error("Erro na busca:", response.data.status);
    }
}

getPlaces();
