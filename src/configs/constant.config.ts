import { config } from 'dotenv';
config();
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_CONFIG = {
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  SALT_ROUNDS: 12,
};

export const DATABASE_CONFIG = {
  uri: process.env.MONGO_URI || ''
};

export const API_CONFIG = {
  VERSION_V1: '1',
};

export const DEFAULT_ADMIN_USER = {
  email: process.env.DEFAULT_ADMIN_USER,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
  name: process.env.DEFAULT_ADMIN_NAME || 'Administrator',
};
