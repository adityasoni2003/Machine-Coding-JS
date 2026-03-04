
interface LLNode<T> {
    key : number;
    value : T,
    prev : LLNode<T> | null;
    next : LLNode<T> | null;
}

interface LRUCacheInterface<T> {
    get(key : number) : T | null;
    put(key : number, value : T) : void;
}

class LRUCache<T> implements LRUCacheInterface<T> {
    private capacity: number;
    private map: Map<number, LLNode<T>>;
    private head: LLNode<T> | null;
    private tail: LLNode<T> | null;

    #removeNode(node : LLNode<T>){
        if(node.next && node.prev){
            node.next.prev = node.prev
            node.prev.next = node.next
            node.prev = null
            node.next = null
        }else if(node.next){
            this.head.next = node.next
            node.next.prev = null;
            node.next = null
        }else if(node.prev){
            this.tail.prev = node.prev
            node.prev.next = null
            node.prev = null
        }else {

        }
    }

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    get(key: number): T | null {
        
        return null;
    }

    put(key: number, value: T): void {
        if(this.map.has(key)){
            this.#removeNode(this.map.get(key) as LLNode<T>)
            this.map.delete(key);
        }
        if(!this.head){
            const node : LLNode<T> = {
                key : key,
                value : value,
                prev : null,
                next : null
            }
            this.head = node;
            this.tail = node;
            this.map.set(key,node);
        }else {
            const node : LLNode<T> = {
                key : key,
                value : value,
                prev : null,
                next : this.head.next
            }
            this.head = node;
            this.map.set(key,node)
        }
    }
}