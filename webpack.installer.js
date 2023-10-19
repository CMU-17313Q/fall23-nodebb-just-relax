// Webpack config for webinstaller

const path = require('node:path');

module.exports = {
    mode: 'production',
    entry: {
        installer: './public/src/installer/install.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'build/public'),
        publicPath: '/assets/',
    },
    resolve: {
        symlinks: false,
        modules: [
            'public/src',
            'node_modules',
        ],
    },
};
