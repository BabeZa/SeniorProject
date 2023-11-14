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

export default function Chapter2() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [click, setClick] = useState(false);
  const {
    data,
    setData,
    docId,
    canEdit,
    TQFId,
    multiinput,
    isEdit2,
    outcome,
    setOutcome,
  } = useContext(TQF3Context);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
    // console.log(e.target.value)
  };

  useEffect(() => {
    setData({ ...data, UpdateDate: moment().format("DD MMMM YYYY HH:mm:ss") });
  }, [click]);

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

  const handleoutcomeChange = (e, index) => {
    const list = [...data.outcome];
    const { name, value } = e.target;
    list[index][name] = value;
    setData({ ...data, outcome: list });
    console.log(data.outcome[index].text);
  };

  const outcomeAdd = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setData({
      ...data,
      outcome: [
        ...data.outcome,
        { id: "", tqf3_id: "", no: index + 1, text: "" },
      ],
    });
  };

  const outcomeRemove = (index) => {
    const list = [...data.outcome];
    const list2 = [...data.outcome_delete];
    if (list[index].id.length > 0) {
      list2.push({ outcome_id: list[index].id });
    }
    list.splice(index, 1);
    setData({ ...data, outcome: list, outcome_delete: list2 });
  };

  return (
    <>
      {/* {console.log("[TQF3] Chapter2.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
            </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter2.title")}</h1>
        </div>
        <br />
        <div>
          <h2>{t("tqf3.chapter2.t1")}</h2>
          {/* {data.outcome.map((el,index) => {
                    return (
                        <div key={index}>
                            <input readOnly="readOnly" type="text" className="document-input MyInput" name="text" value={data.outcome[index].text} />
                        </div>
                    );
                })} */}
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.outcome}
            name="outcome"
            onKeyDown={onKeyDown}
          ></textarea>
        </div>
        <div>
          <h2>{t("tqf3.chapter2.t2")}</h2>
          <textarea
            readOnly="readOnly"
            className="document-textarea MyTextarea"
            value={data.objective}
            name="objective"
            onKeyDown={onKeyDown}
          ></textarea>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "tqf3" : "tqf3  none"}>
        <form>
          <div className="text-center">
            <h1>{t("tqf3.chapter2.title")}</h1>
          </div>
          <br />
          <div>
            <h2>{t("tqf3.chapter2.t1")}</h2>
            {/* {data.outcome.map((el,index) => {
                    return (
                        <div key={index}>
                            <input type="text" placeholder="จุดมุ่งหมายของรายวิชา" className="document-input MyInput MyInput" name="text" value={el.text} onChange={e => handleoutcomeChange(e,index) } />
                            <div className="inline">
                            {1 !== data.outcome.length && index === data.outcome.length - 1 ? <button type="submit" className="btn-minus" onClick={() => outcomeRemove(index)} ><i class="fas fa-minus"/></button> : ""}
                            {index === data.outcome.length - 1 ? <button type="submit" className="btn-plus" onClick={e => outcomeAdd(e,index)} ><i class="fas fa-plus"/></button> : ""}
                            </div>
                        </div>
                    );
                })} */}
            <textarea
              placeholder={t("tqf3.chapter2.t1")}
              className="document-textarea MyTextarea"
              value={data.outcome}
              onChange={handleChange}
              name="outcome"
              onKeyDown={onKeyDown}
            ></textarea>
          </div>
          <div>
            <h2>{t("tqf3.chapter2.t2")}</h2>
            <textarea
              placeholder={t("tqf3.chapter2.t2")}
              className="document-textarea MyTextarea"
              value={data.objective}
              onChange={handleChange}
              name="objective"
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
