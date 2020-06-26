### Streams:

#### Take a look at the file created for you in `streams/streams.js`. This can be run using `npm run streams`.

1. [Readable streams](https://nodejs.org/api/stream.html#stream_readable_streams)
   - [ ] Create a readable stream to import the file `on-joy-and-sorrow-emoji.txt`
   - [ ] On the 'data' event, console.log the data received (what do you notice?)
   - [ ] How can we decode this data so it shows up in the console?
   - [ ] Update our console logs so ':)' is replaced with 'joy' and ':(' is replaced with 'sorrow'
2. [Writable streams](https://nodejs.org/api/stream.html#stream_writable_streams)
   - [ ] Create a writable stream exporting to `on-joy-and-sorrow-fixed.txt`
   - [ ] Pipe the readable stream to the writable stream
3. [Transform streams](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams) implement a readable and writable interface for modifying input from readable streams
   - [ ] Create a transform stream to modify incoming data, replacing ':)' with 'joy' and ':(' with 'sorrow'.  
          **NOTE**: The [through2](https://www.npmjs.com/package/through2) library is a useful abstraction for this (it's already been imported for you)
   - [ ] Pipe the readable stream to the transform stream you just created, and then pipe the result to the writable stream
