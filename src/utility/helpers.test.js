import { getRandomInt } from './helpers';

describe('testing helper utilities: getRandomInt', () => {
    it('should give back 1, 2 or 0', () => {
        expect(getRandomInt(2)).toBeLessThanOrEqual(2);
    });
    it('should give back 1 or 0', () => {
        expect(getRandomInt(1)).toBeLessThanOrEqual(1);
    });
    it('should give back 0', () => {
        expect(getRandomInt(0)).toBe(0);
    });
});
