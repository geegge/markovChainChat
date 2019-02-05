import * as R from 'ramda';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';
import streamlineToList from './utility/streamlineToList.js';

import buildMatrice from './logic/buildMatrice.js';

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        const rawData = await loadDataFile(filePath);

        const getRefinedData = R.compose(
            streamlineToList,
            purifyData,
            prepareData
        );

        const msgList = getRefinedData(rawData);
        const msgListUnique = R.uniq(msgList);

        const setupMatrice = R.curry(buildMatrice);
        const buildMatriceFromMsgList = setupMatrice(msgListUnique);
        const matrice = buildMatriceFromMsgList(msgList);

        //console.log(matrice);

        //just testing output
        const testMsg = 'Hi';
        console.log('------ \nmsg: ' + testMsg);
        const indexOfMsg = msgListUnique.indexOf(testMsg);
        const possibleFollowUps = matrice[indexOfMsg];

        console.log(
            'answer: ' +
                msgListUnique[
                    possibleFollowUps[
                        this.getRandomInt(possibleFollowUps.length)
                    ]
                ]
        );

        //@todo: function for storing data
    }

    //@todo: put into helper/utility module if still needed
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

module.exports = markovChainChat;
