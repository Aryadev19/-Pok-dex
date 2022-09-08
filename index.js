import express from "express";
const app = express();

import product from "./api/product.js";
app.use("/api/product", product);



const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();
import pokemon from "pokemon";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.static(__dirname + "/"));

//? Getting pokemon data from the api!
const fetch = async (pokemonName) => {
  try {
    const data = await P.getPokemonByName(pokemonName);
    return data;
  } catch (error) {
    throw error;
  }
};

app.post("/", (req, res) => {
  const pokemonName = req.body.pokemonName.toLowerCase();

  //? Calling the function and using the data returned
  fetch(pokemonName)
    .then((response) => {
      //TODO: Add the image from the server using the api (It's in the sprites section)

      const data = response;
      const id = data.id;
      const name = data.name;
      const height = data.height;
      const weight = data.weight;
      const exp = data.base_experience;
      const ability = data.abilities[0].ability.name;
      const type = data.types[0].type.name;
      const url = data.sprites.front_default;
      const img = data.sprites.other.home.front_default;
      const order= data.order;
      res.render("pokemon", {
        name: name,
        id: id,
        height: height,
        weight: weight,
        exp: exp,
        ability: ability,
        type: type,
        order: order,
        url: url,
        img: img,
      });
    })
    .catch((error) => console.log(error));
});

app.get("/pokemon", (req, res) => {
  const randomPokemon = pokemon.random().toLowerCase();
  fetch(randomPokemon)
    .then((response) => {
      const data = response;
      const id = data.id;
      const name = data.name;
      const height = data.height;
      const weight = data.weight;
      const exp = data.base_experience;
      const ability = data.abilities[0].ability.name;
      const type = data.types[0].type.name;
      const order = data.order;
      const url = data.sprites.front_default;
      const img = data.sprites.other.home.front_default;

      res.render("pokemon", {
        name: name,
        id: id,
        height: height,
        weight: weight,
        exp: exp,
        ability: ability,
        type: type,
        order: order,
        url: url,
        img: img,
      });
    })
    .catch((error) => console.log(error));
});



app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

//Exporting app
export{app}


