import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';
import { ObjectId } from 'mongodb';

export async function addOrder(request, response) {
  const orders = useDatabase().collection('orders');
  const users = useDatabase().collection('users');
  try {
    const time = new Date();
    const email = users.findOne(
      {_id: new ObjectId(request.locals.senderId)},
      {_id: 0, email: 1}
    );
    console.log({...request.body, ...email, time: time});
      const insertionResult = await orders.insertOne({...request.body, ...email, time: time});
    if (isUndefined(insertionResult)) {
      response.status(409).send();
      return;
    }
    response.status(201).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function serveOrders(request, response) {
  const orders = useDatabase().collection('orders');
  try {
    const queryResults = await orders.find({}).toArray();
    response.status(200).json(queryResults);
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
