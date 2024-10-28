const path = require('path');

module.exports = {
  webpack: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      screens: path.resolve(__dirname, 'src/screens/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      vendor: path.resolve(__dirname, 'src/vendor/'),
      services: path.resolve(__dirname, 'src/services/'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },
};
