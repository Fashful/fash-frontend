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
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            padding: "0.4rem",
            border: "1px solid #ccc",
            borderRadius: "0.25rem 0.25rem 0.25rem 0.25rem",
            flex: 1,
          }}
        />
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
          <FontAwesomeIcon icon={faSearch} className="text-gray-base text-sm" />
        </button>
      </form>
    </div>
  );
}
