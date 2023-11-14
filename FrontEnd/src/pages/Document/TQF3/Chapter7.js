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

export default function Chapter7() {
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
      {/* {console.log("[TQF3] Chapter7.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                   {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
               </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter7.title")}</h1>
        </div>
        <br />
        <div>
          <h2>{t("tqf3.chapter7.t1")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.effect}
            name="effect"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter7.t2")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.evaluation}
            name="evaluation"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter7.t3")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.improve}
            name="improve"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter7.t4")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.exam}
            name="exam"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter7.t5")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.opeartion}
            name="opeartion"
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
            <h1>{t("tqf3.chapter7.title")}</h1>
          </div>
          <br />
          <div>
            <h2>{t("tqf3.chapter7.t1")}</h2>
            <textarea
              placeholder={t("tqf3.chapter7.t1")}
              className="document-textarea MyTextarea"
              value={data.effect}
              onChange={handleChange}
              name="effect"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter7.t2")}</h2>
            <textarea
              placeholder={t("tqf3.chapter7.t2")}
              className="document-textarea MyTextarea"
              value={data.evaluation}
              onChange={handleChange}
              name="evaluation"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter7.t3")}</h2>
            <textarea
              placeholder={t("tqf3.chapter7.t3")}
              className="document-textarea MyTextarea"
              value={data.improve}
              onChange={handleChange}
              name="improve"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter7.t4")}</h2>
            <textarea
              placeholder={t("tqf3.chapter7.t4")}
              className="document-textarea MyTextarea"
              value={data.exam}
              onChange={handleChange}
              name="exam"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter7.t5")}</h2>
            <textarea
              placeholder={t("tqf3.chapter7.t5")}
              className="document-textarea MyTextarea"
              value={data.opeartion}
              onChange={handleChange}
              name="opeartion"
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
