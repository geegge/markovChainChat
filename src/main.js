import * as R from 'ramda';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';

import getUniqueMessageContent from './utility/getUniqueMessageContent.js';

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        const rawData = await loadDataFile(filePath);

        const getcleansedData = R.compose(
            purifyData,
            prepareData
        );
        const myfineData = getcleansedData(rawData);

        const MyUniqueContentList = getUniqueMessageContent(myfineData);

        //@todo: function for storing data
        console.log(
            '[[markovChainChat]] MyUniqueContentList: ',
            MyUniqueContentList
        );
    }
}

module.exports = markovChainChat;
