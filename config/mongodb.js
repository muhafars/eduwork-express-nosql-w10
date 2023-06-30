const { MongoClient } = require("mongodb");
const portDb = "localhost:27017";
const url = `mongodb://muhafars:1@${portDb}?authSource=admin`;
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB ");
  } catch (err) {
    console.log(err);
  }
})();

const db = client.db("eduwork-mongodb");

module.exports = db;
