import { useLocation, useNavigate } from "react-router-dom";

import { Input } from "../retroui";
import { useSearch } from "./SearchContext";
import { cleanInput } from "./utils/cleanInput";

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanInput(e.target.value);
    setQuery(cleaned);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (location.pathname !== "/browse") {
        navigate(`/browse?q=${encodeURIComponent(query)}`);
      } else {
        navigate(`?q=${encodeURIComponent(query)}`, { replace: true });
      }
    }
  };

  return (
    <Input
      type="text"
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Search products..."
      maxLength={50}
    />
  );
}
