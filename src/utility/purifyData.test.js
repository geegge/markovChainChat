import purifyData from './purifyData';

const messages = {
    messages: [
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
            _id: 'uhFudDJCsdsNgogR8',
            rid: 'GENERAL',
            msg: ':relaxed:',
            ts: '2018-12-27T11:39:11.695Z',
            u: { _id: 'MoAd6XK84uc2LGfTc', username: 'Asimov', name: 'Asimov' },
            _updatedAt: '2018-12-27T11:39:11.755Z',
            mentions: [],
            channels: []
        }
    ]
};

const expectedMessagesArray = [
    {
        _id: 'a7zaoRxZuv4kBgenH',
        msg: 'Danke, gut! und selbst?',
        ts: '2018-12-27T11:36:03.711Z',
        user: 'markov'
    },
    {
        _id: 'uhFudDJCsdsNgogR8',
        msg: ':relaxed:',
        ts: '2018-12-27T11:39:11.695Z',
        user: 'Asimov'
    }
];

describe('purifying message objects', () => {
    it('should return array of message-objects', () => {
        const cleanData = purifyData(messages);
        expect(Array.isArray(cleanData)).toBe(true);
        expect(cleanData.length).toBe(2);
    });

    it('should remove unused properties from message-objects', () => {
        const cleanData = purifyData(messages);
        expect(cleanData).toMatchObject(expectedMessagesArray);
    });

    it('should return empty string', () => {
        expect(purifyData(1)).toBe('');
    });
});
