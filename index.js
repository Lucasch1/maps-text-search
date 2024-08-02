//importa a função find
const find = require("./utils/util.js");

// Executa a função find
const query = "Tiendas 3B";
const type = "supermarket";
const locList = ["19.4326, 99.1332", "21.486625, -101.299121"];
find(query, type, locList);
