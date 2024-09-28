import mongoose from "mongoose";

let connected = false;

const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDb is connected.");
    return;
  }

  try {
    mongoose.connect(process.env.MONGO_URI as string);
    connected = true;
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;
