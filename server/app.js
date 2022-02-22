require("dotenv").config();
require("./config/passport");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./models");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoute);

app.use((req, res) => {
  res.status(404).json({ message: "resource not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
