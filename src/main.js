import * as R from 'ramda';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';
import streamlineToList from './utility/streamlineToList.js';

class markovChainChat {
    constructor(textFile) {
        this.readProcessStore(textFile);
    }
    async readProcessStore(filePath) {
        const rawData = await loadDataFile(filePath);

        //move to utilites..
        const turnOrder = R.invoker(0, 'reverse');

        const getRefinedData = R.compose(
            turnOrder,
            streamlineToList,
            purifyData,
            prepareData
        );

        const msgList = getRefinedData(rawData);
        const myUniqueContentList = R.uniq(msgList);

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
