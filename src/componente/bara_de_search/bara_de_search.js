import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, options_url } from "../../javascript/api";

const Search = ({ ChangeOnSearch }) => {
  
  const [search, update] = useState(null);


  const OnChangeVariable = (searchData) => {
    update(searchData);
    ChangeOnSearch(searchData);
  };

  const LoadOptionVariable = (inputValue) => {
    return fetch(`${options_url}/cities?namePrefix=${inputValue}`,options)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
  
  return (
    <AsyncPaginate
         placeholder="Alegeti orasul:"
         debounceTimeout={600}
         value={search}
         onChange={OnChangeVariable}
         loadOptions={LoadOptionVariable}
    />
  );
};

export default Search;