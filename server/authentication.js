import { isUndefined } from './utils.js';
import jwt from 'jsonwebtoken';

const WEEK_IN_SECONDS = 604800;

/*
 * Authenticates the user by verifying if it has a signed jwt token.
 * It will pass the users id and if it is an administrator through 
 * request.locals to the next middleware.
 */
export async function authenticate(request, response, next) {
  if (process.env.NODE_ENV === 'DEV') {
    console.log("DEV mode");
    next();
    return;
  }
  if (!isUndefined(request.cookies.accessToken)) {
    try {
      const token = jwt.verify(request.cookies.access_token, process.env.JWT_PRIVATE_KEY);
      if (isUndefined(token)) {
        response.status(401).send();
        console.warn('Detected invalid authentication token.');
        return;
      } else {
        request.locals.senderId = token.id;
        request.locals.senderIsAdmin = token.isAdmin;
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
  jwt.sign(
    {id: request.locals.userId, isAdmin: request.locals.userIsAdmin},
    process.env.JWT_PRIVATE_KEY,
    {expiresIn: WEEK_IN_SECONDS}
  ).then((token) => {
    if (process.env.NODE_ENV === 'DEV') {
      console.debug(`generated the token ${token}`)
    }
    response.cookie('accessToken', token, {
      httpOnly: true,
    }).status(200).json({
      authenticated: true,
      isAdmin: tokenContent.isAdmin
    }).send();
  }).catch((error) => {
    response.status(500).send();
    console.error(`[Error] ${error}`);
  });
}
