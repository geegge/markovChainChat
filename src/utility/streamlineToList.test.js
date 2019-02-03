import streamlineToList from './streamlineToList';

const messages = [
    {
        msg: 'Danke, gut! und selbst?'
    },
    {
        msg: ':relaxed:'
    }
];

const expectedMessagesArray = ['Danke, gut! und selbst?', ':relaxed:'];

describe('list of msg-object should be a list', () => {
    it('should return array of msg-strings', () => {
        const streamlinedList = streamlineToList(messages);
        expect(Array.isArray(streamlinedList)).toBe(true);
        expect(streamlinedList.length).toBe(2);
        expect(typeof streamlinedList[0]).toBe('string');
    });

    it('should remove unused properties from message-objects', () => {
        const streamlinedList = streamlineToList(messages);
        expect(streamlinedList).toMatchObject(expectedMessagesArray);
    });

    it('should return empty string', () => {
        expect(streamlineToList(1)).toBe('');
    });
});
