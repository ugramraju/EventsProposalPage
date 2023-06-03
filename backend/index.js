const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv").config();
const cors = require("cors");
const fileupload = require("express-fileupload");

const userRouter = require("./Routes/userRoutes");
const venderRouter = require("./Routes/venderRoutes");
const proposalsRouter = require("./Routes/proposalsRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(fileupload({
  useTempFiles: true
}));

app.use("/api", userRouter);
app.use("/api", venderRouter);
app.use("/api", proposalsRouter);

mongoose.connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => console.log(`App Listen On Port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
