'use strict';

function transformMessage(message) {
    return message.toUpperCase();
}

function makeItUpperCase(chatLogFile) {
    return transformMessage(chatLogFile);
}

module.exports = makeItUpperCase;
