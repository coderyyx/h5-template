const autoprefixer = require('autoprefixer');

const join = require('path').join
const isProd = process.env.BABEL_ENV === 'production'
const isReport = process.env.REPORT === 'true'

const assetsPath = (...relativePath) => join(__dirname, '..', ...relativePath)
const isFontFile = url => /\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(url)
const isCssSourceMap = false

const getEntry = () => ({
  entry: !isProd && [assetsPath('src/index.js'), 'webpack-hot-middleware/client'] || assetsPath('src/index.js')
})

const getOutput = () => {
  return Object.assign({}, {
    path: assetsPath('dist/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  }, isProd ? {
    filename: 'js/[name].[hash:7].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:7].js'
  } : {})
}

const postcssLoader = () => {
  const plugins = (loader) => {
  }
  return {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('autoprefixer')({browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']})
      ]
    }
  }
}

const lessLoader = () => {
  let loader = {
    loader: 'less-loader',
    options: {
      modifyVars: {
        "@menu-collapsed-width": "44px",
        "@menu-dark-bg": "rgba(52,63,81,1);"
      },
      javascriptEnabled: true,
      sourceMap: !isProd && isCssSourceMap
    }
  }
  return loader
}

const cssLoader = (module = false) => {
  let loader = {
    loader: 'css-loader',
    options: {}
  }
  if (!isProd && isCssSourceMap) loader.options = Object.assign(loader.options, { sourceMap: true, importLoaders: 1 })
  if (module) loader.options = Object.assign(loader.options, { modules: true, localIdentName: '[name]__[local]-[hash:base64:5]' })

  return loader
}

module.exports = {
  isProd,
  isReport,
  isFontFile,
  assetsPath,
  getEntry,
  getOutput,

  postcssLoader,
  lessLoader,
  cssLoader
}

