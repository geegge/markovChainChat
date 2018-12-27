import loadDataFile from './loadDataFile.js';

class markovChainChat {
    constructor(textFile) {
        this.textData = this.readAndProcess(textFile);
    }
    async readAndProcess(filePath) {
        let rawData = await loadDataFile(filePath);
        console.log('[[markovChainChat]] data: ', rawData);
        //let result  = await processData( content )
    }
}

module.exports = markovChainChat;
