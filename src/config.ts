const config = require('config');
import * as db from 'core/models/config';

console.log('Config DIR:', config.util.getEnv('NODE_CONFIG_DIR'))

// database
export const database = db.setConfig(config.get('database'));

// api
export interface IService {
    port: number
}
export const service: IService = config.get('service');