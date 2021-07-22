import bcrypt from 'bcrypt';
import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';

export async function createNewUser(request, response, next) {
  if (process.env.NODE_ENV === 'DEV') {
    console.debug(request.body);
  }
  const users = useDatabase().collection('users');
  const queryObj = {email: request.body.email};
  try {
    const queryResult = await users.findOne(queryObj, {_id: 1});
    if (!isUndefined(queryResult)) {
      response.status(409).json({message: "Um usuário com esse email já existe"});
      return; 
    }
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(request.body.password, salt);
    const insertionResult = await users.insertOne({
      ...request.body,
      password: hash
    });
    console.info(`Creted the new user with the id ${insertionResult.insertedId}`);
    request.locals = {
      ...request.locals,
      userId: insertionResult.insertedId.toHexString(),
      userIsAdmin: request.body.isAdmin
    }
    next();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function updateUserInfo(request, response, next) {
  const usersCollection = useDatabase().collection('users')
  try {
    const queryResult = await usersCollection.find(
      {_id: request.locals.senderId},
      {_id: 1}
    );
    if (isUndefined(queryResult)) {
      response.status(500);
      console.error('Authenticated a user that does not exist in the system.');
      return;
    }
    let record = request.body;
    if (isUndefined(record.password)) {
      const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
      const hash = await bcrypt.hash(request.locals.userRecord.password, salt);
      record.password = hash;
    }
    const updateResult = await usersCollection.update({id: request.senderId}, record);
    console.info(`Updated ${updateResult.nModified}`);
    next();
  } catch (error) {
    response.status(500);
    console.error(error);
  }
} 

export async function verifyCredentials(request, response, next) {
  const users = useDatabase().collection('users');
  const queryObj = {email: request.body.email};
  const options = {projection: {id: 1, password: 1, isAdmin: 1}};
  try {
    const queryResult = await users.findOne(queryObj, options);
    console.log(queryResult);
    if (isUndefined(queryResult)) {
      response.status(401).send();
      if (process.env.NODE_ENV === 'DEV') {
        console.debug('Attempt to login failed.');
      }
      return;
    }
    if (await bcrypt.compare(request.body.password, queryResult.password)) {
      console.log(queryResult);
      request.locals = {
        ...request.locals,
        userId: queryResult._id.toHexString(),
        userIsAdmin: queryResult.isAdmin
      };
      console.log(request.locals);
      next();
    }
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
