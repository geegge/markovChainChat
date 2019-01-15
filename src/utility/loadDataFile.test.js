import loadDataFile from './loadDataFile';
const path = require('path');

describe('testing file loading', () => {
    it('should load content from filet', async () => {
        expect.assertions(1);
        const data = await loadDataFile(
            path.resolve(__dirname, './loadDataFiletest.txt')
        );
        expect(data).toBe('lorem ipsum');
    });

    it('should throw error without file', async () => {
        expect.assertions(1);
        await expect(loadDataFile('./nonExistingFile.txt')).rejects.toThrow();
    });
});
