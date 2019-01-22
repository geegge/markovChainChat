import * as R from 'ramda';
import * as math from 'mathjs';
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

        const myUniqueContentList = getUniqueMessageContent(myfineData);

        //draft!!!
        //adding probabilites from readme for testing (left direction in matrice is down in table)
        const m1 = math.matrix([
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0.5, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0.5, 0]
        ]);

        let msgIndex = null;
        myUniqueContentList.forEach((ele, index) => {
            if (ele.msg === 'Hallo') {
                msgIndex = index;
            }
        });

        console.log(math.subset(m1, math.index(math.range(0, 4))));

        //@todo: function for storing data
    }
}

module.exports = markovChainChat;
