import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
export default function SearchBar() {
  const [setSearchTerm] = useState("");
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (searchTerm, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(searchTerm, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setSearchTerm(item);
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <div className="result-span">{item.name}</div>
      </div>
    );
  };

  return (
    <div>
      <form
        onSubmit={handleOnSearch}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ width: 300 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            formatResult={formatResult}
            autoFocus
            maxResults={5}
            maxLength={20}
          />
        </div>

        <button
          type="submit"
          style={{
            marginLeft: "5%",
            backgroundColor: "purple",
            color: "white",
            padding: "0.5rem",
            borderRadius: "50%",
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}
