module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'dist/'
    : '/',
  indexPath: '../index.html'
}
