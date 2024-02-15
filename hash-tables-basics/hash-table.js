const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }
  hash(key) {
    const hash = sha256(key);
    const shortHash = hash.slice(0,8);
    const hashInteger = parseInt(shortHash, 16);
    return hashInteger;

    // return parseInt('0x' + sha256(key).slice(0, 8));
    // return parseInt(sha256(key).slice(0, 8), 16);

  }
  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    let mod = this.hashMod(key);

    if (this.data[mod]) {
      throw new Error(`hash collision or same key/value pair already exists!`)
    }

    this.data[mod] = new KeyValuePair(key, value);
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    try {
      this.insertNoCollisions(key, value);
    } catch (e) {
      let node = new KeyValuePair(key, value);
      let mod = this.hashMod(key);
      
      node.next = this.data[mod];
      this.data[mod] = node;
      this.count++
    }
  }

  insert(key, value) {
    let node = new KeyValuePair(key, value);
    let mod = this.hashMod(key);

    if (!this.data[mod]) {
      this.data[mod] = node;
      this.count++;
      return;
    }

    let curr = this.data[mod];
    while (curr) {
      if (curr.next && curr.next.key == node.key) {
        node.next = curr.next.next;
        curr.next = node
        return;
      }
      curr = curr.next;
    }

    node.next = this.data[mod];
    this.data[mod] = node;
    this.count++;
  }

}


module.exports = HashTable;
