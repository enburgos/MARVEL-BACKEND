require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");
const API_KEY = process.env.API_KEY;

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le serveur de MARVEL" });
});

app.get("/comics", (req, res) => {
  axios
    .get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${API_KEY}`)
    .then((response) => {
      let validData = response.data;
      res.json({ validData });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "erreur mon ti pere" });
    });
});

app.get("/characters", (req, res) => {
  axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${API_KEY}`
    )
    .then((response) => {
      let validData = response.data;
      res.json({ validData });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "erreur mon ti pere" });
    });
});

app.get("/comics/:id", (req, res) => {
  console.log(
    `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${API_KEY}`
  );
  axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${API_KEY}`
    )
    .then((response) => {
      let validData = response.data;
      console.log(response.data);
      res.json({ validData });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "erreur mon ti pere" });
    });
});

app.get("/characters/:id", (req, res) => {
  axios
    .get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${req.params.id}?apiKey=${API_KEY}`
    )
    .then((response) => {
      let validData = response.data;
      res.json({ validData });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "erreur mon ti pere" });
    });
});

app.all("*", (req, res) => {
  res.json({ message: "Page introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log("Server MARVEL started");
});
