import loadDataFile from './loadDataFile.js';
import prepareData from './prepareData.js';
import purifyData from './purifyData.js';

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        //@todo: make it work fp
        const rawData = await loadDataFile(filePath);
        const refinedData = await prepareData(rawData);
        const messagesArr = await purifyData(refinedData);
        //@todo: function for storing data
        console.log(
            '[[markovChainChat]] messagesArr: ',
            messagesArr[messagesArr.length - 1]
        );
    }
}

module.exports = markovChainChat;
