const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

const sequelize = require("./config/database");

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connected to Sequelize/MYSQL");
  })
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "build")));

app.use("/api/shorts", require("./routes/shorts"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected to Server at port: ${PORT}`));
