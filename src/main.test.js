import makeItUpperCase from './main.js';

describe('rollup-boilerplate-dev', () => {
    test('makes string uppercase', () => {
        expect(makeItUpperCase('hello mr. smith')).toBe('HELLO MR. SMITH');
    });
});
