//importa a função find
const { find, readDataFromFile } = require("./utils/util.js");

// Executa a função find
// ["19.4326, 99.1332", "21.486625, -101.299121"]
const query = "Tiendas 3B";
const type = "supermarket";
const locList = [
    "27.41079,252.42122",
    "22.71539,257.82707",
    "18.47961,260.72757",
    "16.25687,267.14355",
    "20.05593,271.40614",
    "14.10642,272.62432",
    "9.72937,276.60175",
];
readDataFromFile("./assets/mx.json", "json").then((data) => {
    console.log(data);
    find(query, type, data);
});

// find(query, type, lista);
