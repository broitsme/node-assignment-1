const crawlAndSaveHash = require('./dir-iterator.js'); 
const fs = require('fs');
const initalPath = process.argv[2]; //retrives path 
if(!initalPath){
    //throws error if no input is provided
    console.log(initalPath);
    throw new Error("please input a directory!");
}
if(!fs.statSync(initalPath).isDirectory()){
    //throw error if not a directory
    throw new Error("not a valid diretory, please input a directory!");
}
/*please change name of the output file*/
let outputFile = '/home/rahul/Desktop/Node/node-assignment-1/metaHash.txt';
crawlAndSaveHash.crawlTextFiles(initalPath,outputFile);