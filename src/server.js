// import packages
const http = require('http'); // basic http functions
const url = require('url'); // extended functions for urls
const querystring = require('querystring'); // extented support for querystrings

// import scripts
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Set port to Heroku's env variables, or fallback to port 3000
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// url struct
// key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

// onrequest
const onRequest = (request, response) => {
  // console.dir(request.url);

  const parsedUrl = url.parse(request.url);
  const params = querystring.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  // check if entered url is in our struct, else give notfound
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

// start server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
