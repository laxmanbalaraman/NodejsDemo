const Joi = require("joi");
const express = require("express");
const app = express();

// parse json
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// params when madatory info is needed from client
// query string when option info is need from client

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course)
    res.status(404).send("Course with the given course id not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  // console.log(result);
  const error = inputValidate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course)
    res.status(404).send("Course with the given course id not found");

  const error = inputValidate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

function inputValidate(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const { error } = Joi.validate(course, schema);
  return error;
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
