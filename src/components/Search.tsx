import type { FC } from "react";

interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const Search: FC<SearchProps> = ({ query, onQueryChange }: SearchProps) => {
  return (
    <input
      type="text"
      className="border border-border bg-surface text-text px-5 py-2 rounded-lg placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-md transition-all"
      placeholder="Search..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
};
