module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
    };
    config.optimization.splitChunks = { chunks: 'all', name: false };
    return config;
}