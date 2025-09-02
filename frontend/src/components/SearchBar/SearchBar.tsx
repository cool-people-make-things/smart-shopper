import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSearch } from "../../context/SearchContext";
import { Input } from "../retroui";
import { cleanInput } from "./utils/cleanInput";

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { query, setQuery } = useSearch();

  const [inputValue, setInputValue] = useState(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanInput(e.target.value);
    setInputValue(cleaned);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(inputValue);
      if (location.pathname !== "/browse") {
        navigate(`/browse?q=${encodeURIComponent(inputValue)}`);
      } else {
        navigate(`?q=${encodeURIComponent(inputValue)}`, { replace: true });
      }
    }
  };

  return (
    <Input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Search products..."
      maxLength={50}
    />
  );
}
