// Add entries into phonebook DB
// node mongo.js yourpassword Anna 040-1234556 as the CLI functionality
// App will print "added Anna number 040-1234556 to phonebook"
//  This entry will be saved to the database, and whitespace in the entry must be enclosed in quotes, like "Arto Venheim"

//If only the password is given, program should display all database entries to the console.
const mongoose = require("mongoose");

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://nfitzgerald745:${password}@cluster0.rtfx14x.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("People", personSchema);

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then((result) => {
    console.log(`Added ${newName} number ${newNumber} to the phonebook.`);
    mongoose.connection.close();
  });
}

if (password && !newName && !newNumber) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
