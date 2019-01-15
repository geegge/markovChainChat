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

const getUniqueMessageContent = data => {
    const myData = clone(data);

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

        const getcleansedData = compose(
            purifyData,
            prepareData
        );
        const myfineData = getcleansedData(rawData);

        const MyUniqueContentList = getUniqueMessageContent(myfineData);

        //@todo: function for storing data
        console.log(
            '[[markovChainChat]] MyUniqueContentList: ',
            MyUniqueContentList
        );
    }
}

module.exports = markovChainChat;
