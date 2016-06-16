/**
 * Created by enahum on 6/13/16.
 */

import nconf from 'nconf';
import path from 'path';
import fs from 'fs';

const config_file = path.join(__dirname, '../config/', 'config.json');


if (fs.existsSync(config_file)) {
    nconf.
    argv().
    env().
    file({file: config_file});
    console.log('configuration loaded');
} else {
    console.error('config file does not exists.');
    process.exit(1);
}

export default nconf;
