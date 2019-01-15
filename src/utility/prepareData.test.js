import prepareData from './prepareData';

const stringToBeParsed =
    '{"messages": [{"_id": "uhFudDJCsdsNgogR8","rid": "GENERAL","msg": ":relaxed:","ts": "2018-12-27T11:39:11.695Z","u": {"_id": "MoAd6XK84uc2LGfTc","username": "Asimov","name": "Asimov"},"_updatedAt": "2018-12-27T11:39:11.755Z","mentions": [],"channels": []}]}';

const stringToBeParsedMalformed =
    '{"messages": {"_id": "uhFudDJCsdsNgogR8","rid": "GENERAL","msg": ":relaxed:","ts": "2018-12-27T11:39:11.695Z","u": {"_id": "MoAd6XK84uc2LGfTc","username": "Asimov","name": "Asimov"},"_updatedAt": "2018-12-27T11:39:11.755Z","mentions": [],"channels": []}]}';

describe('testing data parsing', () => {
    it('should parse data', () => {
        const preparedData = prepareData(stringToBeParsed);
        expect(preparedData.messages[0].u.username).toBe('Asimov');
    });

    it('should return empty string when json is malformed', () => {
        expect(prepareData(stringToBeParsedMalformed)).toBe('');
    });
});
