const express = require("express");
const app = express();

// adding a piece of middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// Returns Msg to listener
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // error validating url given
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be 3 chars minimum.");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send(`Course with id ${req.params.id} not found.`);
  res.send(course);
});

// using environment saved in global process object or 3000
const port = process.env.PORT || 3000;
// listens for a response
app.listen(port, () => console.log(`Listening on port ${port}...`));
