const {jest: jestConfig} = require('kcd-scripts/config')

const config = Object.assign(jestConfig, {
  roots: ['tests/unit'],
  testMatch: ['/**/*.test.js'],
})

module.exports = config
