import * as R from 'ramda';
import loadDataFile from './utility/loadDataFile.js';
import prepareData from './utility/prepareData.js';
import purifyData from './utility/purifyData.js';
import streamlineToList from './utility/streamlineToList.js';

import getUniqueMessageContent from './utility/getUniqueMessageContent.js';

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
        console.log(msgList);

        /*
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
*/
        //@todo: function for storing data
    }

    //@todo: put into helper/utility module if still needed
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

module.exports = markovChainChat;
