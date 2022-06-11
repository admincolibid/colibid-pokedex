import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { PokemonApiResult } from "../utils/types";

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
  setSearch: Dispatch<SetStateAction<string>>;
  color: {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
  };
  colorOptions: {
    colorOptions: PokemonApiResult["results"];
    setColorOptions: Dispatch<SetStateAction<PokemonApiResult["results"]>>;
  };
  onSelect: (
    e:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function Navbar({
  setSearch,
  color: { color, setColor },
  colorOptions: { colorOptions, setColorOptions },
  onSelect,
}: NavbarProps) {
  const searchOnKeyPress = (
    // e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement >
    e: any
  ) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
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
            onKeyDown={searchOnKeyPress}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <TextField
          sx={{ m: 1, minWidth: 120 }}
          id="colorOption"
          value={color}
          label="Color"
          onChange={onSelect}
          select
          variant="filled"
          defaultValue={"all"}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {colorOptions.map((e) => (
            <MenuItem key={e.name} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </TextField>
      </Toolbar>
    </AppBar>
  );
}
