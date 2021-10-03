import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'development' });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

export default dbConfig;
