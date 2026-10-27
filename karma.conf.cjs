/** Karma + Jasmine + Webpack + Babel para probar JSX y módulos ES de React. */
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/**/*.spec.jsx', watched: false }],
    preprocessors: { 'tests/**/*.spec.jsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: { rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
          plugins: [['istanbul', { exclude: ['**/*.spec.jsx'] }]]
        } }
      }] },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    webpackMiddleware: { stats: 'errors-only' },
    reporters: ['progress', 'coverage'],
    coverageReporter: { dir: 'coverage', reporters: [{type:'html'}, {type:'lcovonly'}, {type:'text-summary'}] },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: { ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-dev-shm-usage'] } },
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
    client: { captureConsole: true }
  })
}
