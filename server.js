import express from "express";
import cors from "cors";
import { get } from "axios";

const app = express();
app.use(cors());

app.get("/random-card/:language", (req, res) => {
  const { language } = req.params;

  get(`https://api.scryfall.com/cards/random?q=lang=${language}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.send({ error });
    });
});

app.get("/id", (req, res) => {
  const { id } = req.params;

  get(`https://api.scryfall.com/cards/${id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.send({ error });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
