const os = require('os')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const {
  override,
  addWebpackExternals,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const isAppleSiliconDev = Boolean(os.cpus().find(cpu => cpu.model.startsWith('Apple M'))) 
const isAppleSilicon = isAppleSiliconDev || process.env.APPLE_CPU === "m1" || false

function findWebpackPlugin (plugins, pluginName) {
  return plugins.find(plugin => plugin.constructor.name === pluginName)
}

function overrideProcessEnv (value) {
  return config => {
    const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
    const processEnv = plugin.definitions['process.env'] || {}
    plugin.definitions['process.env'] = {
      ...processEnv,
      ...value
    }
    return config
  }
}

function turnOffMangle () {
  return config => {
    config.optimization.minimizer = config.optimization.minimizer.map(
      minimizer => {
        if (minimizer instanceof TerserPlugin) {
          minimizer.options.terserOptions.mangle = false
        }
        return minimizer
      }
    )
    return config
  }
}

function addWasmLoader (options) {
  return config => {
    config.resolve.extensions.push('.wasm')
    config.module.rules.forEach(rule => {
      (rule.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      })
    })
    return config
  }
}

const overrides = [
  addWebpackAlias({
    crypto: 'crypto-browserify',
    'react-highlight': path.resolve(__dirname, 'node_modules/react-highlight'),
    '@solidity-parser/parser': '@solidity-parser/parser/dist/index.cjs.js',
    '@': path.resolve(__dirname, 'src/lib'),
    '@obsidians/welcome': `@obsidians/${process.env.BUILD}-welcome`,
    '@obsidians/header': `@obsidians/${process.env.BUILD}-header`,
    '@obsidians/bottombar': `@obsidians/${process.env.BUILD}-bottombar`,
    '@obsidians/compiler': `@obsidians/${process.env.BUILD}-compiler`,
    '@obsidians/project': `@obsidians/${process.env.BUILD}-project`,
    '@obsidians/contract': `@obsidians/${process.env.BUILD}-contract`,
    '@obsidians/explorer': `@obsidians/${process.env.BUILD}-explorer`,
    '@obsidians/network': `@obsidians/${process.env.BUILD}-network`,
    '@obsidians/sdk': `@obsidians/${process.env.PROJECT}-sdk`,
    '@obsidians/node': `@obsidians/${process.env.BUILD}-node`,
    '@obsidians/premium-editor': path.resolve(__dirname, process.env.PREMIUM_EDITOR || 'empty.js'),
  }),
  overrideProcessEnv({
    CDN: JSON.stringify(!!process.env.CDN),
    BUILD: JSON.stringify(process.env.BUILD),
    PROJECT: JSON.stringify(process.env.PROJECT || process.env.BUILD),
    PROJECT_NAME: JSON.stringify(process.env.PROJECT_NAME),
    PROJECT_WEB_URL: JSON.stringify('https://conflux.ide.black'),
    PROJECT_DESKTOP_URL: JSON.stringify('https://app.obsidians.io/conflux'),
    PROJECT_GITHUB_REPO: JSON.stringify('https://github.com/ObsidianLabs/ConfluxStudio'),
    OS_IS_LINUX: JSON.stringify(os.type() === 'Linux'),
    OS_IS_WINDOWS: JSON.stringify(os.type() === 'Windows_NT'),
    OS_IS_MAC: JSON.stringify(os.type() === 'Darwin'),
    CHAIN_NAME: '"Conflux"',
    CHAIN_SHORT_NAME: '"CFX"',
    CHAIN_EXECUTABLE_NAME: '"Conflux Node"',
    CHAIN_EXECUTABLE_NAME_IN_LABEL: '"Conflux node"',
    COMPILER_NAME: '"Conflux Truffle"',
    COMPILER_NAME_IN_LABEL: '"Conflux truffle"',
    COMPILER_EXECUTABLE_NAME: '"cfxtruffle"',
    COMPILER_VERSION_KEY: '"cfxtruffle"',
    DOCKER_IMAGE_NODE: isAppleSilicon ? '"confluxchain/conflux-rust-arm64"' : '"confluxchain/conflux-rust"',
    DOCKER_IMAGE_COMPILER: '"obsidians/conflux-truffle"',
    ENABLE_AUTH: true,
  }),
  turnOffMangle(),
  addWasmLoader(),
]

if (process.env.CDN) {
  overrides.unshift(addWebpackExternals({
    react: 'React',
    'react-dom': 'ReactDOM',
    'monaco-editor': 'monaco'
  }))
} else {
  overrides.push(addWebpackPlugin(
    new MonacoWebpackPlugin({
      languages: ['json', 'javascript', 'typescript', 'css', 'html', 'markdown', 'c', 'cpp', 'shell']
    })
  ))
}

module.exports = {
  webpack: override(...overrides),
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      }
      return config
    }
  },
}
