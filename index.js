const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

// code for middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running Perfectly");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
