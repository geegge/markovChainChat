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

class markovChainChat {
    constructor(textFile) {
        this.textData = this.readAndProcess(textFile);
    }
    async readAndProcess(filePath) {
        let data = await loadDataFile(filePath);
        console.log('[[markovChainChat]] data: ', data);
        //let result  = await processData( content )

        return data;
    }
}

module.exports = markovChainChat;
