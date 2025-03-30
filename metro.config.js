const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Optimize Metro Bundler configuration
config.watchFolders = [path.resolve(__dirname, ".")];
config.resolver.blockList = [
  /\.git\/.*/,
  /node_modules\/.*\/node_modules/,
  /\.expo\/.*/,
  /\.next\/.*/,
  /app\/tempobook\/.*/,
  /\.watchman.*/,
];

// Disable file watching completely
config.watcherType = "none";

// Limit workers to absolute minimum
config.maxWorkers = 1;

// Optimize transformer
config.transformer.assetPlugins = config.transformer.assetPlugins || [];
config.transformer.minifierConfig = {
  compress: { unused: true, dead_code: true },
  mangle: true,
};

// Reduce cache size
config.cacheStores = [];

module.exports = withNativeWind(config, { input: "./global.css" });
