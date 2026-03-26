export const parseSheet = (data, stateName) => {
  const hotels = [];
  let currentHotel = null;

  const isHotelHeader = (text) =>
    text.includes("Hotel") && text.includes("(");

  const extractStar = (text) => {
    const match = text.match(/\((.*?)\)/);
    return match ? match[1] : "";
  };

  const extractCity = (address) => {
    const parts = address.split(",");
    return parts[parts.length - 2]?.trim() || "";
  };

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row || !row[0]) continue;

    const text = row[0].toString().trim();

    // 🏨 HOTEL HEADER
    if (isHotelHeader(text)) {
      if (currentHotel) hotels.push(currentHotel);

      currentHotel = {
        state: stateName,
        hotelName: text.split("(")[0].trim(),
        starRating: extractStar(text),
        address: "",
        city: "",
        totalRooms: null,
        imageUrl: "",
        roomTypes: [],
        extraPersonCost: {},
        hasSwimmingPool: false
      };
      continue;
    }

    if (!currentHotel) continue;

    // 📍 ADDRESS
    if (!currentHotel.address && text.length > 10 && !text.includes("Total")) {
      currentHotel.address = text;
      currentHotel.city = extractCity(text);
      continue;
    }

    // 🏨 TOTAL ROOMS
    if (text.toLowerCase().includes("total no")) {
      const match = text.match(/\d+/);
      if (match) currentHotel.totalRooms = Number(match[0]);
    }

    // 🛏 ROOM TYPES
    if (
      text.toLowerCase().includes("room") &&
      row[1] &&
      !text.toLowerCase().includes("extra")
    ) {
      currentHotel.roomTypes.push({
        roomCategory: text,
        ep: row[1],
        cp: row[2],
        map: row[3]
      });
    }

    // 👤 EXTRA PERSON
    if (text.toLowerCase().includes("extra")) {
      currentHotel.extraPersonCost = {
        ep: row[1],
        cp: row[2],
        map: row[3]
      };
    }

    // 🖼 IMAGE
    if (text.includes("http")) {
      currentHotel.imageUrl = text;
    }
  }

  if (currentHotel) hotels.push(currentHotel);

  return hotels;
};