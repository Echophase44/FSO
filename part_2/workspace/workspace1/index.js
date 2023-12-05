require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
app.use(cors());
app.use(express.static("dist"));

let notes = [
  {
    id: 1,
    content: "HTML is king",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World</h1>");
// });

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//route for fetching a single resource ####### Old Way ###################
// app.get("/api/notes/:id", (request, response) => {
//   //console.log(request.headers) for debugging
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end(); //if no note is found, this will trigger
      }
    })

    // .catch((error) => {
    //   console.log(error);
    //   response.status(400).send({ error: "malformatted id" });
    // });
    .catch((error) => next(error));
});

// The old way
// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.param.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// ############### old way of making notes #####################
// app.post("/api/notes/", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "Content missing.",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  //const body = request.body;
  const { content, important } = request.body;

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // };

  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, reqeust, response, next) => {
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
app.use(errorHandler); // has to be the last loaded middleware

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
