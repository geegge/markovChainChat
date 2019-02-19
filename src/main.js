import * as R from 'ramda';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';
import streamlineToList from './utility/streamlineToList.js';

import buildMatrice from './logic/buildMatrice.js';

class markovChainChat {
    constructor(textFile) {
        this.msgListUnique = [];
        this.matrice = [];
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
        this.msgListUnique = R.uniq(msgList);

        const setupMatrice = R.curry(buildMatrice);
        const buildMatriceFromMsgList = setupMatrice(this.msgListUnique);
        this.matrice = buildMatriceFromMsgList(msgList);

        //@todo: function for longtime storing data
    }

    getMessage(chatMsg) {
        const indexOfChatMsg = this.msgListUnique.indexOf(chatMsg);
        const possibleFollowUps = this.matrice[indexOfChatMsg];

        if (possibleFollowUps) {
            return this.msgListUnique[
                possibleFollowUps[this.getRandomInt(possibleFollowUps.length)]
            ];
        } else {
            return '';
        }
    }

    //@todo: put into helper/utility module if still needed
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

module.exports = markovChainChat;
