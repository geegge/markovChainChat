module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    globals: {
        describe: true,
        expect: true,
        test: true,
        it: true,
        __dirname: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-console': 1
    }
};
