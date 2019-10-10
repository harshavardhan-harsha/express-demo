const express = require("express");
const app = express();

// body parser
app.use(express.json({ extended: false }));

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to Express server");
});

app.use("/api/students", require("./routes/api/students"));

const port = 8000;
const host = "127.0.0.1";

//const hostname = "0.0.0.0";

app.listen(port, () => {
  console.log(`Server running at ${host}:${port}`);
});
