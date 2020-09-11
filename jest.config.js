module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
        },
    },
    collectCoverage: true,
};
