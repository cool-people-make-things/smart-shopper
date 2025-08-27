import { useLocation, useNavigate } from "react-router-dom";

import { Input } from "../retroui";
import { useSearch } from "./SearchContext";

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { query, setQuery } = useSearch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { value } = e.currentTarget;
      setQuery(value);

      if (location.pathname !== "/browse") {
        navigate(`/browse?q=${encodeURIComponent(value)}`);
      } else {
        navigate(`?q=${encodeURIComponent(value)}`, { replace: true });
      }
    }
  };

  return (
    <Input
      type="text"
      defaultValue={query}
      onKeyDown={handleKeyDown}
      placeholder="Search products..."
    />
  );
}
