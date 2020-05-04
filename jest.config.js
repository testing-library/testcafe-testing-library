const {jest: jestConfig} = require('kcd-scripts/config')

const config = Object.assign(jestConfig, {
  roots: ['tests/unit'],
  testMatch: ['/**/*.test.ts'],
  transform: {
    '.ts': 'ts-jest',
  },
})

module.exports = config
