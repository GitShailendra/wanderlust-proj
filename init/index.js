const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data =  initData.data.map((obj)=>({
    ...obj,
    owner:"66e5535f35f14c837d16b142",
    category:"trending",
  }))
  await Listing.insertMany(initData.data);
  console.log(initData.data)
  console.log("data was initialized");
};

initDB();