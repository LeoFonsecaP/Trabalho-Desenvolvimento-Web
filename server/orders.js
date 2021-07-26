import { useDatabase } from "./database.js";
import { isUndefined } from "./utils.js";
import { ObjectId } from "mongodb";

export async function addOrder(request, response) {
  const orders = useDatabase().collection("orders");
  const users = useDatabase().collection("users");
  const books = useDatabase().collection("books");
  const id = ObjectId(request.locals.senderId);
  try {
    const user = await users.findOne({ _id: id }, { _id: 0, email: 1 });
    const email = user.email;
    const insertionResult = await orders.insertOne({
      ...request.body,
      email,
    });
    if (isUndefined(insertionResult)) {
      response.status(409).send();
      return;
    }
    const booksQuery = {
      _id: {$in: request.body.itens.map(ObjectId)}
    }
    const booksBought = await books.find(
      booksQuery,
      {_id: 1, availableQuantity: 1, soldQuantity: 1}
    ).toArray();
    console.log(booksBought);
    const updateResults = await books.updateMany(booksQuery, updateOperation);
    if (isUndefined(updateResults) || updateResults.modifiedCount === 0) {
      response.status(404).send();
    }
    response.status(201).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function serveOrders(request, response) {
  const orders = useDatabase().collection("orders");
  try {
    const queryResults = await orders.find({}).toArray();
    response.status(200).json(queryResults);
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
