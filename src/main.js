import loadDataFile from './loadDataFile.js';

const readAndProcess = async filePath => {
    let data = await loadDataFile(filePath);
    console.log('data: ', data);
    //let result  = await processData( content )

    return data;
};

export default function markovChainChat(chatLogFile) {
    readAndProcess(chatLogFile);
}
