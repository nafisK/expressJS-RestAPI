// imports
const express = require("express");
const Joi = require("joi");

// initializations
const app = express();

// middleware
app.use(express.json());

// data stores | would normally be stored in databases
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

/**
 * C R U D
 * CREATE - POST
 * READ - GET
 * UPDATE - PUT
 * DELETE - DELETEETE
 */

// Home URL
app.get("/", (req, res) => {
  res.send("<h1 style='color:red; text-align: center;'>Backend Home!</h1>");
});

/** CRUD STARTS HERE **/

// Creates new post using URL
app.post("/api/courses", (req, res) => {
  // object destructuring for error handling
  const { error } = validateCourse(req.body);

  // printing error if found
  if (error) return res.status(400).send(result.error.details[0].message);

  // increments to a new id and sets the body received as new name
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  // new course data us pushed to db
  courses.push(course);

  // response is sent back
  res.send(course);
});

// Returns all the courses in database
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Returns course with specific id
app.get("/api/courses/:id", (req, res) => {
  // searches for course with id
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  // if course not found, send 404 not found error
  if (!course)
    return res.status(404).send(`Course with id ${req.params.id} not found.`);

  // returns course found
  res.send(course);
});

// Updates course with new name
app.put("/api/courses/:id", (req, res) => {
  // search for id in courses db
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  // if course not found, send 404 not found error
  if (!course)
    return res.status(404).send(`Course with id ${req.params.id} not found.`);

  // object destructuring
  const { error } = validateCourse(req.body);
  // error validating url given
  if (error) return res.status(400).send(result.error.details[0].message);

  // updating course found with new body
  course.name = req.body.name;

  // sending the updated course back
  res.send(course);
});

// Deletes course with specific id
app.delete("/api/courses/:id", (req, res) => {
  // search for id in courses db
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  // if course not found, send 404 not found error
  if (!course)
    return res.status(404).send(`Course with id ${req.params.id} not found.`);

  // gets the index of the course found
  const index = courses.indexOf(course);

  // removes 1 course at index
  courses.splice(index, 1);
  // return course if there
  res.send(course);
});

// Validates irl body using Joi
let validateCourse = (course) => {
  // creates a JOI object with correct structure/schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // returns and uses schema to validate input
  return schema.validate(course);
};

/**
 * SET PORT VALUE IN TERMINAL COMMAND: export port=9999
 */


// using environment saved in global process object or 3000
const port = process.env.PORT || 3000;
// listens for a response
app.listen(port, () => console.log(`Listening on port ${port}...`));
