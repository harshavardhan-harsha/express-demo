const express = require("express");
const app = express();
const path = require("path");

// body parser
app.use(express.json({ extended: false }));

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to Express server");
});

app.use("/api/students", require("./routes/api/students"));

const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
