const path = require('path');

module.exports = ({ config }) => {
  config.module.rules = config.module.rules.map((rule) => {
    if (!rule.test.test('.svg')) {
      return rule;
    }

    const newRule = rule;
    // Changes existing default rule to not handle SVG files
    newRule.test =
      /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
    return newRule;
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          modules: {
            localIdentName: '[local]_[hash:base64:5]',
            // localIdentName: '[name]_[local]_[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
    include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '.')],
  });

  config.module.rules.push({
    test: /(?<!\.d)\.tsx?$/,
    use: ['ts-loader'],
    exclude: /node_modules/,
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ['svg-react-loader'],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    atoms: path.resolve(__dirname, '../src', 'components/atoms'),
    molecules: path.resolve(__dirname, '../src', 'components/molecules'),
    organisms: path.resolve(__dirname, '../src', 'components/organisms'),
    forms: path.resolve(__dirname, '../src', 'components/forms'),
    icons: path.resolve(__dirname, '../src', 'icons'),
    images: path.resolve(__dirname, '../src', 'images'),
  };

  return config;
};
