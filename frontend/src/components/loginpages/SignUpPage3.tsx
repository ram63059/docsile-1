import React, { useState, useEffect } from "react";
import loginsidepic from "../../assets/icon/loginsidepic.svg";
import docsilelogo from "../../assets/icon/docsilelogo.svg";
import { Country, City } from "country-state-city";
import DropDownWithSearch from "./Dropdownfilter";

const SignupPage3: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    Country: "",
    specialization: "",
    degree: "",
  });

  // Fetch all countries
  const countryOptions = Country.getAllCountries().map((country) => country.name);

  // Get the country ISO code when a country is selected
  const handleCountrySelect = (countryName: string) => {
    const countryData = Country.getAllCountries().find((c) => c.name === countryName);
    if (countryData) {
      setSelectedCountry(countryName);
      setSelectedCountryCode(countryData.isoCode);
      setSelectedCity(""); // Reset city selection
      setFormData((prev) => ({ ...prev, Country: countryName }));
    }
  };

  // Fetch cities based on selected country when selectedCountryCode changes
  useEffect(() => {
    if (selectedCountryCode) {
      const cities = City.getCitiesOfCountry(selectedCountryCode);
      if (cities) {
        const formattedCities = cities.map(city => `${city.name}`);
        console.log(formattedCities);
        setCityOptions(formattedCities);
      } else {
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
    }
  }, [selectedCountryCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData); // Replace with API call or state management logic
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-fontsm">
      {/* Left Section (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-1 justify-center items-center pl-8 bg-white">
        <div className="text-center max-w-lg">
          <p className="mt-4 text-2xl text-balance text-maincl">
            Step into a network where medical students learn, connect with mentors, and prepare for a future in healthcare
          </p>
          <div className="lg:p-4">

          <img src={loginsidepic} alt="Medical Network" className="w-[80%] max-w-md mx-auto" />
          </div>
        </div>
      </div>

      {/* Right Section (Always Visible) */}
      <div className="flex flex-1 lg:justify-start justify-center items-center lg:pr-4 p-2">
        <div className="w-full max-w-lg bg-white shadow-xl border border-gray-200 rounded-3xl p-6 flex flex-col justify-center lg:max-h-[90%] max-h-[80%] lg:p-24 h-[90vh] my-auto">
          <div className="flex items-center text-center mb-14 lg:mb-6 w-full">
            <img src={docsilelogo} alt="Docsile Logo" className="lg:w-8 lg:h-8 w-14 h-14 mr-2" />
            <h1 className="lg:text-4xl text-6xl text-maincl font-medium">Docsile</h1>
          </div>
          <h2 className="lg:text-md text-lg text-gray-800 mb-4">
          Help us match you with the right medical community by sharing your location
          </h2>
          <p className="text-xs lg:text-fontlit text-gray-600 mb-4">Select your country and city to connect with the right medical community and grow your network.</p>
          <form onSubmit={handleSubmit}>
            {/* Country Dropdown */}
            <DropDownWithSearch place="Select your country" dropDownOptions={countryOptions} onSelect={handleCountrySelect} />

            {/* City Dropdown */}
            <DropDownWithSearch place="Select your city" dropDownOptions={cityOptions} onSelect={setSelectedCity} />

            {/* Next Button */}
            <button
              className={`mt-8 w-full py-2 rounded-3xl ${
                selectedCountry && selectedCity ? "bg-maincl hover:bg-fillc  text-white" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!selectedCountry || !selectedCity}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};  

export default SignupPage3;
