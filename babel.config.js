
module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'react-native-vector-icons': '@expo/vector-icons'
          }
        }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  };
};
