function transformMessage(message) {
    return message.toUpperCase();
}

function markovChainChat(chatLogFile) {
    return transformMessage(chatLogFile);
}

export default markovChainChat;
