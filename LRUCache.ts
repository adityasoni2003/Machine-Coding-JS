interface LLNode<T> {
    key: number;
    value: T;
    prev: LLNode<T> | null;
    next: LLNode<T> | null;
}

interface LRUCacheInterface<T> {
    get(key: number): T | null;
    put(key: number, value: T): void;
}

class LRUCache<T> implements LRUCacheInterface<T> {
    private capacity: number;
    private map: Map<number, LLNode<T>>;
    private head: LLNode<T> | null;
    private tail: LLNode<T> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    #removeNode(node: LLNode<T>) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next; // node is head

        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev; // node is tail

        node.prev = null;
        node.next = null;
    }

    #addNodeToFront(node: LLNode<T>) {
        node.next = this.head;
        node.prev = null;

        if (this.head) this.head.prev = node;
        this.head = node;

        if (!this.tail) this.tail = node; // first node
    }

    get(key: number): T | null {
        const node = this.map.get(key);
        if (!node) return null;

        // Move accessed node to front
        this.#removeNode(node);
        this.#addNodeToFront(node);

        return node.value;
    }

    put(key: number, value: T): void {
        if (this.map.has(key)) {
            const existingNode = this.map.get(key)!;
            this.#removeNode(existingNode);
            this.map.delete(key);
        }

        const newNode: LLNode<T> = { key, value, prev: null, next: null };
        this.#addNodeToFront(newNode);
        this.map.set(key, newNode);

        // Evict LRU if over capacity
        if (this.map.size > this.capacity && this.tail) {
            this.map.delete(this.tail.key);
            this.#removeNode(this.tail);
        }
    }
}