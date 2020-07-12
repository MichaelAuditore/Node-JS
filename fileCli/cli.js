#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const through = require("through2");
const zlib = require("zlib");
const CAF = require("caf");

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'buffer', 'upper', 'reverse', 'in', 'out', 'compress', 'uncompress'],
    string: ['file'],
    alias: {
        h: 'help',
        f: 'file',
        b: 'buffer',
        u: 'upper',
        r: 'reverse',
        i: 'in',
        o: 'out',
        c: 'compress',
        d: 'uncompress'
    },
});


processFile = CAF(processFile);

const BASE_PATH = path.resolve(__dirname || process.env.BASE_PATH);
let OUTFILE = path.join(BASE_PATH, "out.txt");

/**
 * streamComplete - promise to return when processFile function was executed correctly
 * @param {*} stream 
 */
function streamComplete(stream) {
    return new Promise(function c(res) {
        stream.on("end", res);
    });
}

/**
 * showHelp - displays a list of commands used to get some info
 */
function showHelp() {
    console.log("you should use some command like this:");
    console.log(" cli.js    --help -h");
    console.log("----------------------");
    console.log("    displays help");
    console.log("----------------------");
    console.log("  cli.js    --upper -u");
    console.log("----------------------");
    console.log("    converts file's info to upper");
    console.log("----------------------");
    console.log("  cli.js    --reverse -r");
    console.log("----------------------");
    console.log("    converts file's info to reversed string");
    console.log("----------------------");
    console.log("  cli.js    --buffer -b");
    console.log("----------------------");
    console.log("    converts file's info to a buffer");
    console.log("----------------------");
    console.log("  cli.js    --file='filename' --file 'filename' --f 'filename' -f 'filename'");
    console.log("----------------------");
    console.log("    displays file's info");
    console.log("----------------------");
    console.log(" cli.js     --in, -, -i");
    console.log("----------------------");
    console.log("    process stdin");
    console.log("----------------------");
    console.log(" cli.js     --out, -o");
    console.log("----------------------");
    console.log("    process stdout");
    console.log("----------------------");
    console.log(" cli.js     --compress, -c");
    console.log("----------------------");
    console.log("    gzip the output");
    console.log("----------------------");
    console.log(" cli.js     --uncompress, -d");
    console.log("----------------------");
    console.log("    un-gzip the input");
    console.log("----------------------");
}

/**
 * error - displays an error when a command is invalid
 * @param {string} msg 
 * @param {boolean} help 
 */
function error(msg, help = false) {
    console.log(msg);
    if (help) { showHelp(); }
}

/**
 * toUpper - converts by chunks to uppercase
 * @param {*} buffer 
 * @param {*} enc 
 * @param {*} cb 
 */
function toUpper(buffer, enc, cb) {
    this.push(buffer.toString().toUpperCase());
    cb();
}

/**
 * toBuffer - print by chunks to stdout using console.log
 * @param {*} buffer 
 * @param {*} enc 
 * @param {*} cb 
 */
function toBuffer(buffer, enc, cb) {
    this.push(console.log(buffer));
    cb();
}

/**
 * toReverse - reads by chunks and reverse each one to prepare the new string will be printed to stdout
 * @param {*} buffer 
 * @param {*} enc 
 * @param {*} cb 
 */
function toReverse(buffer, enc, cb) {
    this.push(buffer.reverse());
    cb();
}

/**
 * processFile - prints content to stdout
 * @param {string} contents 
 */
function* processFile(signal, contents) {
    let targetStream;



    if (args.uncompress) {
        let gunzipStream = zlib.createGunzip();
        contents = contents.pipe(gunzipStream);
    }

    if (args.upper) { contents = contents.pipe(through(toUpper)) }
    if (args.buffer) { contents.pipe(through(toBuffer)); return; }
    if (args.reverse) { contents = contents.pipe(through(toReverse)); }

    if (args.compress) {
        let gzipStream = zlib.createGzip();
        contents = contents.pipe(gzipStream);
        OUTFILE = `${OUTFILE}.gz`;
    }

    if (args.out) {
        targetStream = process.stdout;
    } else {
        targetStream = fs.createWriteStream(OUTFILE);
    }
    contents.pipe(targetStream);

    signal.pr.catch(() => {
        contents.unpipe(targetStream);
        contents.destroy();
    })

    yield streamComplete(contents);
}

if (args.file) {
    const content = fs.createReadStream(path.join(BASE_PATH, args.file));

    let cancelationToken = CAF.timeout(10, "Took too long!");
    processFile(cancelationToken, content)
        .then(() => {
            console.log("\nComplete!");
        })
        .catch(error);
} else if (args.help) {
    showHelp();
} else if (args.upper || args.reverse || args.buffer && !args.file) {
    error("You're given a file doesn't exists");
} else if (args.in || args._.includes('-')) {
    let cancelationToken = CAF.timeout(10, "Took too long!");
    processFile(cancelationToken, process.stdin)
        .catch(error);
} else {
    error("Command Invalid", true);
}