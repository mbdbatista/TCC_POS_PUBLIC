const presets = [
  [
    '@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }
  ],
  ['@babel/preset-typescript', {
    allowDeclareFields: true,
    allowNamespaces: true
  }]
];
const plugins = [
  [
    '@babel/plugin-proposal-decorators', {
      legacy: true
    }
  ],
  [
    '@babel/plugin-proposal-class-properties', {
      loose: false
    }
  ]
];

module.exports = { presets, plugins }