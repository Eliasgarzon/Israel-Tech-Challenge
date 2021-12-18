import { Button, ButtonGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Searchbar() {
  const { searchInputInitial } = useParams();
  const [activeButton, setActiveButton] = useState("CHIRPS");
  const [searchInput, setSearchInput] = useState(searchInputInitial || "");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (searchInput) {
      const navigateLink = `/${activeButton.toLowerCase()}/${searchInput}`;
      navigate(navigateLink);
    }
    window.location.reload(true);
  };

  return (
    <Box sx={{ mx: "auto", display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        InputProps={{
          endAdornment: (
            <Button disabled={false} variant="text" onClick={handleSubmit}>
              Search
            </Button>
          ),
        }}
      >
        {" "}
      </TextField>
      <ButtonGroup disableElevation variant="contained">
        <Button
          variant={activeButton === "CHIRPS" ? "contained" : "text"}
          onClick={() => setActiveButton("CHIRPS")}
        >
          Chirps
        </Button>
        <Button
          variant={activeButton === "USERS" ? "contained" : "text"}
          onClick={() => setActiveButton("USERS")}
        >
          Users
        </Button>
      </ButtonGroup>
    </Box>
  );
}
