const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)

  .then((result) => {
    console.log("Connected to Database");
  })

  .catch((error) => {
    console.log("error connecting to Database:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        if (/^[0-9]{2,3}-[0-9]{1,}$/.test(value)) {
          console.log("The number is good");
        }
      },
      message: (props) => `${props.value} is not a valid number`,
    },
    minLength: 8,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
