const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./middlewares/error");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");
const reviewRouter = require("./routes/review");

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);
app.use("/api/review", reviewRouter);

app.use(errorHandler);
app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});
