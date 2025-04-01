import { useState } from "react";
import axios from "axios";
import LocationIcon from "@/app/homePage/(foodMenu)/_ui/LocationIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/providers/UserProvider";
import { addAddress } from "@/app/utils/axios";
import { useEffect } from "react";

type SuggestionsType = {
  place_id: number;
  display_name: string;
};

const Address = () => {
  const { userId } = useUser();
  const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAddress = localStorage.getItem("address") || "";
      setSelectedAddress(storedAddress);
    }
  }, []);

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

  const handleAddressButton = async (address: string) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    localStorage.setItem("address", address);
    setSelectedAddress(address);
    setSuggestions([]);

    try {
      const response = await addAddress(userId, address);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAddress = () => {
    localStorage.removeItem("address");
    setSelectedAddress("");
  };

  return (
    <div className="relative flex gap-3 bg-white py-1 px-3 rounded-full items-center">
      <div className="flex gap-3 items-center">
        <LocationIcon />
        <p className="text-red-500 cursor-default">Delivery address:</p>
      </div>
      {suggestions && (
        <div className="absolute left-0 top-10 bg-white w-full rounded-lg max-h-[400px] overflow-scroll">
          {suggestions.map((place) => (
            <div
              key={place?.place_id}
              className="p-2 cursor-pointer border-b-2"
              onClick={() => handleAddressButton(place?.display_name)}
            >
              {place?.display_name}
            </div>
          ))}
        </div>
      )}
      {!selectedAddress && (
        <input
          type="text"
          // value={selectedAddress || ""}
          placeholder="Add address here"
          onChange={(e) => {
            fetchSuggestions(e.target.value);
          }}
        />
      )}

      {selectedAddress && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="max-w-[150px] overflow-hidden cursor-pointer text-ellipsis whitespace-nowrap"
                onClick={clearAddress}
              >
                {selectedAddress}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p> {selectedAddress}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default Address;
