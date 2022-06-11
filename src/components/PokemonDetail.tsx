import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import { Pokemon } from "../utils/types/pokemon";

type Props = { pokemon: Pokemon | null };

export default function PokemonDetail({ pokemon }: Props) {
  if (pokemon) {
    console.log({ pokemon });
    return (
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt="green iguana"
            height="475"
            width="475"
          />
        </div>
        <CardContent>
          <Typography align="center" variant="h5">{`${pokemon.id}. ${
            pokemon?.name || "loading"
          }`}</Typography>
          <h3>Moves</h3>
          <ul>
            {pokemon.moves.map((e) => (
              <li>{e.move.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
  return <div>Not Found</div>;
}
