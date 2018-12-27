'use strict';

const fs = require('fs');

const loadDataFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const readAndProcess = async filePath => {
    let data = await loadDataFile(filePath);
    console.log('data: ', data);
    //let result  = await processData( content )

    return data;
};

function markovChainChat(chatLogFile) {
    readAndProcess(chatLogFile);
}

module.exports = markovChainChat;
