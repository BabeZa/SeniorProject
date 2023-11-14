import React, { useState, useContext, useEffect } from "react";
import { TQF3Context } from "../../../context/TQF3Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Delete from "../../../assert/icon/delete.svg";
import edit from "../../../assert/icon/edit.svg";
import MongoAPI from "../../../apis/MongoAPI";
import { toast } from "react-toastify";
import moment from "moment";
import autosize from "autosize";

export default function Chapter6() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [click, setClick] = useState(false);
  const { data, setData, docId, canEdit, TQFId, isEdit2 } = useContext(
    TQF3Context
  );

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
    // console.log(e.target.value)
  };

  useEffect(() => {
    autosize.update(document.querySelectorAll("textarea"));
  }, [isEdit]);

  const onKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
  };

  return (
    <>
      {/* {console.log("[TQF3] Chapter6.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                   {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
               </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter6.title")}</h1>
        </div>
        <br />
        <div>
          <h2>{t("tqf3.chapter6.t1")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.book}
            name="book"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter6.t2")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.doc}
            name="doc"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter6.t3")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.addodc}
            name="addodc"
          ></textarea>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "tqf3" : "tqf3  none"}>
        <form>
          {/* <div className="edit-container">
                   <img src={ Delete } onClick={() => setIsEdit(false)} className="tqf-edit" />
               </div> */}
          <div className="text-center">
            <h1>{t("tqf3.chapter6.title")}</h1>
          </div>
          <br />
          <div>
            <h2>{t("tqf3.chapter6.t1")}</h2>
            <textarea
              placeholder={t("tqf3.chapter6.t1")}
              className="document-textarea MyTextarea"
              value={data.book}
              onChange={handleChange}
              name="book"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter6.t2")}</h2>
            <textarea
              placeholder={t("tqf3.chapter6.t2")}
              className="document-textarea MyTextarea"
              value={data.doc}
              onChange={handleChange}
              name="doc"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter6.t3")}</h2>
            <textarea
              placeholder={t("tqf3.chapter6.t3")}
              className="document-textarea MyTextarea"
              value={data.addodc}
              onChange={handleChange}
              name="addodc"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          {/* <div className="chapter-footer">
                   <button type="submit" className="chapter-footer-button" onClick={() => {setClick(!click)}}>บันทึกข้อมูล</button>
               </div> */}
        </form>
      </div>
    </>
  );
}
