import mongoose from "mongoose";

// Connect the application to Mongo DB
const connectDB = (url) => {
  mongoose.set("strictQuery", true); // useful when working with search functionality.
  /**
   * The strict option, (enabled by default), ensures that
   * values passed to our model constructor that were not specified in our schema
   * do not get saved to the db.
   */

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected."))
    .catch((err) => console.log(err));
};

export default connectDB;
