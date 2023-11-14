import React, { useContext, useEffect } from "react";
import autosize from "autosize";
import { SARContext, SARContextProvider } from "../../../context/SARContext";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
const MySAR = () => {
  const { SARdata } = useContext(SARContext);

  //   useEffect(() => {
  //     autosize(document.querySelectorAll("textarea"));
  //     autosize.update(document.querySelectorAll("textarea"));
  //   }, [SARdata.autosize]);
  return (
    <h1>
      <div className="container-center">
        <div className="document-content">
          <br />
          {/* หมวดที่1 */}
          <div className="document-chapter-container">
            <Chapter1 />
          </div>
          <br />
          {/* หมวดที่2 */}
          <div className="document-chapter-container">
            <Chapter2 />
          </div>
        </div>
      </div>
    </h1>
  );
};

const SAR = (props) => (
  <SARContextProvider>
    <MySAR />
  </SARContextProvider>
);

export default SAR;
