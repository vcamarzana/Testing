module.exports = {
  rootDir: '../../',
  verbose: true,
  restoreMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/cypress'],
};
