import bcrypt from 'bcrypt';
import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';

export async function createNewUser(request, response, next) {
  const usersCollection = useDatabase().collection('users');
  try {
    const queryResult = await usersCollection.find({email: request.locals.userRecord.email});
    if (isUndefined(queryResult)) {
      response.status(409).json({message: "Um usuário com esse email já existe"});
      return; 
    }
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(request.locals.userRecord.password, salt);
    const insertionResult = await usersCollection.insertOne({
      ...request.locals.userRecord,
      password: hash
    });
    console.info(`Creted the new user with the is ${insertionResult.insertedId}`);
    next();
  } catch (error) {
    response.status(500);
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
  const usersCollection = useDatabase().collection('users');
  try {
    const queryResult = await usersCollection.findOne(
      {email: request.body.email},
      {id: 1, password: 1, isAdmin: 1}
    );
    if (isUndefined(queryResult)) {
      response.status(401);
      if (process.env.NODE_ENV === 'DEV') {
        console.debug('Attempt to login failed.');
      }
      return;
    }
    if (await bcrypt.compare(request.body.password, queryResult.password)) {
      request.locals.userId = queryResult._id;
      request.locals.userIsAdmin = queryResult.isAdmin;
      next();
    }
  } catch (error) {
    response.status(500);
    console.error(error);
  }
}
