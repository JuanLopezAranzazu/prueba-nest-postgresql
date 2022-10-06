import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
    },
  };
});
