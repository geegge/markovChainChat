const markovChainChat = require('../dist/markovChainChat.cjs');
const path = require('path');
markovChainChat(path.resolve(__dirname, './chatlog.txt'));
