// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
};
