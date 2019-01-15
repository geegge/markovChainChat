import * as R from 'ramda';

const getUniqueMessageContent = data => {
    const myData = R.clone(data);

    //todo: improve!!!
    //todo: write tests
    const uniqueMessages = [];
    const uniqueMessageItems = [];

    myData.forEach(function(item) {
        if (!uniqueMessages.includes(item.msg)) {
            uniqueMessages.push(item.msg);
            uniqueMessageItems.push({ msg: item.msg, rel: [item._id] });
        } else {
            uniqueMessageItems.forEach(function(element) {
                if (element.msg === item.msg) {
                    element.rel.push(item._id);
                }
            });
        }
    });

    return uniqueMessageItems;
};

export default getUniqueMessageContent;
