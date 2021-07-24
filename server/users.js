import bcrypt from "bcrypt";
import { useDatabase } from "./database.js";
import { isUndefined } from "./utils.js";
import { ObjectId } from "mongodb";

export async function serveUsers(request, response) {
  try {
    const users = useDatabase().collection("users");
    const queryResults = await users.find().toArray();
    response.status(200).json(
      queryResults.map((match) => {
        const id = match._id.valueOf();
        delete match._id;
        return { ...match, id: id };
      })
    );
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function serveAdmins(request, response) {
  try {
    const users = useDatabase().collection("users");
    const queryResults = await users.find({ isAdmin: true }).toArray();
    response.status(200).json(
      queryResults.map((match) => {
        const id = match._id.valueOf();
        delete match._id;
        return { ...match, id: id };
      })
    );
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function updateUser(request, response) {
  try {
    const userId = new ObjectId(request.params.userId);
    const users = useDatabase().collection("users");
    const updateDoc = { $set: { ...request.body } };
    const filter = { _id: userId };
    const options = { upsert: false };
    if (process.env.NODE_ENV !== "DEV" && !request.senderIsAdmin) {
      response.status(401).send();
      console.warn("Someone without credentails tried to alter a books info.");
      return;
    }
    const updateResults = await users.updateOne(filter, updateDoc, options);
    if (isUndefined(updateResults) || updateResults.modifiedCount === 0) {
      response.status(404).send();
      return;
    }
    response.status(200).send();
    console.log(`Updated ${updateResults.modifiedCount} users.`);
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function deleteUser(request, response) {
  try {
    const userId = new ObjectId(request.params.userId);
    console.log(userId);
    const users = useDatabase().collection("users");
    const deleteResult = await users.deleteOne({ _id: userId });
    if (isUndefined(deleteResult) || deleteResult.deletedCount === 0) {
      response.status(404).send();
      return;
    }
    if (process.env.NODE_ENV === "DEV") {
      console.debug(`Removed the user with id ${userId}`);
    }
    console.log(deleteResult);
    response.status(200).send();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function createNewUser(request, response, next) {
  if (process.env.NODE_ENV === "DEV") {
    console.debug(request.body);
  }
  const users = useDatabase().collection("users");
  const queryObj = { email: request.body.email };
  try {
    const queryResult = await users.findOne(queryObj, { _id: 1 });
    if (!isUndefined(queryResult)) {
      response
        .status(409)
        .json({ message: "Um usuário com esse email já existe" });
      return;
    }
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(request.body.password, salt);
    const insertionResult = await users.insertOne({
      ...request.body,
      password: hash,
    });
    console.info(
      `Creted the new user with the id ${insertionResult.insertedId}`
    );
    request.locals = {
      ...request.locals,
      userId: insertionResult.insertedId.toHexString(),
      userIsAdmin: request.body.isAdmin,
    };
    next();
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}

export async function updateUserInfo(request, response, next) {
  const usersCollection = useDatabase().collection("users");
  try {
    const queryResult = await usersCollection.find(
      { _id: request.locals.senderId },
      { _id: 1 }
    );
    if (isUndefined(queryResult)) {
      response.status(500);
      console.error("Authenticated a user that does not exist in the system.");
      return;
    }
    let record = request.body;
    if (isUndefined(record.password)) {
      const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
      const hash = await bcrypt.hash(request.locals.userRecord.password, salt);
      record.password = hash;
    }
    const updateResult = await usersCollection.update(
      { id: request.senderId },
      record
    );
    console.info(`Updated ${updateResult.nModified}`);
    next();
  } catch (error) {
    response.status(500);
    console.error(error);
  }
}

export async function verifyCredentials(request, response, next) {
  const users = useDatabase().collection("users");
  const queryObj = { email: request.body.email };
  const options = { projection: { id: 1, password: 1, isAdmin: 1 } };
  try {
    const queryResult = await users.findOne(queryObj, options);
    console.log(queryResult);
    if (isUndefined(queryResult)) {
      response.status(401).send();
      if (process.env.NODE_ENV === "DEV") {
        console.debug("Attempt to login failed.");
      }
      return;
    }
    if (await bcrypt.compare(request.body.password, queryResult.password)) {
      console.log(queryResult);
      request.locals = {
        ...request.locals,
        userId: queryResult._id.toHexString(),
        userIsAdmin: queryResult.isAdmin,
      };
      console.log(request.locals);
      next();
    }
  } catch (error) {
    response.status(500).send();
    console.error(error);
  }
}
