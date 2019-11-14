import { resolve } from 'path';
import { SERVER_CONFIGURATIONS } from '../configuration';

export const uploadsRootPath = (path) => {
    return resolve(SERVER_CONFIGURATIONS.DIST_FOLDER, path);
};
