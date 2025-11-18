interface FilteringProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const Filtering = ({ query, onQueryChange }: FilteringProps) => {
  return (
    <input
      type="text"
      className="border-1 border-black bg-white px-5 py-2 rounded-lg"
      placeholder="Search..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
};
