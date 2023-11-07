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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
