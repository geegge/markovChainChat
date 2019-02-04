import { clone, invoker, compose, uniq } from 'ramda';

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

const streamlineToList = data => {
    const myData = clone(data);
    try {
        return myData.map(item => item.msg);
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

        //move to utilites..
        const turnOrder = invoker(0, 'reverse');

        const getRefinedData = compose(
            turnOrder,
            streamlineToList,
            purifyData,
            prepareData
        );

        const msgList = getRefinedData(rawData);
        const myUniqueContentList = uniq(msgList);

        //DRAFT!!! (roughly working)
        const matrice = [];
        myUniqueContentList.forEach((item, index) => {
            matrice.push([]);

            msgList.forEach((ele, i) => {
                if (item === ele) {
                    if (i + 1 < msgList.length) {
                        matrice[index].push(
                            myUniqueContentList.indexOf(msgList[i + 1])
                        );
                    }
                }
            });
        });
        // console.log(matrice);

        //just testing output
        const testMsg = 'Hi';
        console.log('------ \nmsg: ' + testMsg);
        const indexOfMsg = myUniqueContentList.indexOf(testMsg);
        const possibleFollowUps = matrice[indexOfMsg];

        console.log(
            'answer: ' +
                myUniqueContentList[
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
