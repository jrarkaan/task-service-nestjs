import { getConfig } from './datasource.config';
import { DataSource } from 'typeorm';

const datasource: DataSource = new DataSource(getConfig()); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
