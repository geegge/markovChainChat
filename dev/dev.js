const markovChainChat = require('../dist/markovChainChat.cjs');
const path = require('path');
const myMarkovChain = new markovChainChat(
    path.resolve(__dirname, './chatlog.txt')
);
