import * as R from 'ramda';

const prepareData = data => {
    const myData = R.clone(data);
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(myData));
        } catch (error) {
            reject(error);
        }
    });
};

export default prepareData;
