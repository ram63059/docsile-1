import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { ChevronDown, ChevronUp } from "lucide-react";



const JobFilterStatic: React.FC = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
 
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const locations = [
    "Agra",
    "Ahmedabad",
    "Ajmer",
    "Allahabad",
    "Amravati",
    "Amritsar",
    "Aurangabad",
    "Bareilly",
    "Bangalore",
    "Bhilai",
    "Bhiwandi",
    "Bhopal",
    "Bhubaneswar",
    "Bikaner",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Cuttack",
    "Dehradun",
    "Delhi",
    "Dhanbad",
    "Durgapur",
    "Faridabad",
    "Firozabad",
    "Ghaziabad",
    "Gorakhpur",
    "Gurgaon",
    "Guwahati",
    "Gwalior",
    "Hubballi-Dharwad",
    "Hyderabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jalandhar",
    "Jamshedpur",
    "Jodhpur",
    "Kalyan-Dombivli",
    "Kanpur",
    "Kochi",
    "Kolhapur",
    "Kolkata",
    "Kota",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Meerut",
    "Moradabad",
    "Mumbai",
    "Mysore",
    "Nagpur",
    "Nanded",
    "Nashik",
    "Navi Mumbai",
    "Noida",
    "Patna",
    "Pimpri-Chinchwad",
    "Pune",
    "Raipur",
    "Rajkot",
    "Ranchi",
    "Rourkela",
    "Salem",
    "Saharanpur",
    "Solapur",
    "Srinagar",
    "Surat",
    "Thane",
    "Tiruchirappalli",
    "Vadodara",
    "Varanasi",
    "Vasai-Virar",
    "Vijayawada",
    "Visakhapatnam",
    "Warangal",
  ];






  const handleAddSpecialty = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!specialties.includes(inputValue.trim())) {
        setSpecialties([...specialties, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveSpecialty = (specialtyToRemove: string) => {
    setSpecialties(
      specialties.filter((specialty) => specialty !== specialtyToRemove)
    );
  };

  return (
    <div className="w-full flex items-start justify-center pt-3 px-2">
      <Card className="w-full max-w-md bg-buttonclr p-4 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-medium text-maincl">Filters</h2>
        </div>

        {/* Specialty Filter */}
        <div className="mb-4">
          <label className="text-fontlit  mb-2">Specialty</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 text-xs font-medium text-white bg-fillc rounded-full"
              >
                {specialty}
                <button
                  onClick={() => handleRemoveSpecialty(specialty)}
                  className="ml-2 text-fontlit text-white hover:text-gray-300 focus:outline-none"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSpecialty}
            placeholder="Type and press Enter to add a specialty"
            className="w-full px-3 py-2 border text-fontlit border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-fillc"
          />
        </div>

        {/* Location Filter */}
        <div className="mb-4">
        <label className="block text-fontlit    mb-2">Location</label>

          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="w-full flex justify-between text-fontlit items-center py-2 px-3 border rounded-lg focus:outline-none"
          >
            <span className="text-gray-700 text-fontlit">{selectedLocation || "Select Location"}</span>
            {isLocationOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isLocationOpen && (
            <div className="max-h-40 overflow-y-auto mt-2 border rounded-lg">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location);
                    setIsLocationOpen(false);
                  }}
                  className="block w-full text-left text-fontlit px-3 py-2 hover:bg-gray-200"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>

          <div className="flex justify-end">

        <Button className="px-3 rounded-2xl text-fillc ">Reset</Button>
          </div>
      </Card>
    </div>
  );
};

export default JobFilterStatic;
