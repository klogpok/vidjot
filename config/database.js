if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURL: 'mongodb://Oleg:12345@ds137650.mlab.com:37650/vidjot-prod'
  };
} else {
  module.exports = {
    mongoURL: 'mongodb://localhost/vidjot-dev'
  };
}
