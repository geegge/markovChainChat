import * as R from 'ramda';
import loadDataFile from './loadDataFile.js';
import prepareData from './prepareData.js';
import purifyData from './purifyData.js';

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        const rawData = await loadDataFile(filePath);

        const getRefinedData = R.compose(
            purifyData,
            prepareData
        );
        const myfineData = getRefinedData(rawData);

        //@todo: function for storing data
        console.log(
            '[[markovChainChat]] myfineData: ',
            myfineData[myfineData.length - 1]
        );
    }
}

module.exports = markovChainChat;
