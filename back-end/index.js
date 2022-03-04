require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

const router = require("./src/routes");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.send({
    message: "Hello World",
  });
});

// cloudinary.config({
//   cloud_name: "falovi",
//   api_key: "845943751721338",
//   api_secret: "Se_8xR0phMVsh_xxRlYVcAZAlts",
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
