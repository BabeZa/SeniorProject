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

export default function Chapter4() {
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

  const handleCLOChange = (e, index) => {
    e.preventDefault();
    const list = [...data.CLO];
    const { name, value } = e.target;
    if (name === "criterion") {
      list[index][name] = parseInt(value);
    } else {
      list[index][name] = value;
    }
    setData((prevdata) => ({ ...prevdata, CLO: list }));
  };

  const CLOadd = (e, index) => {
    e.preventDefault();
    let list = [...data.CLO];
    const object = {};
    for (const key in list[0]) {
      if (key == "index") {
        object[key] = index + 1;
      } else if (key == "criterion" || key == "pass") {
        object[key] = null;
      } else {
        object[key] = "";
      }
    }
    list = [...list, object];
    setData((prevdata) => ({ ...prevdata, CLO: list }));
  };

  const CLOremove = (e, index) => {
    e.preventDefault();
    const list = [...data.CLO];
    const list2 = [...data.CLO_delete];
    if (
      list[index].id.length > 0 &&
      !list[index].tqf2course_clo_id.length > 0
    ) {
      list2.push({ CLO_id: list[index].id });
    }
    if (!list[index].tqf2course_clo_id.length > 0) {
      list.splice(index, 1);
    }
    setData((prevdata) => ({ ...prevdata, CLO: list, CLO_delete: list2 }));
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
      {/* {console.log("[TQF3] Chapter4.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                    {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
                </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter4.title")}</h1>
        </div>
        <h2>1. {t("tqf3.chapter4.t1")}</h2>
        {data.CLO.map((el, index) => {
          return (
            <div className="tqf3-chapter4-table" key={index}>
              <div className="tqf3-chapter4-table-head">
                <h3>CLO {index + 1}</h3>
              </div>
              <div className="tqf3-chapter4-table-content">
                <div className="tqf3-chapter4-table-container l1">
                  <textarea
                    readOnly="readOnly"
                    className="tqf3-chapter4-table-textarea l1 MyTextarea"
                    value={el.text || ""}
                    name="text"
                    onChange={(e) => handleCLOChange(e, index)}
                  />
                  <input
                    readOnly="readOnly"
                    type="text"
                    className="tqf3-chapter4-table-input l1 MyInput"
                    value={el.criterion ? el.criterion + "%" : ""}
                    name="criterion"
                    onChange={(e) => handleCLOChange(e, index)}
                  />
                </div>
                <h5>{t("tqf3.chapter4.t4")}</h5>
                <textarea
                  readOnly="readOnly"
                  className="tqf3-chapter4-table-textarea MyTextarea"
                  value={el.howteach || ""}
                  name="howteach"
                  onChange={(e) => handleCLOChange(e, index)}
                />

                <h5>{t("tqf3.chapter4.t5")}</h5>
                <textarea
                  readOnly="readOnly"
                  className="tqf3-chapter4-table-textarea MyTextarea"
                  value={el.howeva || ""}
                  name="howeva"
                  onChange={(e) => handleCLOChange(e, index)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "tqf3" : "tqf3  none"}>
        <form>
          {/* <div className="edit-container">
                    <img src={ Delete } onClick={() => setIsEdit(false)} className="tqf-edit" />
                </div> */}
          {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(data, null, 2)}</pre></div> */}

          <div className="text-center">
            <h1>{t("tqf3.chapter4.title")}</h1>
          </div>
          <h2>1. {t("tqf3.chapter4.t1")}</h2>
          {data.CLO.map((el, index) => {
            return (
              <div className="tqf3-chapter4-table edit" key={index}>
                <div className="tqf3-chapter4-table-head">
                  <h3>CLO {index + 1}</h3>
                </div>
                <div className="tqf3-chapter4-table-content">
                  <div className="tqf3-chapter4-table-container l1">
                    <textarea
                      placeholder={t("tqf3.chapter4.t2")}
                      className="tqf3-chapter4-table-textarea l1 MyTextarea"
                      value={el.text || ""}
                      name="text"
                      onChange={(e) => handleCLOChange(e, index)}
                    />
                    <input
                      type="number"
                      style={{ fontSize: "14px" }}
                      placeholder={t("tqf3.chapter4.t3")}
                      className="tqf3-chapter4-table-input l1 MyInput"
                      value={el.criterion || ""}
                      name="criterion"
                      onChange={(e) => handleCLOChange(e, index)}
                    />
                  </div>
                  <textarea
                    placeholder={t("tqf3.chapter4.t4")}
                    className="tqf3-chapter4-table-textarea MyTextarea"
                    value={el.howteach || ""}
                    name="howteach"
                    onChange={(e) => handleCLOChange(e, index)}
                  />
                  <div className="tqf3-chapter4-table-container l2">
                    <textarea
                      placeholder={t("tqf3.chapter4.t5")}
                      className="tqf3-chapter4-table-textarea MyTextarea"
                      value={el.howeva || ""}
                      name="howeva"
                      onChange={(e) => handleCLOChange(e, index)}
                    />

                    {1 !== data.CLO.length &&
                    index === data.CLO.length - 1 &&
                    !el.tqf2course_clo_id.length > 0 ? (
                      <button
                        type="submit"
                        className="btn-minus mytable"
                        onClick={(e) => CLOremove(e, index)}
                      >
                        <i className="fas fa-minus" />
                      </button>
                    ) : (
                      ""
                    )}
                    {index === data.CLO.length - 1 ? (
                      <button
                        type="submit"
                        className="btn-plus mytable"
                        onClick={(e) => CLOadd(e, index)}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="chapter-footer">
                    <button type="submit" className="chapter-footer-button" onClick={() => {setClick(!click)}}>บันทึกข้อมูล</button>
                </div> */}
          {/* <div><pre>{JSON.stringify(data.CLO, null, 2)}</pre></div> */}
        </form>
      </div>
    </>
  );
}
