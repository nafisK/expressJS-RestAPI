const express = require("express");
const app = express();

// Returns Msg to listener
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// using environment saved in global process object or 3000
const port = process.env.PORT || 3000;
// listens for a response
app.listen(port, () => console.log(`Listening on port ${port}...`));
