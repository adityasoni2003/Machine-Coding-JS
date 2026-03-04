class HashMap<K extends string | number, V> {
  private buckets: [K, V][][];
  private capacity: number;
  private size: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  private hash(key: K): number {
    if (typeof key === "number") {
        return Math.abs(key) % this.capacity;
    }

    // String hashing (Polynomial Rolling Hash)
    let hash = 0;
    const PRIME = 31;

    for (let i = 0; i < key.length; i++) {
        hash = (hash * PRIME + key.charCodeAt(i)) % this.capacity;
    }

    return hash;
  }

  set(key: K, value: V): void {
    // TODO: insert or update
    let hash : number = this.hash(key);
    let bucket : [K,V][] = this.buckets[hash];

    let indexOfKey = bucket.findIndex((arr)=>{
      if(arr[0] === key) {
        return true
      }
    });

    if(indexOfKey !== -1){
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); // remove entry
        }
      }
      this.buckets[hash].push([key,value])


    }else{
      this.buckets[hash].push([key,value])
      this.size++
    }

  }

  get(key: K): V | undefined {
    // TODO: return value if exists
    if(!this.has(key)) return undefined
    const hashIndex : number = this.hash(key);
    const bucket : [K,V][] = this.buckets[hashIndex];
    for(let [k,v] of bucket){
        if(k === key){
            return v
        }
    }
    return undefined;
  }

  has(key: K): boolean {
    // TODO: return true if key exists
    
    const hashIndex : number = this.hash(key);

    const bucket : [K,V][] = this.buckets[hashIndex];

    for(let [k,v] of bucket) {
        if(k === key){
            return true
        }
    } 
    return false;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // remove entry
        this.size--;
        return true;
      }
    }

    return false;
  }

  clear(): void {
    // TODO: reset hashmap
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0

  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }
}

function testHashMap() {
  const map = new HashMap<string, number>(5);

  console.log("---- Basic Insert ----");
  map.set("apple", 10);
  map.set("banana", 20);
  console.assert(map.get("apple") === 10, "apple should be 10");
  console.assert(map.get("banana") === 20, "banana should be 20");

  console.log("---- Update Existing Key ----");
  map.set("apple", 99);
  console.assert(map.get("apple") === 99, "apple should update to 99");

  console.log("---- Has Method ----");
  console.assert(map.has("banana") === true, "banana should exist");
  console.assert(map.has("grape") === false, "grape should not exist");

  console.log("---- Delete ----");
  console.assert(map.delete("banana") === true, "banana should be deleted");
  console.assert(map.get("banana") === undefined, "banana should be undefined");
  console.assert(map.delete("banana") === false, "deleting again should return false");

  console.log("---- Size Tracking ----");
  console.assert(map.getSize() === 1, "size should be 1");

  console.log("---- Collision Handling ----");
  // Force collision by using small capacity
  const collisionMap = new HashMap<number, string>(2);
  collisionMap.set(1, "one");
  collisionMap.set(3, "three"); // 1 % 2 = 1, 3 % 2 = 1 → same bucket

  console.assert(collisionMap.get(1) === "one", "1 should be one");
  console.assert(collisionMap.get(3) === "three", "3 should be three");

  console.log("---- Delete From Collision Bucket ----");
  collisionMap.delete(1);
  console.assert(collisionMap.get(1) === undefined, "1 should be deleted");
  console.assert(collisionMap.get(3) === "three", "3 should still exist");

  console.log("---- Clear ----");
  map.clear();
  console.assert(map.getSize() === 0, "size should be 0 after clear");
  console.assert(map.get("apple") === undefined, "apple should be gone");

  console.log("All tests passed 🚀");
}

testHashMap();