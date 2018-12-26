function transformMessage(message) {
    return message.toUpperCase();
}

function makeItUpperCase(chatLogFile) {
    return transformMessage(chatLogFile);
}

export default makeItUpperCase;
