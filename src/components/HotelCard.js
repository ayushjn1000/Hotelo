export default function HotelCard({ hotel }) {
  return (
    <div className="card">
      <h2>
        {hotel.hotelName} ({hotel.starRating})
      </h2>

      <p><b>City:</b> {hotel.city}</p>
      <p><b>State:</b> {hotel.state}</p>
      <p><b>Address:</b> {hotel.address}</p>
      <p><b>Total Rooms:</b> {hotel.totalRooms}</p>

      {hotel.imageUrl && (
        <a href={hotel.imageUrl} target="_blank" rel="noreferrer">
          View Images
        </a>
      )}

      <h4>Room Types:</h4>
      {hotel.roomTypes.map((room, i) => (
        <div key={i}>
          {room.roomCategory} → EP: ₹{room.ep}, CP: ₹{room.cp}, MAP: ₹{room.map}
        </div>
      ))}

      <h4>Extra Person:</h4>
      <p>
        EP: ₹{hotel.extraPersonCost.ep} | CP: ₹{hotel.extraPersonCost.cp} | MAP:
        ₹{hotel.extraPersonCost.map}
      </p>

      <p>
        <b>Swimming Pool:</b>{" "}
        {hotel.hasSwimmingPool ? "Yes" : "No"}
      </p>
    </div>
  );
}