const plugins = [];
plugins.push([
  'module-resolver',
  {
    root: ['./'],
    extensions: ['.js', '.json', 'ts', 'tsx'],
    alias: {
      '@': './',
    },
  },
]);
plugins.push('react-native-reanimated/plugin');
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
