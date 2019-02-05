'use strict';

var R = require('ramda');

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
        console.log(msgList);

        const setupBuildMatrice = R.curry(buildMatrice);
        const buildMatriceFromMsgList = setupBuildMatrice(msgListUnique);
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
