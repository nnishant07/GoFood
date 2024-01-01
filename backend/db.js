const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nnishant0710:Nishant%400710@cluster0.bvygsz6.mongodb.net/GoFood?retryWrites=true&w=majority';

main().catch(err => console.error(err));

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected");

    // Get reference to the 'food_items' collection
    const foodItemsCollection = await mongoose.connection.collection("food_items");
    const foodCategoryCollection = await mongoose.connection.collection("food_category");
    // Fetch all data from the 'food_items' collection
    const data = await foodItemsCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();
    // Log the fetched data

    global.food_items=data;
    global.food_category=catData;

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = main;
