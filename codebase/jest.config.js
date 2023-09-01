module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    setupFiles: [
        "fast-text-encoding"
      ]
  };
  