import { MongoClient, type MongoClientOptions, type Db } from "mongodb";

const options: MongoClientOptions = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

function getMongoUriOrThrow(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI. Add it to .env.local (recommended) or your hosting provider env vars."
    );
  }
  return uri;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(getMongoUriOrThrow(), options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production we still create a single promise per module instance,
  // but the missing-env error is thrown lazily when the API route calls getMongoClient().
  clientPromise = Promise.resolve().then(() => {
    const client = new MongoClient(getMongoUriOrThrow(), options);
    return client.connect();
  });
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export function getMongoDbName(): string {
  // If your connection string doesn't include a database path, Mongo defaults to "test".
  // We prefer an explicit DB name for clarity.
  return process.env.MONGODB_DB || "unifiedtech";
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(getMongoDbName());
}
