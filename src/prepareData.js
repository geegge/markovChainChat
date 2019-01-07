import * as R from 'ramda';

const prepareData = data => {
    const myData = R.clone(data);
    try {
        return JSON.parse(myData);
    } catch (error) {
        return '';
    }
};

export default prepareData;
