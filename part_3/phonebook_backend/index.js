require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

// get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// create new person
app.post("/api/persons", (request, response) => {
  console.log("Received");
  console.log(request.body.name, request.body.number);
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "Content Missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

//delete person
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

//Update person
app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  console.log(person);

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

//Info
app.get("/info", (request, response) => {
  const date = Date();
  console.log(request);
  Person.find({}).then((people) => {
    response.send(
      `<p>Phonebook has info for ${people.length} people.</p> <p>${date}</p>`
    );
  });
});

//Find single person
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
