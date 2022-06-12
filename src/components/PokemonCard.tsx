import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { PokemonNameAndUrl } from "../utils/types";
import PokeModal from "./PokeModal";
import { useState } from "react";

export default function PokemonCard({
  name = "bulbasaur",
  url = "https://pokeapi.co/api/v2/pokemon/1/",
}: PokemonNameAndUrl) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    console.log("openmodal", pokeId);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const pokeId = url.split("/").slice(-2, -1)[0];

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("click", pokeId);
    openModal();
  };

  return (
    <Card>
      <CardActionArea onClick={onClickHandler}>
        <CardMedia
          component="img"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
          alt="green iguana"
          height="400"
          width="400"
        />
        <CardContent>
          <Typography
            align="center"
            variant="h5"
          >{`${pokeId}. ${name}`}</Typography>
        </CardContent>
      </CardActionArea>
      {open && <PokeModal open={open} handleClose={closeModal} id={pokeId} />}
    </Card>
  );
}
