#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = require('minimist')(process.argv.slice(2), {
    boolean: ['help'],
    string: ['file'],
    boolean: ['buffer'],
    boolean: ['upper'],
    boolean: ['reverse'],
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
}

/**
 * showInfoInsideFile - displays specific file's info
 * @param {string} filename 
 */
function showInfoInsideFile(filename, upper = false, reverse = false, buffer = false) {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
        if (err) { showFileError(); return; }
        data = data.toString();
        if (upper) { data = data.toUpperCase(); }
        if (reverse) { data = data.split("").reverse().join(""); }
        if (buffer) { data = Buffer.from(data); }

        console.log(data);
    });

}

/**
 * showFileError - displays an error when a file doesn't exists
 */
function showFileError() {
    console.log("You're given a file doesn't exists");
}

/**
 * showError - displays an error when a command is invalid
 */
function showError() {
    console.log("Command Invalid");
    showHelp();
}

if (args.file) {
    showInfoInsideFile(args.file, args.upper, args.reverse, args.buffer);
} else if (args.help) {
    showHelp();
} else if (args.upper || args.reverse || args.buffer && !args.file) {
    showFileError();
} else {
    showError();
}