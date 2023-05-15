import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [SearchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  //need to figure how to get users
  const items = [
    {
      id: "911952f9-6075-495e-99ba-255f25fd0e52",
      name: "Jack Chen",
      img: user.Photo ? user.Photo : picLink,
    },
    {
      id: "c08f6630-7ff2-4589-b683-b2481e24ab58",
      name: "John Doe",
      img: user.Photo ? user.Photo : picLink,
    },
    {
      id: "ec2a01ee-754f-45a7-ab71-af116af291b1",
      name: "Brian Zhang",
      img: user.Photo ? user.Photo : picLink,
    },
    {
      id: 3,
      name: "PHP",
      img: user.Photo ? user.Photo : picLink,
    },
    {
      id: 4,
      name: "Elvira",
      img: user.Photo ? user.Photo : picLink,
    },
  ];

  const handleOnSearch = (search, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setSearchTerm(search);

    console.log(search, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setSearchTerm(item);
    navigate(`/profile/${item.id}`);
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <div className="result-span">
          <img className="result-pic" src={item.img} alt={item.name} />
          {item.name}
        </div>
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
