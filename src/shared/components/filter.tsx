import React from "react";

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
