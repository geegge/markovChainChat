import markovChainChat from './main.js';

describe('markovChainChat-dev', () => {
    test('makes string uppercase', () => {
        expect(markovChainChat('hello mr. markov')).toBe('HELLO MR. MARKOV');
    });
});
