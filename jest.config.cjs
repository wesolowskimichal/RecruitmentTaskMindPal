module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1'
  }
}
