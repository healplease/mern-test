import express from 'express';
import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@database:27017/${process.env.MONGO_DATABASE}`);

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
