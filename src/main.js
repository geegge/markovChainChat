import loadDataFile from './loadDataFile.js';

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
