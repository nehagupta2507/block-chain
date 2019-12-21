const SHA256= require('crypto-js/sha256')
class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index= index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash =previousHash;
        this.hash= this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.indec + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
    }
//first block is genesis block and we have to create it manually as it doesnt have previous hash so we need to hardcode it
    createGenesisBlock(){
        return new Block(0, "01/12/2019","Genesis block", "0");
    }
    
    getLastestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //block 0 is genesis not gonna start with that
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false
        }
//pointing to correct previous block
        if(currentBlock.previousHash !== previousBlock.hash){
            return false
        }

        }
// if iit hasn't return false our chain is valid
        return true;
    }
}

let kapsyCoin = new Blockchain();
kapsyCoin.addBlock(new Block(1, "2/12/2019",{amount: 4}));
kapsyCoin.addBlock(new Block(1, "12/12/2019",{amount: 10}));
console.log('Is blockchain valid?' + kapsyCoin.isChainValid());
kapsyCoin.chain[1].data ={amount: 100};
kapsyCoin.chain[1].hash =kapsyCoin.chain[1].calculateHash();

console.log('Is blockchain valid?' + kapsyCoin.isChainValid());

console.log(JSON.stringify(kapsyCoin, null,4));


