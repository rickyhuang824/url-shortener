const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Servering is listening on port ${process.env.PORT || 5000}`);
});
