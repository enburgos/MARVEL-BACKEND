require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le serveur de MARVEL" });
});

app.get("/comics", (req, res) => {
  axios
    .get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?" +
        process.env.API_KEY
    )
    .then((response) => {
      let validData = response.data;
      res.json({ validData });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/characters", (req, res) => {
  axios
    .get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?" +
        process.env.API_KEY
    )
    .then((response) => {
      let validData = response.data;
      res.json({ validData });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.all("*", (req, res) => {
  res.json({ message: "Page introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log("Server MARVEL started");
});
