const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload");

const userRouter = require("./Routes/userRoutes");
const venderRouter = require("./Routes/venderRoutes");
const proposalsRouter = require("./Routes/proposalsRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: "https://events-proposals-paage.netlify.app",
  credentials: true
}));
app.use(fileupload({
  useTempFiles: true
}));

app.use("/api", userRouter);
app.use("/api", venderRouter);
app.use("/api", proposalsRouter);

app.listen(PORT, () => console.log(`App Listening on Port ${PORT}`));

mongoose.connect(process.env.MONGO_DBCONNECTION,{
     useUnifiedTopology:true,
     useNewUrlParser:true
  }).then(()=>console.log("DataBase Connected SuccessFully"))
