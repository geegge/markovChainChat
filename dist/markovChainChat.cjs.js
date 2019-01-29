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
    delete messageObj.rid;
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
    try {
        const cleanMessagesArray = messagesArray.map(item => {
            return modifyMessageObj(item);
        });
        return cleanMessagesArray;
    } catch (error) {
        return '';
    }
};

const getUniqueMessageContent = data => {
    const myData = R.clone(data);

    //todo: improve!!!
    //todo: write tests
    const uniqueMessages = [];
    const uniqueMessageItems = [];

    myData.forEach(function(item) {
        if (!uniqueMessages.includes(item.msg)) {
            uniqueMessages.push(item.msg);
            uniqueMessageItems.push({ msg: item.msg, rel: [item._id] });
        } else {
            uniqueMessageItems.forEach(function(element) {
                if (element.msg === item.msg) {
                    element.rel.push(item._id);
                }
            });
        }
    });

    return uniqueMessageItems;
};

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
