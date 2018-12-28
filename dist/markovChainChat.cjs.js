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
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(myData));
        } catch (error) {
            reject(error);
        }
    });
};

const modifyMessageObj = messageObj => {
    delete messageObj.mentions;
    delete messageObj.channels;
    messageObj.user = messageObj.u.username;
    delete messageObj.u;
    delete messageObj._updatedAt;
    return messageObj;
};

const purifyData = data => {
    const myData = R.clone(data);
    const messagesArray = myData.messages;
    return new Promise((resolve, reject) => {
        try {
            const cleanMessagesArray = messagesArray.map(item => {
                return modifyMessageObj(item);
            });
            resolve(cleanMessagesArray);
        } catch (error) {
            reject(error);
        }
    });
};

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
