import { clone, compose } from 'ramda';
import { matrix, subset, index, range } from 'mathjs';

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

        const myUniqueContentList = getUniqueMessageContent(myfineData);

        //draft!!!
        //adding probabilites from readme for testing (left direction in matrice is down in table)
        const m1 = matrix([
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0.5, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0.5, 0]
        ]);
        myUniqueContentList.forEach((ele, index$$1) => {
            if (ele.msg === 'Hallo') ;
        });

        console.log(subset(m1, index(range(0, 4))));

        //@todo: function for storing data
    }
}

module.exports = markovChainChat;
