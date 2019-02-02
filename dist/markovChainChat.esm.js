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

        //@todo: rethink how much (detail)data needed, or if msg is enough
        const getcleansedData = compose(
            purifyData,
            prepareData
        );

        const myfineData = getcleansedData(rawData).reverse();

        console.log('chat:');
        myfineData.forEach(item => {
            console.log(item.msg);
        });

        //DRAFT!!! (roughly working)
        const myUniqueContentList = getUniqueMessageContent(myfineData);
        const myUniqueContentListMessageArray = myUniqueContentList.map(
            item => item.msg
        );

        // console.log(myUniqueContentListMessageArray);

        const matrice = [];
        myUniqueContentList.forEach((item, index) => {
            matrice.push([]);
            myfineData.forEach((ele, i) => {
                if (item.msg === ele.msg) {
                    if (i + 1 < myfineData.length) {
                        matrice[index].push(
                            myUniqueContentListMessageArray.indexOf(
                                myfineData[i + 1].msg
                            )
                        );
                    }
                }
            });
        });

        //DRAFT!!! just testing output
        const testMsg = 'Hi';
        console.log('------ \nmsg: ' + testMsg);
        const indexOfMsg = myUniqueContentListMessageArray.indexOf(testMsg);
        const possibleFollowUps = matrice[indexOfMsg];
        // console.log('possible next messages:');
        // possibleFollowUps.forEach((val, index) => {
        //     console.log(myUniqueContentListMessageArray[val]);
        // });
        console.log(
            'answer: ' +
                myUniqueContentListMessageArray[
                    possibleFollowUps[
                        this.getRandomInt(possibleFollowUps.length)
                    ]
                ]
        );

        //@todo: function for storing data
    }

    //@todo: put into helper/utility module
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

module.exports = markovChainChat;
