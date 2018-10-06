var env = process.env.NODE_ENV || 'production';

if (env === 'test' || env === 'production') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach( (key) => {
    process.env[key] = envConfig[key];

  });

}
