import { isUndefined } from './utils.js';
import jwt from 'jsonwebtoken';

const WEEK_IN_SECONDS = 604800;

/*
 * Authenticates the user by verifying if it has a signed jwt token.
 * It will pass the users id and if it is an administrator through 
 * request.locals to the next middleware.
 */
export function authenticate(request, response, next) {
  console.log(request)
  console.log(request.cookies);
  if (!isUndefined(request.cookies.accessToken)) {
    try {
      const token = jwt.verify(request.cookies.accessToken, process.env.JWT_PRIVATE_KEY);
      if (isUndefined(token)) {
        response.status(401).send();
        console.warn('Detected invalid authentication token.');
        return;
      } else {
        request.locals = {
          ...request.locals,
          senderId: token.id,
          senderIsAdmin: token.isAdmin
        }
        next();
      }
    } catch (error) {
      response.status(500).send();
      console.error(error);
    }
  } else {
    response.status(401).send();
    console.warn('Detected unauthentiaced access attempt.')
  }
}

/*
 * Generates a jwt token for the user.
 * It must receive the users id and if it is an administrator through
 * request.locals.
 */
export function generateAuthentication(request, response) {
  const token = jwt.sign(
    {id: request.locals.userId, isAdmin: request.locals.userIsAdmin},
    process.env.JWT_PRIVATE_KEY,
  );
  response.cookie('accessToken', token, {
    httpOnly: true,
    maxAge: WEEK_IN_SECONDS,
    path: '/'
  }).status(200).json({
    authenticated: true,
    isAdmin: request.locals.userIsAdmin
  }).send();
  console.debug('Finished setting the authentication token.');
  console.debug({id: request.locals.userId, isAdmin: request.locals.userIsAdmin});
}

export function serveAuthenticationStatus(request, response) {
  response.status(200).json({
    authenticated: true,
    isAdmin: request.locals.senderIsAdmin
  }).send();
}
