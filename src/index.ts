class TrieNode<V> {
    children: Map<String, TrieNode<V>>
    value?: V
    
    constructor () {
        this.children = new Map<String, TrieNode<V>>()
    }

    put(key: string, value: V): void {
        if (key.length == 0) {
            this.value = value
        } else {
            const firstLetter = key[0]
            if (this.children.has(firstLetter)) {
                this.children.get(firstLetter)?.put(key.slice(1), value)
            } else {
                const node = new TrieNode<V>()
                node.put(key.slice(1), value) 
                this.children.set(firstLetter, node)
            }
        }
    }

    get(key: string): V | undefined {
        if (key.length == 0 ) {
            return this.value;
        }

        const firstLetter = key[0]
        return this.children.get(firstLetter)?.get(key.slice(1))
    }


    search(prefix: string): Generator<[string, V], undefined, boolean> {
        const findNode = (p: string, node: TrieNode<V>): TrieNode<V> | undefined => {
            if (p == "") {
                return node 
            } else {
                const firstLetter = p[0]
                if (node.children.has(firstLetter)) {
                    return findNode( p.slice(1), node.children.get(firstLetter)!)
                } else {
                    return undefined
                }
            }
        }

        function* walkNodes(node: TrieNode<V>,  prefix: string): Generator<[string,V], undefined, boolean> {
            if (node.value != undefined) {
               node.children.forEach( (child, key) => 
                    yield * walkNodes(child, prefix + key)
                )
            } else {
                yield [prefix, node.value!]
            }
            return undefined
        }

        const startNode = findNode(prefix, this) 
        return walkNodes(startNode!, prefix)
    }
} 

class Trie<V> {   
    root: TrieNode<V>;
    
    constructor () {
        this.root = new TrieNode<V>()
    }

    put(key: string, node: V): void {
        this.root.put(key.toLowerCase(), node)
    }

    get(key: string): V | undefined {
        return this.root.get(key.toLowerCase())
    }

    search(prefix: string): Generator<[string, V], undefined, boolean> {
        return this.root.search(prefix.toLowerCase())
    }
}

export { Trie }