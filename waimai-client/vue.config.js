module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true, // 若为false则代码不符合elint的规则会编译失败
  devServer: {
      open: true,
      port: 8081,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
  }
}