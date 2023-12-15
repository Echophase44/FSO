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

morgan.token("data", function (req) {
  return JSON.stringify(req.body);
});

// get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// create new person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "Content Missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  //const error = person.validateSync();

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//delete person
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

//Update person
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  // const person = {
  //   name: name,
  //   number: number,
  // };

  // Person.findByIdAndUpdate(request.params.id, person, { new: true })

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));

  Person.schema.path("number").validate(function (number) {
    return /^[0-9]{2,3}-[0-9]{1,}$/.test(number);
  }, "This number doesn't work for me.");
});

//Info
app.get("/info", (request, response) => {
  const date = Date();
  Person.find({}).then((people) => {
    response.send(
      `<p>Phonebook has info for ${people.length} people.</p> <p>${date}</p>`
    );
  });
});

//Find single person
app.get("/api/persons/:id", (request, response, next) => {
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
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
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
