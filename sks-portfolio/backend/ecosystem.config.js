module.exports = {
  apps: [{
    name: 'sks-backend',
    script: 'dist/server.js',
    instances: 'max',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
