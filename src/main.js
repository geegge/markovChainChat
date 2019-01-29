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

        console.log(myfineData);

        const myUniqueContentList = getUniqueMessageContent(myfineData);

        //draft!!!
        const arrMatrix = [
            [null, 0, 0, 0, 0, 0, 0],
            [1, null, 0, 0, 0, 0, 0],
            [0, 1, null, 0, 0, 0, 0],
            [0, 0, 1, null, 0, 0, 0],
            [0, 0, 0, 1, null, 0, 0],
            [0, 0, 0, 0, 0.5, null, 0.5],
            [0, 0, 0, 0, 0, 1, null]
        ];

        let msgIndex = null;
        myUniqueContentList.forEach((ele, index) => {
            if (ele.msg === 'Hi') {
                msgIndex = index;
            }
        });

        arrMatrix[msgIndex].forEach((value, index) => {
            if (value !== null && value !== 0) {
                console.log(
                    '"' +
                        myUniqueContentList[index].msg +
                        '" - Probability: ' +
                        value
                );
            }
        });

        //@todo: function for storing data
    }
}

module.exports = markovChainChat;
