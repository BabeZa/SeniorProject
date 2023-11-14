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

export default function Chapter3() {
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

  useEffect(() => {
    setData({ ...data, UpdateDate: moment().format("DD MMMM YYYY HH:mm:ss") });
  }, [click]);

  return (
    <>
      {/* {console.log("[TQF3] Chapter3.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                    {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
                </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter3.title")}</h1>
        </div>
        <br />
        <div>
          <h2>{t("tqf3.chapter3.t1")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.description}
            name="description"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter3.t2.title")}</h2>
          <h2 className="h2-c3">{t("tqf3.chapter3.t2.st1")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.describe}
            name="describe"
          ></textarea>
          <h2 className="h2-c3">{t("tqf3.chapter3.t2.st2")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.additionteach}
            name="additionteach"
          ></textarea>
          <h2 className="h2-c3">{t("tqf3.chapter3.t2.st3")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.activelearn}
            name="activelearn"
          ></textarea>
          <h2 className="h2-c3">{t("tqf3.chapter3.t2.st4")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.selflearn}
            name="selflearn"
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter3.t3")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.consulthour}
            name="consulthour"
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
            <h1>{t("tqf3.chapter3.title")}</h1>
          </div>
          <br />
          <div>
            <h2>{t("tqf3.chapter3.t1")}</h2>
            <textarea
              placeholder={t("tqf3.chapter3.t1")}
              className="document-textarea MyTextarea"
              value={data.description}
              onChange={handleChange}
              name="description"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter3.t2.title")}</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <textarea
                      placeholder={t("tqf3.chapter3.t2.st5")}
                      className="document-textarea front MyTextarea"
                      value={data.describe}
                      onChange={handleChange}
                      name="describe"
                      onKeyDown={onKeyDown}
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      placeholder={t("tqf3.chapter3.t2.st6")}
                      className="document-textarea back MyTextarea"
                      value={data.additionteach}
                      onChange={handleChange}
                      name="additionteach"
                      onKeyDown={onKeyDown}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <textarea
                      placeholder={t("tqf3.chapter3.t2.st7")}
                      className="document-textarea front MyTextarea"
                      value={data.activelearn}
                      onChange={handleChange}
                      name="activelearn"
                      onKeyDown={onKeyDown}
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      placeholder={t("tqf3.chapter3.t2.st8")}
                      className="document-textarea back MyTextarea"
                      value={data.selflearn}
                      onChange={handleChange}
                      name="selflearn"
                      onKeyDown={onKeyDown}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <h2 className="h2-c3">{t('tqf3.chapter3.t2.st1')}</h2>
                    <textarea className="document-textarea MyTextarea" value={data.describe} onChange={handleChange} name='describe' onKeyDown={onKeyDown}></textarea>
                    <h2 className="h2-c3">{t('tqf3.chapter3.t2.st2')}</h2>
                    <textarea className="document-textarea MyTextarea" value={data.additionteach} onChange={handleChange} name='additionteach' onKeyDown={onKeyDown}></textarea>
                    <h2 className="h2-c3">{t('tqf3.chapter3.t2.st3')}</h2>
                    <textarea className="document-textarea MyTextarea" value={data.activelearn} onChange={handleChange} name='activelearn' onKeyDown={onKeyDown}></textarea>
                    <h2 className="h2-c3">{t('tqf3.chapter3.t2.st4')}</h2>
                    <textarea className="document-textarea MyTextarea" value={data.selflearn} onChange={handleChange} name='selflearn' onKeyDown={onKeyDown}></textarea> */}
          </div>
          <div>
            <h2>{t("tqf3.chapter3.t3")}</h2>
            <textarea
              placeholder={t("tqf3.chapter3.t4")}
              className="document-textarea MyTextarea"
              value={data.consulthour}
              onChange={handleChange}
              name="consulthour"
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
