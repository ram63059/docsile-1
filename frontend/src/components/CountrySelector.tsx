import { useState, useEffect } from "react";
import { Country } from "country-state-city";

interface CountrySelectorProps {
  onCountrySelect: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const countriesData = Country.getAllCountries();
    setCountries(countriesData);
   
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    
    onCountrySelect(countryCode);

    
  };

  return (
    <div className="mt-5 ">
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="px-4 py-3 border border-main rounded-lg w-full focus:outline-none text-base "
      >
        <option value="" className="text-slate-400">Select a country</option>
        {countries.map((country) => (
       
               <option className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option> 
      
          
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
