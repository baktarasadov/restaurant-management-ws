import { config } from 'dotenv';
import * as process from 'process';

config();

config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
  override: true,
});
