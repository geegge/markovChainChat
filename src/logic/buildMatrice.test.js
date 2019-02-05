import buildMatrice from './buildMatrice';

const msgList = [
    ':relaxed:',
    'ja, bei mir auch. Ich habe sehr gut gegessen und Zeit mit der Familie verbracht.',
    'Auch gut! weihnachten war wieder sehr entspannt dieses Jahr.',
    'Danke, gut! und selbst?',
    'Hi',
    'Hallo',
    'Hi'
];

const msgListUnique = [
    ':relaxed:',
    'ja, bei mir auch. Ich habe sehr gut gegessen und Zeit mit der Familie verbracht.',
    'Auch gut! weihnachten war wieder sehr entspannt dieses Jahr.',
    'Danke, gut! und selbst?',
    'Hi',
    'Hallo'
];

describe('testing matrice building', () => {
    it('should build correct matrice', () => {
        const matrice = buildMatrice(msgListUnique, msgList);
        expect(matrice).toMatchObject([[], [0], [1], [2], [3, 5], [4]]);
    });

    it('should return empty string on error', async () => {
        expect.assertions(1);
        await expect(buildMatrice(msgListUnique, true)).toBe('');
    });
});
