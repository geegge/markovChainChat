'use strict';

function transformMessage(message) {
    return message.toUpperCase();
}

function markovChainChat(chatLogFile) {
    return transformMessage(chatLogFile);
}

module.exports = markovChainChat;
