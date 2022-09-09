const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

  const fruit = new Fruit({
    name: "Apple",
    rating: 6,
    review: "Pretty solid as a fruit"
  });

  const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit"
  });

  const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "Average fruit"
  });

  const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Amazing fruit"
  });

  Fruit.insertMany([pineapple, orange, banana], function(err){
    if(err){
      console.log(err);
    }else{
      console.log("successfully saved!");
    }
  });

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: "Amy",
    agr: 12,
    favouriteFruit: pineapple
  });

  const person2 = new Person({
    name: "John",
    agr: 32,
    favouriteFruit: orange
  });

  const person3 = new Person({
    name: "Kate",
    agr: 22,
    favouriteFruit: banana
  });

  Person.insertMany([person2, person3], function(err){
    if(err){
      console.log(err);
    }else{
      console.log("successfully saved!");
    }
  });

  await mongoose.connection.close();
}
