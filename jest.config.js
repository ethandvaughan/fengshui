module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'jsdom' if you're testing DOM elements
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
};