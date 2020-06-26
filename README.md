CLI (npm)

    location - /cli
    commands
        new - node /cli/index.js new
        list - node /cli/index.js list

Creating a CLI program that saves and retrieves contacts from and address book.

Some things to take in count, to test my proyect

    install all remote modules (hint: use npm)
    check the README on how to run your CLI

Probably some modules are missing, you need to install it manually

API (async code)

    location - /api
    commands
        start the server - node /api/server.js

Creating and refactoring a simple static asset server. I have some assets and routes to get a functional view in browser.

Some things to take in count, to test my proyect

    install all remote modules (hint: use npm)
    check the README on how to run your server
    refactor the sync file reading code to be async with a callback, promise, or async await
    prevent the server from crashing when an assets is not found. Instead, respond with a 404 status code
    create some sort of router logic to handle incoming requests for assets

Debugging & Testing

    location - /testing
    commands
        start the server - node /testing/index.js
        test - npm test or yarn test or npx jest

Creating some test for my application, using express module to create an API in easier way, creating points for methods GET and DELETE
Creating an array of fake data to simulate a db and do transactions via API.

SecondServer (npm)

My second Server implements an API, a crud with HTTP methods into a file storage

    node_modules - necessary modules to run the project
    hi_log.txt - LocalStorage to save API.
    index.html - Simple HTML to retrieve in the first GET HTTP request.

streams (npm)

Enjoy converting a poem in a readable stream, converting some expressions into text as :) | :( for understandable for human

    through2 - module to replace characters inside a string
    fs - creating readable and writable string.
