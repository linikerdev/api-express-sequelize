require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const { formatError } = require("./utils/handler");

const port = process.env.PORT || 3333;

const cors = require("cors");

require("./database");

// routers
const routers = require("./routers");

// apply rules cors
app.use(cors());

// apply middleware default to json
app.use(express.json());

// routers
routers(app);

// middlewares handler
app.use((err, req, res, next) => {
  formatError(err, res);
});

// run to server
app.listen(port, () => console.log(`## servidor rodando na port ${port}`));
