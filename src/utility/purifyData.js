import * as R from 'ramda';

const modifyMessageObj = messageObj => {
    delete messageObj._id;
    delete messageObj.rid;
    delete messageObj.mentions;
    delete messageObj.channels;
    messageObj.user = messageObj.u.username;
    delete messageObj.u;
    delete messageObj._updatedAt;
    delete messageObj.ts;
    delete messageObj.user;
    return messageObj;
};

const purifyData = data => {
    const myData = R.clone(data);
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

export default purifyData;
