const markovChainChat = require('../dist/markovChainChat.cjs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const myMarkovChain = new markovChainChat(
    path.resolve(__dirname, './chatlog.txt')
);
setTimeout(() => {
    console.log('dev: ' + myMarkovChain.getMessage('Hi'));
}, 100);
