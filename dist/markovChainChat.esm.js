import { clone, compose } from 'ramda';

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
    const myData = clone(data);
    try {
        return JSON.parse(myData);
    } catch (error) {
        return '';
    }
};

const modifyMessageObj = messageObj => {
    delete messageObj.rid;
    delete messageObj.mentions;
    delete messageObj.channels;
    messageObj.user = messageObj.u.username;
    delete messageObj.u;
    delete messageObj._updatedAt;
    return messageObj;
};

const purifyData = data => {
    const myData = clone(data);
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

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        const rawData = await loadDataFile(filePath);

        const getRefinedData = compose(
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
