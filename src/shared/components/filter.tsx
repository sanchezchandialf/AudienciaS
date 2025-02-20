import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Buscar..."
        onChange={handleSearch}
        fullWidth
      />
    </Box>
  );
};

export default Search;
