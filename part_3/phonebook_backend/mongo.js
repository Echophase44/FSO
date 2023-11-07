//3.13 - 3.14
// change fetching so it's fetched from the database
//verify frontend works after changes
//move mongo.js into it's own module

//Change backend so numbers are saved to the database + verify frontend still working
// Note: I can ignore whether there is already a person in the database with the same name

// const password = process.argv[2];
// const newName = process.argv[3];
// const newNumber = process.argv[4];

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model("People", personSchema);

// if (newName && newNumber) {
//   const person = new Person({
//     name: newName,
//     number: newNumber,
//   });

//   person.save().then((result) => {
//     console.log(`Added ${newName} number ${newNumber} to the phonebook.`);
//     mongoose.connection.close();
//   });
// }

// if (password && !newName && !newNumber) {
//   Person.find({}).then((result) => {
//     console.log("phonebook:");
//     result.forEach((person) => {
//       console.log(person.name, person.number);
//     });
//     mongoose.connection.close();
//   });
// }
