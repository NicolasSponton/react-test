import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
countries.registerLocale(require("i18n-iso-countries/langs/es.json"))
interface Country {
  id: string;
  name: string;
}

const countriesObj = countries.getNames("en", {select: "official"})
const countriesList: Country[] = Object.entries(countriesObj).map(([id, name]) => ({ id, name }) as Country)

function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleCountry = (id: string) => {
    if (selectedCountries.includes(id)) {
      setSelectedCountries(selectedCountries.filter(countryId => countryId !== id));
      setSelectAll(false)
    } else {
      const newSelected = [...selectedCountries, id]
      setSelectedCountries(newSelected);
      if(newSelected.length === countriesList.length){
        setSelectAll(true)
      }
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCountries([]);
    } else {
      const allCountryIds = countriesList.map(country => country.id);
      setSelectedCountries(allCountryIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
        Select All
      </label>
      {countriesList.map(country => (
        <div key={country.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedCountries.includes(country.id)}
              onChange={() => toggleCountry(country.id)}
            />
            {country.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default App;
