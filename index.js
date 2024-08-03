//importa a função find
const readline = require("readline");
const { find, readDataFromFile } = require("./utils/util.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

rl.question("Deseja usar um arquivo de coordenadas? (s/n): ", (answer) => {
    if (answer.toLocaleLowerCase === "s") {
        rl.close();
        readDataFromFile("./assets/mx.json", "json").then((data) => {
            console.log(data);
            find(query, type, data);
        });
    } else {
        rl.close();
        find(query, type, locList);
    }
});
