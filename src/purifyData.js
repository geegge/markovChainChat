import * as R from 'ramda';

const modifyMessageObj = messageObj => {
    delete messageObj.rid;
    delete messageObj.mentions;
    delete messageObj.channels;
    messageObj.user = messageObj.u.username;
    delete messageObj.u;
    delete messageObj._updatedAt;
    return messageObj;
};

const purifyData = data => {
    const myData = R.clone(data);
    const messagesArray = myData.messages;
    return new Promise((resolve, reject) => {
        try {
            const cleanMessagesArray = messagesArray.map(item => {
                return modifyMessageObj(item);
            });
            resolve(cleanMessagesArray);
        } catch (error) {
            reject(error);
        }
    });
};

export default purifyData;
