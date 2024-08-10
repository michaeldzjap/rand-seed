/** @type {import('jest').Config} */
export default {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: {
        '\\.[jt]sx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    collectCoverage: true,
};
