import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';

export async function addOrder(request, response) {
  const orders = useDatabase().collection('orders');
  try {
      console.log(request.body);
    const insertionResult = await orders.insertOne(request.body);
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
