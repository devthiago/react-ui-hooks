const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,jsx}",
    "!./src/index.js",
    "./tests/helpers.{js,jsx}"
  ],
  moduleNameMapper: {
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@test-helpers": "<rootDir>/tests/helpers.js",
    "^@test-mocks(.*)$": "<rootDir>/tests/mocks$1"
  },
  coverageDirectory: 'coverage',
  verbose: true,
  testRegex: '(/tests/.*\\.(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: [
    './config/rtl.setup.js'
  ]
}