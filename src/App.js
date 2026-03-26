import { useState } from "react";
import FileUpload from "./components/FileUpload";
import SearchBar from "./components/SearchBar";
import HotelCard from "./components/HotelCard";
import "./styles.css";

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Hotel Search App</h1>

      <FileUpload setHotels={setHotels} />
      <SearchBar search={search} setSearch={setSearch} />

      {filteredHotels.map((hotel, i) => (
        <HotelCard key={i} hotel={hotel} />
      ))}
    </div>
  );
}