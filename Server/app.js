const express = require("express");
const dotenv = require("dotenv");
const db = require("../Server/db/config");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = process.env.PORT || 3001;

const startServer = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("DB connected successfully.");
  } catch (error) {
    console.log("Error connecting database.", error);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

startServer();