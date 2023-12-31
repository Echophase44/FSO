// require("dotenv").config();
// const express = require("express");
// const morgan = require("morgan");
// const app = express();
// const cors = require("cors");
// const Person = require("./models/person");

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :data")
// );
// app.use(express.json());
// app.use(cors());
// app.use(express.static("dist"));

// morgan.token("data", function (req, res) {
//   return JSON.stringify(req.body);
// });

// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((people) => {
//     response.json(people);
//   });
// });

// app.get("/info", (request, response) => {
//   const date = Date();
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people.</p> <p>${date}</p>`
//   );
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

// const generateId = () => {
//   return Math.random() * 1000000000;
// };

// app.post("/api/persons/", (request, response) => {
//   const body = request.body;
//   let nameTaken = false;
//   persons.forEach((person) => {
//     if (person.name === body.name) {
//       nameTaken = true;
//     }
//   });

//   if (nameTaken) {
//     return response.status(400).json({
//       error: "This name is already taken.",
//     });
//   }

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "No content found.",
//     });
//   }

//   const newPerson = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//   };

//   persons = persons.concat(newPerson);
//   response.json(newPerson);
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
