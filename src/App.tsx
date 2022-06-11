import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import { CssBaseline, Container, SelectChangeEvent } from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { PokemonApiResult } from "./utils/types";
import { Pokemon } from "./utils/types/pokemon";
import { PokemonColor } from "./utils/types/pokemonColor";

function App() {
  const [pokeResult, setPokeResult] = useState<PokemonApiResult>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [colorOptions, setColorOptions] = useState<PokemonApiResult["results"]>(
    []
  );
  const [color, setColor] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + search;
    const url = new URL(pokeUrl);

    fetch(url)
      .then((res) => res.json())
      .then((data: PokemonApiResult | Pokemon) => {
        if (!search) {
          return setPokeResult(data as PokemonApiResult);
        }
        return setPokemon(data as Pokemon);
      })
      .catch((err) => setPokemon(null));
  }, [search]);

  useEffect(() => {
    const pokeColorUrl = "https://pokeapi.co/api/v2/pokemon-color/";
    const url = new URL(pokeColorUrl);
    fetch(url)
      .then((res) => res.json())
      .then((data: PokemonApiResult) => {
        setColorOptions(data.results);
      });
  }, []);

  useEffect(() => {
    if (color && color !== "all") {
      const colorUrl = colorOptions.find((c) => c.name === color);
      fetch(colorUrl?.url as string)
        .then((res) => res.json())
        .then((data: any) => {
          setPokeResult((prevPoke) => ({
            ...prevPoke,
            results: data.pokemon_species,
          }));
          setSearch("");
          setPokemon(null);
        });
    } else {
      setSearch("");
      setColor("all");
      setPokemon(null);
    }
  }, [color, colorOptions]);

  const onSelect = (
    e:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setColor(e.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Navbar
        setSearch={setSearch}
        color={{ color, setColor }}
        colorOptions={{ colorOptions, setColorOptions }}
        onSelect={onSelect}
      />
      <Container
        maxWidth="xl"
        // fixed
        sx={{
          paddingTop: 3,
        }}
      >
        {search && <PokemonDetail pokemon={pokemon} />}
        {!search && <PokemonList pokeResult={pokeResult} />}
      </Container>
    </>
  );
}

export default App;
