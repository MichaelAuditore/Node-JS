CLI to open files and read inside them.

also you can manipulate the data to get some changes of file's info

### Installation

    use this command to get the necessary files to use it
      `git clone https://github.com/MichaelAuditore/Node-JS`

    Use `npm install` inside the directory fileCli to get all dependencies and avoid errors

### Using

    you should start using the command line with some of these commands:
        `node cli.js`
        `./cli.js`

### Commands

    cli.js --help -h
    ---------------------- displays help ----------------------

    cli.js --upper -u
    ---------------------- converts file's info to upper ----------------------

    cli.js --reverse -r

    ---------------------- converts file's info to reversed string ----------------------
    cli.js --buffer -b

    ----------------------  converts file's info to a buffer ----------------------
    cli.js --file='filename' --file 'filename' --f 'filename' -f 'filename'
    ----------------------    displays file's info   ----------------------

    cli.js --out -o
    ----------------------    process stdout   ----------------------

    cli.js --in -i
    ----------------------    process stdin   ----------------------

    cli.js --compress -c
    ----------------------    gzip the output   ----------------------

    cli.js --uncompress -d
    ----------------------    un-gzip the input   ----------------------

### Author

Created by **Miguel Angel Parada Cañon**
