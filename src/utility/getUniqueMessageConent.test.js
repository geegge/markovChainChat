import getUniqueMessageContent from './getUniqueMessageContent.js';

const messages = [
    {
        _id: 'uhFudDJCsdsNgogR8',
        rid: 'GENERAL',
        msg: ':relaxed:',
        ts: '2018-12-27T11:39:11.695Z',
        u: {
            _id: 'MoAd6XK84uc2LGfTc',
            username: 'Asimov',
            name: 'Asimov'
        },
        _updatedAt: '2018-12-27T11:39:11.755Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'qW5DrRWyXt9Fpib7a',
        rid: 'GENERAL',
        msg:
            'ja, bei mir auch. Ich habe sehr gut gegessen und Zeit mit der Familie verbracht.',
        ts: '2018-12-27T11:37:33.130Z',
        u: {
            _id: 'FWtqgRR2r5eo9v4g6',
            username: 'markov',
            name: 'Mr. Markov'
        },
        _updatedAt: '2018-12-27T11:37:33.188Z',
        mentions: [],
        channels: []
    },
    {
        _id: '7rf2g8e4tXh3fy7Et',
        rid: 'GENERAL',
        msg: 'Auch gut! weihnachten war wieder sehr entspannt dieses Jahr.',
        ts: '2018-12-27T11:36:40.442Z',
        u: {
            _id: 'MoAd6XK84uc2LGfTc',
            username: 'Asimov',
            name: 'Asimov'
        },
        _updatedAt: '2018-12-27T11:36:40.535Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'a7zaoRxZuv4kBgenH',
        rid: 'GENERAL',
        msg: 'Danke, gut! und selbst?',
        ts: '2018-12-27T11:36:03.711Z',
        u: {
            _id: 'FWtqgRR2r5eo9v4g6',
            username: 'markov',
            name: 'Mr. Markov'
        },
        _updatedAt: '2018-12-27T11:36:03.767Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'n6LR4ACR7HTvFe334',
        rid: 'GENERAL',
        msg: 'wie geht es so?',
        ts: '2018-12-27T11:35:44.740Z',
        u: {
            _id: 'MoAd6XK84uc2LGfTc',
            username: 'Asimov',
            name: 'Asimov'
        },
        _updatedAt: '2018-12-27T11:35:44.828Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'Kojw6bLaQ6nGTqXxx',
        rid: 'GENERAL',
        msg: 'Hi',
        ts: '2018-12-27T11:33:46.708Z',
        u: {
            _id: 'YoAd6XK84uc2LGfXx',
            username: 'Alexei',
            name: 'Mr. Alexei'
        },
        _updatedAt: '2018-12-27T11:33:43.967Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'WeBM4BnofjD8eR6vb',
        rid: 'GENERAL',
        msg: 'Hallo',
        ts: '2018-12-27T11:35:31.280Z',
        u: {
            _id: 'MoAd6XK84uc2LGfTc',
            username: 'Asimov',
            name: 'Asimov'
        },
        _updatedAt: '2018-12-27T11:35:31.408Z',
        mentions: [],
        channels: []
    },
    {
        _id: 'Kojw6bLaQ6nGTqLsv',
        rid: 'GENERAL',
        msg: 'Hi',
        ts: '2018-12-27T11:33:43.708Z',
        u: {
            _id: 'FWtqgRR2r5eo9v4g6',
            username: 'markov',
            name: 'Mr. Markov'
        },
        _updatedAt: '2018-12-27T11:33:43.967Z',
        mentions: [],
        channels: []
    }
];
const expectedMessagesArray = [
    { msg: ':relaxed:', rel: ['uhFudDJCsdsNgogR8'] },
    {
        msg:
            'ja, bei mir auch. Ich habe sehr gut gegessen und Zeit mit der Familie verbracht.',
        rel: ['qW5DrRWyXt9Fpib7a']
    },
    {
        msg: 'Auch gut! weihnachten war wieder sehr entspannt dieses Jahr.',
        rel: ['7rf2g8e4tXh3fy7Et']
    },
    { msg: 'Danke, gut! und selbst?', rel: ['a7zaoRxZuv4kBgenH'] },
    { msg: 'wie geht es so?', rel: ['n6LR4ACR7HTvFe334'] },
    { msg: 'Hi', rel: ['Kojw6bLaQ6nGTqXxx', 'Kojw6bLaQ6nGTqLsv'] },
    { msg: 'Hallo', rel: ['WeBM4BnofjD8eR6vb'] }
];

describe('return array of uniqe message-items', () => {
    it('should return array of message-objects', () => {
        const msgArray = getUniqueMessageContent(messages);
        expect(msgArray).toEqual(expectedMessagesArray);
    });
});
