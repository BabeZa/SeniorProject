import React, { useEffect } from "react";
import Head from "../components/Head";
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("PageState", "404");
    console.log("----", window.location.pathname);
  }, []);

  const goBack = () => {
    localStorage.removeItem("PageState");
    // console.log("----",window.location.pathname);
    history.goBack();
  };

  return (
    <>
      {/* <Head title={"404 Not Found"}/> */}
      <div classNameName="container-center">
        <div classNameName="flex-col not-found">
          <h1>404</h1>
          <h4>This page could not be found.</h4>

          <div classNameName="not-found-footer">
            <button
              classNameName="MyButton2 btn-prev-step"
              onClick={() => goBack()}
            >
              <i className="fal fa-chevron-left"></i>Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
