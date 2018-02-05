// function to send JSON object
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  if (type === 'application/json') {
    response.write(JSON.stringify(content));
  } else {
    response.write(content);
  }
  response.end();
};

// successful request
const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

    // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, acceptedTypes[0]);
  }

  // send 200 Success
  return respond(request, response, 200, responseJSON, 'application/json');
};

// bad request
const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

    // if there is missing or invalid query parameter, send 400 Bad Request
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    // if the client's most preferred type (first option listed)
    // is xml, then respond with xml instead
    if (acceptedTypes[0] === 'text/xml') {
    // TODO
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
      responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 400, responseXML, acceptedTypes[0]);
    }

    return respond(request, response, 400, responseJSON, 'application/json');
  }

  // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, acceptedTypes[0]);
  }

  // otherwise send 200 Success
  return respond(request, response, 200, responseJSON, 'application/json');
};

// unauthorized
const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

    // if there is missing or invalid query parameter, send 401 Forbidden
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    // if the client's most preferred type (first option listed)
    // is xml, then respond with xml instead
    if (acceptedTypes[0] === 'text/xml') {
    // TODO
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
      responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 401, responseXML, acceptedTypes[0]);
    }

    return respond(request, response, 401, responseJSON, 'application/json');
  }

  // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, acceptedTypes[0]);
  }

  // otherwise send 200 Success
  return respond(request, response, 200, responseJSON, 'application/json');
};

// forbidden
const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not access to this content.',
    id: 'forbidden',
  };

    // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 403, responseXML, acceptedTypes[0]);
  }

  // send 403 Forbidden
  return respond(request, response, 403, responseJSON, 'application/json');
};

// internal error
const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

    // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 500, responseXML, acceptedTypes[0]);
  }

  // send 500 Internal Server Error
  return respond(request, response, 500, responseJSON, 'application/json');
};

// not yet implemented feature
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

    // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 501, responseXML, acceptedTypes[0]);
  }

  // send 501 Not Implemented
  return respond(request, response, 501, responseJSON, 'application/json');
};

// page not found
const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

    // if the client's most preferred type (first option listed)
  // is xml, then respond with xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // TODO
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 404, responseXML, acceptedTypes[0]);
  }

  // send 404 Not Found
  return respond(request, response, 404, responseJSON, 'application/json');
};

// create public objects
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
