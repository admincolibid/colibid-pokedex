import { Grid, Stack } from "@mui/material";
import { PokemonApiResult } from "../utils/types";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokeResult: PokemonApiResult;
}

export default function PokemonList({ pokeResult }: PokemonListProps) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {pokeResult?.results?.map((e) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={e.name}>
            <PokemonCard name={e.name} url={e.url} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
