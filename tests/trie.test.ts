import { expect } from 'chai';
import { Trie } from '../src/';

interface TestValue {
    value: number
}

describe('TS Trie', () => { 
    it('insert a value', () => { 
        const trie: Trie<TestValue> = new Trie<TestValue>()

        const testKey: string = "aaa"
        const testValue: TestValue = {value: 42}
        trie.put(testKey, testValue)

        expect(trie.get(testKey)).to.equal(testValue)
    });

    it('overwrite a value', () => {
        const trie: Trie<TestValue> = new Trie<TestValue>()
        const testKey: string = "aaa"
        const testValue: TestValue = {value: 42}
        const testValue2: TestValue = {value: 43}
        trie.put(testKey, testValue)
        trie.put(testKey, testValue2)

        expect(trie.get(testKey)).to.equal(testValue2)
    });

    it('keys shoud be case insensitive', () => {
        const trie: Trie<TestValue> = new Trie<TestValue>()
        const testKey: string = "Aaa"
        const testValue: TestValue = {value: 42}
        trie.put(testKey, testValue)

        expect(trie.get(testKey.toLowerCase())).to.equal(testValue)
    });


    it('return indefined if node does not exists', () => {
        const trie: Trie<TestValue> = new Trie<TestValue>()
        const testKey: string = "Aaa"
        const noExistingKey: string = "Bbb"
        const testValue: TestValue = {value: 42}
        
        expect(trie.get(noExistingKey)).to.be.undefined

    });


    it('try should allow results', () => {
        const trie: Trie<TestValue> = new Trie<TestValue>()
        const key1: string = "Cat"
        const key2: string = "Cow"

        trie.put(key1, {value: 1})
        trie.put(key2, {value: 2})
        
        let gen = trie.search("C")
        expect(gen.next()).to.be.true

    });


});