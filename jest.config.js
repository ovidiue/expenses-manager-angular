module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@utils/(.*)': '<rootDir>/src/app/utils/$1',
    '@models/(.*)': '<rootDir>/src/app/models/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
