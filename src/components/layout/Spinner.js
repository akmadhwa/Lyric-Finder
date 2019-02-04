import React from "react";

import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
          <img src={spinner} alt="Loading ..." style={{ width:'150px', height:'auto' }}/>
    </div>
  );
}

export default Spinner;
