import React from "react";
import Clear from "@material-ui/icons/Clear";

const Checkdiv = ({ checked }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        // backgroundColor: "red",
      }}
    >
      <div style={{ display: "block" }}>{checked && <Clear />}</div>
    </div>
  );
};

export default Checkdiv;
