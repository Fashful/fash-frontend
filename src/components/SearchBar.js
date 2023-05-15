import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search term:", searchTerm);
    setSearchTerm("");
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", maxWidth: "30rem" }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem 0 0 0.25rem",
            flex: 1,
            marginRight: "-1px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "purple",
            color: "white",

            padding: "0.5rem",
            minWidth: "4rem",
            flex: "none",
          }}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-base text-sm" />
        </button>
      </form>
    </div>
  );
}
