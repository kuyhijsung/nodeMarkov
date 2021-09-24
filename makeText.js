/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");


function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(`... generated text: ${mm.makeText()} ...`);
}

function makeText(file) {
    fs.readFile(file, "utf8", function (error, data) {
        if (error) {
            console.log(`Cannot read file: ${file}. Error: ${error}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeUrlText(url) {
    try {
        const res = await axios.get(url);
        generateText(res.data);
    } catch (e) {
        console.log(`Cannot read URL: ${url}. Error: ${e}`);
        process.exit(1);
    }
}

let [option, path] = process.argv.slice(2);

if (option === "file") {
    makeText(path);
} else if (option === "url") {
    makeUrlText(path);
} else {
    console.log(`Invalid option input: ${option}.`);
    process.exit(1);
}