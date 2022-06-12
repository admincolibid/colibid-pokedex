import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, useEffect, useState } from "react";
import { PokemonApiResult } from "../utils/types";
import { PokeReducerState, PokeReducerAction } from "../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
})) as typeof InputBase;

interface NavbarProps {
  pokeStateReducer: {
    state: PokeReducerState;
    dispatch: Dispatch<PokeReducerAction>;
  };
}

export default function Navbar({
  pokeStateReducer: { state, dispatch },
}: NavbarProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [colorOptions, setColorOptions] = useState<PokemonApiResult["results"]>(
    []
  );

  useEffect(() => {
    const pokeColorUrl = "https://pokeapi.co/api/v2/pokemon-color/";
    const colorUrl = new URL(pokeColorUrl);
    fetch(colorUrl)
      .then((res) => res.json())
      .then((data: PokemonApiResult) => {
        setColorOptions(data.results);
      });
  }, []);

  const onSelect = (
    e:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchValue("");
    dispatch({ type: "getPokemonByColor", payload: e.target.value });
  };

  const searchOnKeyPress = (
    // e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement >
    e: any
  ) => {
    if (e.key === "Enter") {
      dispatch({ type: "getPokemonBySearch", payload: searchValue });
    }
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Pokemon
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={searchOnKeyPress}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="colorOption"
          value={state.color}
          label="Color"
          onChange={onSelect}
          select
          variant="filled"
          defaultValue={"all"}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {colorOptions.map((e) => (
            <MenuItem key={e.name} value={e.url}>
              {e.name}
            </MenuItem>
          ))}
        </TextField>
      </Toolbar>
    </AppBar>
  );
}
