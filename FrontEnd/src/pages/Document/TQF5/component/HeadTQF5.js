import React, { useState, useContext, useEffect } from "react";
import { TQF5Context } from "../../../../context/TQF5Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default React.memo(function HeadTQF5() {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    documents,
    setDocuments,
    isEdit,
  } = useContext(TQF5Context);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDocuments({ ...documents, [e.target.name]: value });
    // console.log(e.target.value)
  };

  return (
    <>
      {/* {console.log("[HeaderTQF3.js] render")} */}
      <div className={isEdit ? "Head-content none" : "Head-content"}>
        <div className="Head-input">
          <h1>{documents.name}</h1>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      <div className={isEdit ? "Head-content" : "Head-content none"}>
        <div className="Head-input">
          <input
            className="title-name"
            type="text"
            value={documents.name}
            onChange={handleChangeTitle}
            name="name"
            placeholder={t("tqf3.head.name")}
          />
        </div>
      </div>
    </>
  );
});
