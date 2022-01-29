class Cache {
  constructor(size) {
    this.cacheSize = size;
    this.cacheArr = [];
    this.cacheMap = new Map();
  }

  getCacheVal(val) {
    return this.cacheMap.get(val);
  }

  setCacheVal(key, value) {
    if (this.cacheArr.length < this.cacheSize) {
      this.cacheArr.push(key);
      this.cacheMap.set(key, value);
    } else {
      const keyToDel = this.cacheArr.shift();
      this.cacheMap.delete(keyToDel);
      this.cacheArr.push(key);
      this.cacheMap.set(key, value);
    }
  }
}

export default Cache;
