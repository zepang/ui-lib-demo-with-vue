const { defaults } = require('jest-config')
module.exports = {
  // roots: ['<rootDir>/src/components/__test__'],
  // moduleNameMapper: {
  //   // "^vue$": "<rootDir>/node_modules/vue/dist/vue.common.js",
  //   "^@/(.*)$": "<rootDir>/src/$1"
  // },
  moduleFileExtensions: [
    "js",
    "vue",
    ...defaults.moduleFileExtensions
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  }
}