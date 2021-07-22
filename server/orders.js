import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';
import { ObjectId } from 'mongodb';

export async function addOrder(request, response) {
  const books = useDatabase().collection('order');
  try {
    const insertionResult = await books.insertOne(request.body);
    if (isUndefined(insertionResult)) {
      response.status(409).send();
      return;
    }
    if (process.env.NODE_ENV === 'DEV') {
      console.debug('Inserted the following order to the database');
      console.debug(request.body);
    }
    response.status(201).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function serveOrders(request, response) {
  const books = useDatabase().collection('order');
  let queryObj = {};
  if (process.env.NODE_ENV !== 'DEV') {
    queryObj = {user: new ObjectId(request.locals.senderId)};
  }
  try {
    const queryResults = await books.find(queryObj).toArray();
    response.status(200).json(queryResults).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
