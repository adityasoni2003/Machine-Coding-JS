class Heap<T> {
    private data: T[];
    private comparator: (a: T, b: T) => boolean;

    constructor(comparator?: (a: T, b: T) => boolean) {
        this.data = [];
        this.comparator = comparator || ((a, b) => a < b); // min-heap by default
    }

    size(): number {
        return this.data.length;
    }

    peek(): T | null {
        return this.data.length ? this.data[0] : null;
    }

    insert(value: T): void {
        this.data.push(value);
        this.bubbleUp(this.data.length - 1);
    }

    remove(): T | null {
        if (!this.data.length) return null;
        const root = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length) {
            this.data[0] = last;
            this.bubbleDown(0);
        }
        return root;
    }

    private bubbleUp(index: number) {
        while(index > 0){
            let parentIndex = Math.floor((index - 1)/2);
            if(this.comparator(this.data[index],this.data[parentIndex])){
                let temp = this.data[parentIndex];
                this.data[parentIndex] = this.data[index];
                this.data[index] = temp;
                index = parentIndex;
            }else{
                break
            }
        }
    }

    private bubbleDown(index: number) {
        const length = this.data.length;
        
        while(true){
            const left = (index * 2) + 1;
            const right = (index * 2) + 2;

            let target = index ;

            if(left < length && this.comparator(this.data[left],this.data[index])) {
                [this.data[index],this.data[left]] = [this.data[left],this.data[index]];
                target = left
            }
            if(right < length && this.comparator(this.data[right],this.data[index])) {
                [this.data[index],this.data[right]] = [this.data[right],this.data[index]];
                target = right
            }

            if(target === index) break;

        }


    }
}



// Assuming Heap class is imported or in the same file

// Test 1: Min-Heap
const minHeap = new Heap<number>(); // default is min-heap
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);

console.log("Min-Heap Test:");
console.log(minHeap.peek()); // 1
console.log(minHeap.remove()); // 1
console.log(minHeap.remove()); // 3
console.log(minHeap.peek()); // 5
console.log(minHeap.size()); // 2

// Test 2: Max-Heap
const maxHeap = new Heap<number>((a, b) => a > b); // max-heap
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
maxHeap.insert(1);

console.log("\nMax-Heap Test:");
console.log(maxHeap.peek()); // 8
console.log(maxHeap.remove()); // 8
console.log(maxHeap.remove()); // 5
console.log(maxHeap.peek()); // 3
console.log(maxHeap.size()); // 2

// Test 3: Empty Heap
const emptyHeap = new Heap<number>();
console.log("\nEmpty Heap Test:");
console.log(emptyHeap.peek()); // null
console.log(emptyHeap.remove()); // null

// Test 4: Single Element
const singleHeap = new Heap<number>();
singleHeap.insert(42);
console.log("\nSingle Element Test:");
console.log(singleHeap.peek()); // 42
console.log(singleHeap.remove()); // 42
console.log(singleHeap.peek()); // null