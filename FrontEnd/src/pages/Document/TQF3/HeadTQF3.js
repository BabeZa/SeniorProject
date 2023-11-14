import React, { useState, useContext, useEffect } from "react";
import { TQF3Context } from "../../../context/TQF3Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import i18next from "i18next";
import PostgreAPI from "../../../apis/PostgreAPI";
import cancel2 from "../../../assert/icon/cancel2.svg";
import edit from "../../../assert/icon/edit.svg";

export default React.memo(function HeadTQF3() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [click, setClick] = useState(false);
  const {
    docId,
    TQFId,
    documents,
    setDocuments,
    canEdit,
    isEdit2,
  } = useContext(TQF3Context);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDocuments({ ...documents, [e.target.name]: value });
    // console.log(e.target.value)
  };

  return (
    <>
      {/* {console.log("[HeaderTQF3.js] render")} */}
      <div className={isEdit2 ? "Head-content none" : "Head-content"}>
        {/* <div className="Head-edit-container">
                       {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-head-edit" />}
               </div> */}
        <div className="Head-input">
          <h1>{documents.name}</h1>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "Head-content" : "Head-content none"}>
        {/* <div className="Head-edit-container">
                       <img src={ cancel2 } onClick={() => setIsEdit(false)} className="tqf-head-edit" />
               </div> */}
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
        {/* <div className="Head-footer">
                   <button className="chapter-footer-button" onClick={saveDocument}>{t('btn.save')}</button>
               </div> */}
      </div>
    </>
  );
});
