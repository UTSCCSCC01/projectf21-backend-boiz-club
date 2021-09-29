require("dotenv").config();
const morgan = require("morgan");
const routes = require("./routes");
const express = require("express");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("./error/api-error-handler");
require("dotenv/config");

const server = express();

const port = process.env.SERVER_PORT;
const username = process.env.DB_USER;
const passwd = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const dbURI = `mongodb+srv://${username}:${passwd}@data.psveh.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// Set up database and server connection
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(port, () => {
      console.log("We are live on " + port);
    })
  )
  .catch((err) => console.error("Failed to connect to database.", err));

// Middleware
server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.json());

// Routes
routes(server);

// Error handling
server.use(errorHandler);
