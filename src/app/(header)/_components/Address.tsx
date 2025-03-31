import { useState } from "react";
import axios from "axios";
import LocationIcon from "@/app/homePage/(foodMenu)/_ui/LocationIcon";

type SuggestionsType = {
  place_id: number;
  display_name: string;
};

const Address = () => {
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (!input) return setSuggestions([]);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: input,
          format: "json",
          viewbox: "106.3500000,47.3000000,108.5000000,48.2666667",
          bounded: 1,
        },
      }
    );
    setSuggestions(response.data);
  };

  console.log(suggestions);
  return (
    <div className="relative flex gap-3 bg-white py-1 px-3 rounded-full items-center">
      <div className="flex gap-3 items-center">
        <LocationIcon />
        <p className="text-red-500">Delivery address:</p>
      </div>
      <input
        type="text"
        placeholder="Search Address"
        onChange={(e) => {
          fetchSuggestions(e.target.value);
        }}
      />

      {suggestions && (
        <div className="absolute left-0 top-10 bg-white w-full rounded-lg max-h-[400px] overflow-scroll">
          {suggestions.map((place) => (
            <div
              key={place?.place_id}
              className="p-2 cursor-pointer border-b-2"
            >
              {place?.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
