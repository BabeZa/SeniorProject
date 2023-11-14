import React, { useState, useContext, useEffect, useRef } from "react";
import { TQF3Context } from "../../../context/TQF3Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Delete from "../../../assert/icon/delete.svg";
import edit from "../../../assert/icon/edit.svg";
import MongoAPI from "../../../apis/MongoAPI";
import { toast } from "react-toastify";
import moment from "moment";
import autosize from "autosize";

export default function Chapter5() {
  const { t } = useTranslation();
  const history = useHistory();
  const dragging = useRef(false);
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

  // useEffect(()=>{
  //     autosize(document.querySelectorAll('textarea'));
  // }, [data.Teachplan,data.Evaluationplan])

  const onKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
  };

  const handleweekChange = (e, index) => {
    e.preventDefault();
    if (e.target.validity.valid) {
      const list = [...data.Teachplan];
      const { name, value } = e.target;
      list[index][name] = value;
      setData({ ...data, Teachplan: list });
    }
  };

  const weekAdd = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    let professor = data.Teachplan[index]["professorweek"];
    if (index !== 0) {
      data.Teachplan[index]["hide"] = true;
    }
    setData({
      ...data,
      Teachplan: [
        ...data.Teachplan,
        {
          id: "",
          tqf3_id: "",
          week: index + 1,
          title: "",
          hour: 0,
          activity: "",
          professorweek: professor ? professor : "",
          activity_note: "",
          hide: false,
        },
      ],
    });
  };

  const weekRemove = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const list = [...data.Teachplan];
    const list2 = [...data.Teachplan_delete];
    if (list[index].id.length > 0) {
      list2.push({ Teachplan_id: list[index].id });
    }
    list[index - 1]["hide"] = false;
    list.splice(index, 1);
    setData({ ...data, Teachplan: list, Teachplan_delete: list2 });
  };

  const handleevaChange = (e, index) => {
    e.preventDefault();
    if (e.target.validity.valid) {
      const list = [...data.Evaluationplan];
      const { name, value } = e.target;
      list[index][name] = value;
      setData({ ...data, Evaluationplan: list });
    }
  };

  const evaAdd = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (index !== 0) {
      data.Evaluationplan[index]["hide"] = true;
    }
    setData({
      ...data,
      Evaluationplan: [
        ...data.Evaluationplan,
        {
          id: "",
          tqf3_id: "",
          evaactivity: index + 2,
          evaoutcome: "",
          howeva: "",
          evaweek: "",
          evaratio: "",
          hide: false,
        },
      ],
    });
  };

  const evaRemove = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const list = [...data.Evaluationplan];
    const list2 = [...data.Evaluationplan_delete];
    if (list[index].id.length > 0) {
      list2.push({ Evaluationsplan_id: list[index].id });
    }
    list[index - 1]["hide"] = false;
    list.splice(index, 1);
    setData({ ...data, Evaluationplan: list, Evaluationplan_delete: list2 });
  };

  const toggle = (e, index) => {
    e.preventDefault();
    if (!dragging.current) {
      const list = [...data.Evaluationplan];
      list[index]["hide"] = !data.Evaluationplan[index].hide;
      setData({ ...data, Evaluationplan: list });
    }
  };

  const weektoggle = (e, index) => {
    e.preventDefault();
    if (!dragging.current) {
      const list = [...data.Teachplan];
      list[index]["hide"] = !data.Teachplan[index].hide;
      setData({ ...data, Teachplan: list });
    }
  };

  const handleclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFocus = (e) => {
    e.stopPropagation();
    dragging.current = true;
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    if (dragging.current) {
      dragging.current = false;
    }
  };

  return (
    <>
      {/* {console.log("[TQF3] Chapter5.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                   {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
               </div> */}
        <div className="text-center">
          <h1>{t("tqf3.chapter5.title")}</h1>
        </div>
        <br />
        <h2>{t("tqf3.chapter5.t1.title")}</h2>
        <div>
          <table className="document-textarea-table table-borderless table-hover">
            <colgroup>
              <col style={{ width: "var(--ww-1)" }} />
              <col style={{ width: "var(--ww-2)" }} />
              <col style={{ width: "var(--ww-2)" }} />
              <col style={{ width: "var(--ww-1)" }} />
            </colgroup>
            <thead>
              <tr>
                <th>{t("tqf3.chapter5.t1.st1")}</th>
                <th style={{ whiteSpace: "pre-line" }}>
                  {t("tqf3.chapter5.t1.st6")}
                </th>
                <th>{t("tqf3.chapter5.t1.st4")}</th>
                <th>{t("tqf3.chapter5.t1.st5")}</th>
              </tr>
            </thead>
            <tbody>
              {data.Teachplan.map((el, index) => (
                <React.Fragment key={index}>
                  <tr onClick={(e) => weektoggle(e, index)}>
                    <td>
                      <h4>{index + 1}</h4>
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w2"
                            : "document-textarea MyTextarea mytable w2"
                        }
                        name="title"
                        onChange={(e) => handleweekChange(e, index)}
                        onClick={(e) => handleclick(e)}
                        value={
                          el.title +
                          ("\nจำนวนชั่วโมง : " + el.hour + " ชั่วโมง" || "")
                        }
                      />
                      {/* <input readOnly="readOnly" className={el.hide ? "document-textarea MyTextarea mytable hide bb w2" : "document-textarea MyTextarea mytable bb w2"} name="hour" value={"จำนวนชั่วโมง : "+el.hour+" ชั่วโมง" || ""} onChange={e => handleweekChange(e, index)} onClick={e => handleclick(e)} /> */}
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w2"
                            : "document-textarea MyTextarea mytable w2"
                        }
                        name="activity"
                        value={el.activity}
                        onChange={(e) => handleweekChange(e, index)}
                        onClick={(e) => handleclick(e)}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w1"
                            : "document-textarea MyTextarea mytable w1"
                        }
                        name="professorweek"
                        value={el.professorweek}
                        onChange={(e) => handleweekChange(e, index)}
                        onClick={(e) => handleclick(e)}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <br />
        <h2>{t("tqf3.chapter5.t2.title")}</h2>
        <div>
          <table className="document-textarea-table table-borderless table-hover">
            <colgroup>
              <col style={{ width: "var(--ww-1)" }} />
              <col style={{ width: "var(--ww-3)" }} />
              <col style={{ width: "var(--ww-1)" }} />
              <col style={{ width: "var(--ww-1)" }} />
            </colgroup>
            <thead>
              <tr>
                <th>{t("tqf3.chapter5.t2.st1")}</th>
                <th style={{ whiteSpace: "pre-line" }}>
                  {t("tqf3.chapter5.t2.st6")}
                </th>
                <th>{t("tqf3.chapter5.t2.st3")}</th>
                <th>{t("tqf3.chapter5.t2.st4")}</th>
              </tr>
            </thead>
            <tbody>
              {data.Evaluationplan.map((el, index) => (
                <React.Fragment key={index}>
                  <tr onClick={(e) => toggle(e, index)}>
                    <td>
                      <h4>{index + 1}</h4>
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w3"
                            : "document-textarea MyTextarea mytable w3"
                        }
                        name="howeva"
                        onChange={(e) => handleevaChange(e, index)}
                        onClick={(e) => handleclick(e)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={onKeyDown}
                        value={el.howeva + (+"\n" + el.evaratio + "%")}
                      />
                      {/* <input readOnly="readOnly" className={el.hide ? "document-textarea MyTextarea mytable hide bb w3" : "document-textarea MyTextarea mytable bb w3"} name="evaratio" value={el.evaratio+"%"} onChange={e => handleevaChange(e, index)} onClick={e => handleclick(e)} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={onKeyDown} /> */}
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w1"
                            : "document-textarea MyTextarea mytable w1"
                        }
                        name="evaoutcome"
                        value={el.evaoutcome}
                        onChange={(e) => handleevaChange(e, index)}
                        onClick={(e) => handleclick(e)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={onKeyDown}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly="readOnly"
                        className={
                          el.hide
                            ? "document-textarea MyTextarea mytable hide w1"
                            : "document-textarea MyTextarea mytable w1"
                        }
                        name="evaweek"
                        value={el.evaweek}
                        onChange={(e) => handleevaChange(e, index)}
                        onClick={(e) => handleclick(e)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "tqf3" : "tqf3  none"}>
        <form>
          {/* <div className="edit-container">
                   <img src={ Delete } onClick={() => setIsEdit(false)} className="tqf-edit" />
               </div> */}
          <div className="text-center">
            <h1>{t("tqf3.chapter5.title")}</h1>
          </div>
          <br />
          <h2>{t("tqf3.chapter5.t1.title")}</h2>
          <div>
            <table className="document-textarea-table edit table-borderless table-hover">
              <colgroup>
                <col style={{ width: "var(--ww-1)" }} />
                <col style={{ width: "var(--ww-2)" }} />
                <col style={{ width: "var(--ww-2)" }} />
                <col style={{ width: "var(--ww-1)" }} />
                <col style={{ width: "70px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>{t("tqf3.chapter5.t1.st1")}</th>
                  <th style={{ whiteSpace: "pre-line" }}>
                    {t("tqf3.chapter5.t1.st6")}
                  </th>
                  <th>{t("tqf3.chapter5.t1.st4")}</th>
                  <th>{t("tqf3.chapter5.t1.st5")}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {data.Teachplan.map((el, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={(e) => weektoggle(e, index)}>
                      <th>
                        <h4>{index + 1}</h4>
                      </th>
                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t1.st2")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w2"
                              : "document-textarea MyTextarea mytable w2"
                          }
                          name="title"
                          value={el.title}
                          onChange={(e) => handleweekChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                        <input
                          pattern="[0-9]*"
                          type="number"
                          placeholder={t("tqf3.chapter5.t1.st3")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide bb w2"
                              : "document-textarea MyTextarea mytable bb w2"
                          }
                          name="hour"
                          value={el.hour || ""}
                          onChange={(e) => handleweekChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </td>
                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t1.st4")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w2"
                              : "document-textarea MyTextarea mytable w2"
                          }
                          name="activity"
                          value={el.activity}
                          onChange={(e) => handleweekChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                      </td>
                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t1.st5")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w1"
                              : "document-textarea MyTextarea mytable w1"
                          }
                          name="professorweek"
                          value={el.professorweek}
                          onChange={(e) => handleweekChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                      </td>
                      <td>
                        {1 !== data.Teachplan.length &&
                        index === data.Teachplan.length - 1 ? (
                          <button
                            type="submit"
                            className="btn-minus mytable"
                            onClick={(e) => weekRemove(e, index)}
                          >
                            <i className="fas fa-minus" />
                          </button>
                        ) : (
                          ""
                        )}
                        {index === data.Teachplan.length - 1 ? (
                          <button
                            type="submit"
                            className="btn-plus mytable"
                            onClick={(e) => weekAdd(e, index)}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                      {/* <td>{index === data.Teachplan.length - 1 ? <button type="submit" className="btn-plus mytable" onClick={e => weekAdd(e,index)} ><i className="fas fa-plus"/></button> : ""}</td> */}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
          </div>

          <br />
          <h2>{t("tqf3.chapter5.t2.title")}</h2>
          <div>
            <table className="document-textarea-table edit table-borderless table-hover">
              <colgroup>
                <col style={{ width: "var(--ww-1)" }} />
                <col style={{ width: "var(--ww-3)" }} />
                <col style={{ width: "var(--ww-1)" }} />
                <col style={{ width: "var(--ww-1)" }} />
                <col style={{ width: "70px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>{t("tqf3.chapter5.t2.st1")}</th>
                  <th style={{ whiteSpace: "pre-line" }}>
                    {t("tqf3.chapter5.t2.st6")}
                  </th>
                  <th>{t("tqf3.chapter5.t2.st3")}</th>
                  <th>{t("tqf3.chapter5.t2.st4")}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {data.Evaluationplan.map((el, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={(e) => toggle(e, index)}>
                      <td>
                        <h4>{index + 1}</h4>
                      </td>

                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t2.st2")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w3"
                              : "document-textarea MyTextarea mytable w3"
                          }
                          name="howeva"
                          value={el.howeva}
                          onChange={(e) => handleevaChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                        <input
                          pattern="[0-9]*"
                          type="number"
                          placeholder={t("tqf3.chapter5.t2.st5")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide bb w3"
                              : "document-textarea MyTextarea mytable bb w3"
                          }
                          name="evaratio"
                          value={el.evaratio}
                          onChange={(e) => handleevaChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                      </td>
                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t2.st3")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w1"
                              : "document-textarea MyTextarea mytable w1"
                          }
                          name="evaoutcome"
                          value={el.evaoutcome}
                          onChange={(e) => handleevaChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onKeyDown={onKeyDown}
                        />
                      </td>
                      <td>
                        <textarea
                          placeholder={t("tqf3.chapter5.t2.st4")}
                          className={
                            el.hide
                              ? "document-textarea MyTextarea mytable hide w1"
                              : "document-textarea MyTextarea mytable w1"
                          }
                          name="evaweek"
                          value={el.evaweek}
                          onChange={(e) => handleevaChange(e, index)}
                          onClick={(e) => handleclick(e)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </td>
                      <td>
                        {1 !== data.Evaluationplan.length &&
                        index === data.Evaluationplan.length - 1 ? (
                          <button
                            type="submit"
                            className="btn-minus mytable"
                            onClick={(e) => evaRemove(e, index)}
                          >
                            <i className="fas fa-minus" />
                          </button>
                        ) : (
                          ""
                        )}
                        {index === data.Evaluationplan.length - 1 ? (
                          <button
                            type="submit"
                            className="btn-plus mytable"
                            onClick={(e) => evaAdd(e, index)}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="chapter-footer">
                   <button type="submit" className="chapter-footer-button" onClick={() => {setClick(!click)}}>บันทึกข้อมูล</button>
               </div> */}
        </form>
      </div>
    </>
  );
}
