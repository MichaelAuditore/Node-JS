const fs = require('fs');
const through = require('through2');

/* Creating a read stream here */
const readPoemStream = fs.createReadStream('on-joy-and-sorrow-emoji.txt');
/* Creating a write stream here
*/
const writePoemStream = fs.createWriteStream('on-joy-and-sorrow-fixed.txt');
/* EXTENSION: Creating a transform stream (modify the read stream before piping to write stream)
*/
function replaceChars(buffer, enc, next) {
    //Regex expression to replace it into the string
    let text = buffer.toString();
    text = text.replace(/:\)/gi, 'joy');
    text = text.replace(/:\(/gi, 'sorrow');
    this.push(text);
    next();
};
const transformStream = through(replaceChars);
readPoemStream.pipe(transformStream).pipe(writePoemStream);