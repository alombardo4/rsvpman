import { default as app } from './app';
import { Config } from './config';

const config = new Config();

app.start(config);