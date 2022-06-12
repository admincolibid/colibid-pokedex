import { useEffect, useReducer, useState } from "react";
import Navbar from "./components/Navbar";

import {
  CssBaseline,
  Container,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Grid,
} from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { PokemonApiResult } from "./utils/types";
import { Pokemon } from "./utils/types/pokemon";

const pokeResultInitialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export interface PokeReducerState {
  search: string;
  color: string;
}

export type PokeReducerAction =
  | {
      type: "getPokemonBySearch";
      payload: string;
    }
  | {
      type: "getPokemonByColor";
      payload: string;
    }
  | { type: "reset" };

const reducerInitalState: PokeReducerState = {
  search: "",
  color: "all",
};

const pokeApiReducer = (state: PokeReducerState, action: PokeReducerAction) => {
  switch (action.type) {
    case "getPokemonBySearch":
      return { color: "all", search: action.payload };
    case "getPokemonByColor":
      return { search: "", color: action.payload };
    case "reset":
      return reducerInitalState;
    default:
      throw new Error(`type action desconocido (╯°□°）╯︵ ┻━┻)) `);
  }
};

function App() {
  const [state, dispatch] = useReducer(pokeApiReducer, reducerInitalState);

  const [loading, setLoading] = useState<boolean>(false);

  const [pokeResult, setPokeResult] = useState<PokemonApiResult>(
    pokeResultInitialState
  );
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    setLoading(true);
    if (state.color) {
      //soy generacion vieja mi pokemones eran 151 ( ´･･)ﾉ(._.`)
      const url =
        state.color === "all"
          ? "https://pokeapi.co/api/v2/pokemon?limit=151"
          : state.color;
      fetch(url)
        .then((res) => res.json())
        .then((data: any) => {
          setPokemon(null);
          if (state.color === "all") {
            setPokeResult(data);
          } else {
            setPokeResult((prevPoke) => ({
              ...prevPoke,
              results: data.pokemon_species,
            }));
          }
          setLoading(false);
        });
    } else {
      setPokemon(null);
      setLoading(false);
    }

    if (state.search) {
      const pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + state.search;
      const url = new URL(pokeUrl);
      fetch(url)
        .then((res) => res.json())
        .then((data: PokemonApiResult | Pokemon) => {
          setLoading(false);
          if (!state.search) {
            setPokeResult(data as PokemonApiResult);
          } else {
            setPokemon(data as Pokemon);
          }
        });
    }
  }, [state.color, state.search]);

  return (
    <>
      <CssBaseline />
      <Navbar pokeStateReducer={{ state, dispatch }} />
      <Container
        maxWidth="xl"
        // fixed
        sx={{
          paddingTop: 3,
        }}
      >
        {loading && <SkeletonCardList />}
        {!loading && state.search && (
          <PokemonDetail pokemon={pokemon} search={state.search} />
        )}
        {!loading && !state.search && <PokemonList pokeResult={pokeResult} />}
      </Container>
    </>
  );
}

export default App;

function SkeletonCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" width={400} height={400} />
      <CardContent>
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
}

function SkeletonCardList() {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from(Array(10))?.map((e, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
