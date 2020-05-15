require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");

const app = express();

app.use(formidable());

app.use(cors());

const charactersRoute = require("./Routes/characters-route");
const comicsRoute = require("./Routes/comics-route");
const characterIdRoute = require("./Routes/character-id");
const characterSearchRoute = require("./Routes/characterSearch-route");
const comicSearchRoute = require("./Routes/comicSearch-route");
app.use(characterIdRoute);
app.use(charactersRoute);
app.use(comicsRoute);
app.use(characterSearchRoute);
app.use(comicSearchRoute);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("server started");
});
