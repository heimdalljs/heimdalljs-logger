import heimdall from 'heimdalljs';

class PrefixerSchema {
  constructor() {
    this.prefix = undefined;
  }
}

export default class Prefixer {
  constructor() {
    this.matcher = (n) => true;
    this.depth = 3;
  }

  prefix() {
    let meta = heimdall.statsFor('logging');
    if (!meta.prefix) {
      this._computePrefix(meta);
    }
    return meta.prefix;
  }

  _computePrefix(meta) {
    let parts = [];
    let node = heimdall.current;

    while (node) {
      if (node.isRoot || parts.length >= this.depth) {
        break;
      }

      if (this.matcher(node.id)) {
        parts.push(node.id.name);
      }

      node = node.parent;
    }

    meta.prefix = parts.length > 0 ? `[${parts.reverse().join(' -> ')}] ` : '';
  }

  static _registerMonitor() {
    heimdall.registerMonitor('logging', PrefixerSchema);
  }
}

Prefixer._registerMonitor();

export const defaultPrefixer = new Prefixer();
