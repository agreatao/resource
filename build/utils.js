const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

const join = (dir) => {
    return path.join(ROOT_PATH, dir);
};

const resolve = (dir) => {
    return path.resolve(ROOT_PATH, dir);
};

module.exports = {
    SRC_PATH, DIST_PATH, join, resolve
};
