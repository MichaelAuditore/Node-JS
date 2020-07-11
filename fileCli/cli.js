#!/usr/bin/env node
const util = require("util");
const fs = require("fs");
const path = require("path");
const through = require("through2");

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'buffer', 'upper', 'reverse', 'in'],
    string: ['file'],
    alias: {
        h: 'help',
        f: 'file',
        b: 'buffer',
        u: 'upper',
        r: 'reverse',
    },
});

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
    console.log(" cli.js     --in, -");
    console.log("----------------------");
    console.log("    process Data from stdin and displays in stdout");
    console.log("----------------------");
}

/**
 * showInfoInsideFile - displays specific file's info
 * @param {string} filename 
 */
function showInfoInsideFile(filename) {
    const content = fs.createReadStream(path.join(__dirname, filename));
    processFile(content);
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
function processFile(contents) {
    if (args.upper) { contents = contents.pipe(through(toUpper)) }
    if (args.buffer) { contents.pipe(through(toBuffer)); return; }
    if (args.reverse) { contents = contents.pipe(through(toReverse)); }
    contents.pipe(process.stdout);
}

if (args.file) {
    showInfoInsideFile(args.file);
} else if (args.help) {
    showHelp();
} else if (args.upper || args.reverse || args.buffer && !args.file) {
    error("You're given a file doesn't exists");
} else if (args.in || args._.includes('-')) {
    processFile(process.stdin);
} else {
    error("Command Invalid", true);
}