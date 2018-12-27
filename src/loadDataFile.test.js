import loadDataFile from './loadDataFile';
const path = require('path');

describe('testing file loading', () => {
    test('load content from filet', async () => {
        expect.assertions(1);
        const data = await loadDataFile(
            path.resolve(__dirname, './loadDataFiletest.txt')
        );
        expect(data).toBe('lorem ipsum');
    });
});
