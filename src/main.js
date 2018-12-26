import transformMessage from './transformMessage.js';

export default function markovChainChat(chatLogFile) {
    return transformMessage(chatLogFile);
}
