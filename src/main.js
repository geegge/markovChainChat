// ESM syntax is supported.
export {};
import * as R from 'ramda';
import stringSimilarity from 'string-similarity';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';
import streamlineToList from './utility/streamlineToList.js';
import { getRandomInt } from './utility/helpers.js';
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

    getMessage(chatMsg = '', minRating = 0) {
        const similarityRating = stringSimilarity.findBestMatch(
            chatMsg.toLowerCase(),
            [...this.msgListUnique].map(item => item.toLowerCase())
        );

        if (similarityRating.bestMatch.rating < minRating) return;

        const possibleFollowUps = this.matrice[similarityRating.bestMatchIndex];

        if (possibleFollowUps) {
            return this.msgListUnique[
                possibleFollowUps[getRandomInt(possibleFollowUps.length)]
            ];
        } else {
            return;
        }
    }
}

module.exports = markovChainChat;
