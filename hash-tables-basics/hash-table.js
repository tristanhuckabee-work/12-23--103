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
    this.data = new Array(numBuckets).fill(null);
    this.capacity = numBuckets;
    this.count = 0;
  }
  hash(key) {
    let sha = sha256(key);
    return parseInt('0x'+ sha.slice(0,8));
  }
  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    let node = new KeyValuePair(key, value);
    let mod = this.hashMod(key);
    
    if (!this.data[mod]) {
      this.data[mod] = node;
      this.count++;
      return;
    }
    throw new Error('hash collision or same key/value pair already exists!')
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here 
  }

}


module.exports = HashTable;
