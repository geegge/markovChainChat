'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var R = require('ramda');
var stringSimilarity = _interopDefault(require('string-similarity'));

const fs = require('fs');

const loadDataFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const prepareData = data => {
    const myData = R.clone(data);
    try {
        return JSON.parse(myData);
    } catch (error) {
        return '';
    }
};

const modifyMessageObj = messageObj => {
    delete messageObj._id;
    delete messageObj.rid;
    delete messageObj.mentions;
    delete messageObj.channels;
    messageObj.user = messageObj.u.username;
    delete messageObj.u;
    delete messageObj._updatedAt;
    delete messageObj.ts;
    delete messageObj.user;
    return messageObj;
};

const purifyData = data => {
    const myData = R.clone(data);
    const messagesArray = myData.messages;
    try {
        const cleanMessagesArray = messagesArray.map(item => {
            return modifyMessageObj(item);
        });
        return cleanMessagesArray;
    } catch (error) {
        return '';
    }
};

const streamlineToList = data => {
    const myData = R.clone(data);
    try {
        return myData.map(item => item.msg);
    } catch (error) {
        return '';
    }
};

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const buildMatrice = (uniqueList, msgList) => {
    const cloneMsgList = R.clone(msgList);
    const cloneUniqueList = R.clone(uniqueList);
    const matrice = Array.from(cloneUniqueList, () => []);

    try {
        cloneMsgList.forEach((msg, index) => {
            const indexPreviousMsg = cloneUniqueList.indexOf(
                cloneMsgList[index + 1]
            );
            if (indexPreviousMsg != -1) {
                matrice[indexPreviousMsg].push(cloneUniqueList.indexOf(msg));
            }
        });
        return matrice;
    } catch (error) {
        return '';
    }
};

// ESM syntax is supported.

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
        const similarityRating = stringSimilarity.findBestMatch(chatMsg, [
            ...this.msgListUnique
        ]);
        console.log(similarityRating);

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
