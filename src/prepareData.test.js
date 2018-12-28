import prepareData from './prepareData';

const stringToBeParsed =
    '{"messages": [{"_id": "uhFudDJCsdsNgogR8","rid": "GENERAL","msg": ":relaxed:","ts": "2018-12-27T11:39:11.695Z","u": {"_id": "MoAd6XK84uc2LGfTc","username": "Asimov","name": "Asimov"},"_updatedAt": "2018-12-27T11:39:11.755Z","mentions": [],"channels": []}]}';

const stringToBeParsedMalformed =
    '{"messages": {"_id": "uhFudDJCsdsNgogR8","rid": "GENERAL","msg": ":relaxed:","ts": "2018-12-27T11:39:11.695Z","u": {"_id": "MoAd6XK84uc2LGfTc","username": "Asimov","name": "Asimov"},"_updatedAt": "2018-12-27T11:39:11.755Z","mentions": [],"channels": []}]}';

describe('testing data parsing', () => {
    it('should parse data', async () => {
        expect.assertions(1);
        const preparedData = await prepareData(stringToBeParsed);
        expect(preparedData.messages[0].u.username).toBe('Asimov');
    });

    it('should throw error when json is malformed', async () => {
        expect.assertions(1);
        await expect(prepareData(stringToBeParsedMalformed)).rejects.toThrow();
    });
});
