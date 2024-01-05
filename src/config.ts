import dotenv from 'dotenv';

dotenv.config();

interface Config {
  targetDomain: string;
}

export const config: Config = {
  targetDomain: process.env.TARGET_DOMAIN || 'http://localhost',
};