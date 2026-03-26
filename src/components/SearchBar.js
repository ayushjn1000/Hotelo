export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search city (e.g. Amritsar)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: 10, width: "100%", margin: "20px 0" }}
    />
  );
}