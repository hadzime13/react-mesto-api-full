const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_TTL: process.env.JWT_TTL || '7d',
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

module.exports = config;
