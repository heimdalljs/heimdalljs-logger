import debugGen from 'debug';
import { defaultPrefixer as prefixer } from './prefixer';

export const [
  ERROR, WARN, INFO, DEBUG, TRACE
] = [ 0, 1, 2, 3, 4 ];

class Logger {
  constructor(namespace, level) {
    this.level = level;

    this._print = debugGen(namespace);
    this._prefixer = prefixer;
  }

  _message(level, msg, ...args) {
    if (level <= this.level) {
      this._print(`${this._prefixer.prefix()}${msg}`, ...args);
    }
  }

  trace(...args) {
    return this._message(TRACE, ...args);
  }

  debug(...args) {
    return this._message(DEBUG, ...args);
  }

  info(...args) {
    return this._message(INFO, ...args);
  }

  warn(...args) {
    return this._message(WARN, ...args);
  }

  error(...args) {
    return this._message(ERROR, ...args);
  }
}

export let NULL_LOGGER = {
  trace() { },
  debug() { },
  info() { },
  warn() { },
  error() { }
};

export default Logger;
