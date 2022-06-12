import {
  Modal,
  Typography,
  Card,
  CardMedia,
  CardContent,
  SxProps,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonSpeciesApi } from "../utils/types/species";

type Props = {
  open: boolean;
  handleClose: () => void;
  id: string;
};

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function PokeModal({ open, handleClose, id }: Props) {
  const [pokemon, setPokemon] = useState<PokemonSpeciesApi>(
    {} as PokemonSpeciesApi
  );

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((res) => res.json())
      .then((data: PokemonSpeciesApi) => {
        setPokemon(data);
      });
  }, [id]);

  const color = pokemon?.color?.name;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          ...style,
          backgroundColor: pokemon?.color?.name || "white",
          color: getColor(color),
        }}
      >
        <CardMedia
          component="img"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="green iguana"
          height="800"
          width="400"
        />
        <CardContent>
          <Typography align="center" variant="h5">{`${id}. ${
            pokemon?.name || "loading"
          }`}</Typography>

          <Typography align="center" sx={{ marginTop: 2 }}>{`- ${
            pokemon?.flavor_text_entries?.length > 0
              ? pokemon?.flavor_text_entries[0]?.flavor_text
              : "loading"
          }`}</Typography>
        </CardContent>
      </Card>
    </Modal>
  );
}

function getColor(color: string): string {
  if (["white", "yellow"].includes(color)) {
    return "black";
  }
  return "white";
}
