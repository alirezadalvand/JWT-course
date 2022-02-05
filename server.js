const express = require("express");
const app = express();
const post  = require("./routes/post");
const auth = require("./routes/auth");
require("dotenv").config();
app.use(express.json());
app.use("/auth", auth);
app.use("/posts", post);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port : ${process.env.PORT} `);
});
