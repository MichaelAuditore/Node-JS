const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * this function will find an asset
 * @param {String} name 
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, name);
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, { encoding: 'utf-8' }, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result)
      }
    })
  })
}

/**
 * this function appends to hi_log.txt
 * @param {String} str 
 */
const appendToFile = (str) => {
  return new Promise((resolve, reject) => {
    fs.appendFile('hi_log.txt', str, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result)
      }
    });
  });
}
/**
 * updateFile - function to replace the content of hi_log.txt
 * @param {String} str 
 */
const updateFile = (str) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('hi_log.txt', str, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result)
      }
    });
  });
}


/**
 * deleteFile - deletes hi_log.txt from disk
 */
const deleteFile = () => {
  return new Promise((resolve, reject) => {
    fs.unlink('hi_log.txt', (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result)
      }
    });
  });
}

/**
 * doOnRequest - auto run when user connects to my server and retrieve the data to the client
 * @param {*} request 
 * @param {*} response 
 */
async function doOnRequest(request, response) {
  // Send back a message saying "Welcome to Twitter"
  // code here...
  /* response.end("Welcome to Twitter") */

  if (request.method === "GET" && (request.url === "/" || request.url === "/style.css")) {
    if (request.url === "/") {
      response.end(await findAsset('index.html'));
    } else {
      response.end(await findAsset('style.css'));
    }

  }
  else if (request.method === "POST" && request.url === "/sayHi") {
    appendToFile('Somebody said hi.\n');
    response.end('hi back to you!');
  }
  else if (request.method === "POST" && request.url === "/greeting") {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body).toString() + '\n';
        appendToFile(body);
        if (body === 'hello\n')
          response.end('hello there!');
        else if (body === "what's up\n")
          response.end('the sky');
        else
          response.end('good morning');
      });
  }
  else if (request.method === "PUT" && request.url === "/update") {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body).toString() + '\n';
        updateFile(body);
        response.end('Update Succesfully');
      });
  }
  else if (request.method === "DELETE" && request.url === "/delete") {
    deleteFile();
    response.end('Deleted file succesfully');
  }
  else {
    response.statusCode = 404;
    response.statusMessage = "Error: Not Found.";
    response.end();
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
