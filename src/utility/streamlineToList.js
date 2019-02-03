import * as R from 'ramda';

const streamlineToList = data => {
    const myData = R.clone(data);
    try {
        return myData.map(item => item.msg);
    } catch (error) {
        return '';
    }
};

export default streamlineToList;
