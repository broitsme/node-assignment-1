//this module is used in path-finder.js
const fs = require('fs');
const crypto = require('crypto');
 function crawlTextFiles(directoryPath,writeableFilePath){
    /* error handling */
    if(fs.statSync(writeableFilePath).isDirectory()){
        //throws error if writeableFilePath is not a directory.
        throw new Error(writeableFilePath+" must not be a directory!");
    }
    if(!fs.statSync(directoryPath).isDirectory()){
        //throws error if directoryPath is not a directory.
        throw new Error(directoryPath+" must be a directory!");
    }   
    /* error handling */

    //creating a write stream for given text file.
    let writeStream = fs.createWriteStream(writeableFilePath);
    iteratorBFS(directoryPath,writeStream);
}
function iteratorBFS(initialPath, writeStream){
    /* error handling */
    if(typeof writeStream !== 'object'){
        console.log(typeof writeStream);
        //throws error if writeStream is not type of Object.
        throw new Error(writeStream+" must be a object!");
    }
    if(!fs.statSync(initialPath).isDirectory()){
        //throws error if initialPath is not a directory.
        throw new Error(initialPath+" must be a directory!");
    }   
    /* error handling */

    //using tree BFS to visit every directory and file.
    //writes content of any non directory file in writeStream.
    let queue = [initialPath];
    let topQueueIndex = 0; 
    //to use array as queue, without removing elements from queue, increment topQueueIndex
        while(queue.length !== topQueueIndex){
            let currentPath = queue[topQueueIndex++];
            let dirContents = fs.readdirSync(currentPath);
            dirContents.forEach(childFileName => {
                childPath = currentPath + '/' +childFileName;
                if(!fs.statSync(childPath).isDirectory()){
                    //if childPath is has a file, write it in writeStream.
                          writeInStream(writeStream,childPath);
                }
                else{
                    //else push it in queue.
                    queue.push(childPath);
                }
            });
        }
    }
function  writeInStream(writeStream,file){
    /* error handling */
    if(typeof writeStream !== 'object'){
        //throws error if writeStream is not type of object.
        throw new Error(writeStream+" must be a object!");
    }
    if(fs.statSync(file).isDirectory()){
        //throws error if file is a directory.
        throw new Error(file+" must a directory!");
    }   
    /* error handling */

    //reading file
    let readStream = fs.createReadStream(file);
    //making hash
    let hash_sha1 = crypto.createHash('sha1');
    let hash_md5 = crypto.createHash('md5');
    readStream.on('data',(chunk)=>{
        hash_sha1.update(chunk);
        hash_md5.update(chunk);
    }).on('end',()=>{
        let final_hash_sha1 = hash_sha1.digest('hex');
        let final_hash_md5 = hash_md5.digest('hex');
        //writing into writeable stream
        writeStream.write(file+" "+final_hash_sha1+" "+final_hash_md5+"\n");
    }
    );
  
}
module.exports ={
    crawlTextFiles
}