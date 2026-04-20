import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

if (!uri) {
  throw new Error("Please add MONGODB_URI in .env file");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // prevent multiple connections in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function dbConnect(collectionName) {
  const client = await clientPromise;
  return client.db(dbName).collection(collectionName);
}

// export collections properly
export const collections = {
  PRODUCTS: "products",
  USERS:"users"
};