import { useDatabase } from './database.js';
import { isUndefined } from './utils.js';
import { ObjectId } from 'mongodb';

export async function serveBooks(request, response) {
  try {
    const filters = request.query.filters;
    const books = useDatabase().collection('books');
    const queryObj = isUndefined(filters) ? {} : {genre: {$in: filters}};
    const queryResults = await books.find(queryObj).toArray();
    response.status(200).json(
      queryResults.map(match => {
        const id = match._id.valueOf();
        delete match._id;
        return {...match, id: id}
      })
    );
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function serveBookDescription(request, response) {
  try {
    const bookId = new ObjectId(request.params.bookId);
    const books = useDatabase().collection('books');
    const queryResults = await books.findOne({_id: bookId});
    if (isUndefined(queryResults)) {
      response.status(404).send();
      return;
    }
    response.status(200).json(queryResults);
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function updateBook(request, response) {
  try {
    const bookId = new ObjectId(request.params.bookId)
    const books = useDatabase().collection('books');
    const updateDoc = {$set: {...request.body}};
    const filter = {_id: bookId};
    const options = { upsert: false };
    if (process.env.NODE_ENV !== 'DEV' && !request.senderIsAdmin) {
      response.status(401).send();
      console.warn('Someone without credentails tried to alter a books info.');
      return;
    }
    const updateResults = await books.updateOne(filter, updateDoc, options);
    if (isUndefined(updateResults) || updateResults.modifiedCount === 0) {
      response.status(404).send();
      return;
    }
    response.status(200).send();
    console.log(`Updated ${updateResults.modifiedCount} books.`);
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function addBook(request, response) {
  const books = useDatabase().collection('books');
  if (process.env.NODE_ENV !== 'DEV' && !request.senderIsAdmin) {
    response.status(401).send();
    console.warn('Someone without credentails tried to alter a books info.');
    return;
  }
  try {
    console.log(request.body)
    const insertionResult = await books.insertOne(request.body);
    if (isUndefined(insertionResult)) {
      response.status(409).send();
      return;
    }
    if (process.env.NODE_ENV === 'DEV') {
      console.debug('Inserted the following book to the database');
      console.debug(request.body);
    }
    response.status(201).json({id: insertionResult.insertedId});
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function deleteBook(request, response) {
  try {
    const bookId = new ObjectId(request.params.bookId);
    const books = useDatabase().collection('books');
    const deleteResult = await books.deleteOne({_id: bookId});
    if (isUndefined(deleteResult) || deleteResult.deletedCount === 0) {
      response.status(404).send();
      return;
    }
    if (process.env.NODE_ENV === 'DEV') {
      console.debug(`Removed the book with id ${bookId}`);
    }
    console.log(deleteResult);
    response.status(200).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
