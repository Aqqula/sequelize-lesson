const express = require("express");
const router = require("./routes");
const { handleError } = require("./middlewares/handleError");

const app = express();

app.use(express.static("public"));
app.use(express.json());

// http://localhost:3000/api
app.use("/api", router);

app.use(handleError);

module.exports = app;
