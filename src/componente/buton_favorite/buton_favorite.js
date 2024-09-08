import React, { useState, useEffect } from "react";
import "../../css/favorit.css";

const Favourite = ({ data }) => {
  const [dropdownItems, setDropdownItems] = useState(["Alege un oraș"]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (data && data.city) {
      setSelectedItem(data.city);
    }
  }, [data]);

  const handleClick = () => {
    if (selectedItem) {
      if (dropdownItems.includes(selectedItem)) {
        setDropdownItems((prevItems) =>
          prevItems.filter((item) => item !== selectedItem)
        );
        setSelectedItem("");
      } else {
        setDropdownItems((prevItems) => [...prevItems, selectedItem]);
      }
    }
  };

  const resetDropdown = () => {
    setSelectedItem("Alege un oraș");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      {data && data.city && (
        <>
          <p
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "15px",
              borderRadius: "5px",
              fontSize: "22px",

              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            Lista de orașe preferate:
          </p>

          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            style={{ fontSize: "18px", padding: "10px" }}
          >
            {dropdownItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            className={`heartButton ${
              dropdownItems.includes(selectedItem) ? "filled" : ""
            }`}
            onClick={handleClick}
            style={{ fontSize: "24px", padding: "10px" }}
          ></button>
        </>
      )}
    </div>
  );
};

export default Favourite;
