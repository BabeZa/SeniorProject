import React, { useContext } from "react";
import Select from "react-select";
import { TQF5Context } from "../../../context/TQF5Context";

const Chapter1 = () => {
  const { TQF5data, handleChange, isEdit } = useContext(TQF5Context);
  return (
    <form>
      {/* {console.log("[TQF5.js] chapter1.js render")} */}
      {/* className={"document-input MyInput" + (isEdit ? " input-bordered" : "")} */}
      <div>
        <h1>หมวดที่ 1 ข้อมูลทั่วไป</h1>
      </div>
      <br />
      <div>
        <h2>1. รหัสวิชา, ชื่อรายวิชา และจำนวนหน่วยกิต</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  readOnly="readOnly"
                  className="document-input MyInput input-bordered"
                  name="code"
                  placeholder={"CPExxx"}
                  value={TQF5data.code || ""}
                />
              </td>
              <td>
                <input
                  type="text"
                  readOnly="readOnly"
                  className="document-input MyInput back input-bordered"
                  name="credit"
                  placeholder={"x (x-x-x)"}
                  value={TQF5data.credit || ""}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  readOnly="readOnly"
                  className="document-input MyInput input-bordered ww-6"
                  value={TQF5data.thainame || ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  readOnly="readOnly"
                  className="document-input MyInput input-bordered ww-6"
                  value={TQF5data.engname || ""}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>2. รายวิชาที่ต้องเรียนมาก่อน (Pre-requisite) (ถ้ามี)</h2>
        {/* <input className="document-input MyInput" type="text" value={data.pre_requi} onChange={handleChange} name='pre_requi' placeholder={t('tqf3.chapter1.t6')}/> */}
        <input
          type="text"
          readOnly="readOnly"
          className="document-input MyInput input-bordered ww-6"
          name="thainame"
          placeholder={"ชื่อวิชาภาษาไทย"}
          value={TQF5data.pre_requisites_st}
        />
        <input
          type="text"
          readOnly="readOnly"
          className="document-input MyInput input-bordered ww-6"
          name="engname"
          placeholder={"ชื่อวิชาภาษาอังกฤษ"}
          value={TQF5data.pre_requisites_nd || ""}
        />
      </div>
      <div>
        <h2>3. อาจารย์ผู้รับผิดชอบรายวิชาและอาจารย์ผู้สอน</h2>
        {TQF5data.Professor?.map((el, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              readOnly="readOnly"
              className="document-input MyInput input-bordered ww-4"
              name="engname"
              value={
                localStorage.getItem("i18nextLng") == "th"
                  ? (el.role == "main"
                      ? "อาจารย์ผู้สอน "
                      : "อาจารย์ผู้ช่วยสอน ") + el.thainame
                  : (el.role == "main" ? "Lecturer " : "Assistant ") +
                    el.engname
              }
            ></input>
          </React.Fragment>
        ))}
      </div>
      <div>
        <h2>4. ภาคการศึกษา/ชั้นปีที่เรียน</h2>
        <input
          type="text"
          readOnly="readOnly"
          className="document-input MyInput input-bordered"
          value={TQF5data.termyear_code || ""}
        />
      </div>
      <div>
        <h2>5. สถานที่เรียน</h2>
        <input
          type="text"
          readOnly="readOnly"
          className="document-input MyInput input-bordered"
          name="place"
          value={TQF5data.place || "KMUTT"}
        />
      </div>
      <div>
        <h2>6. วันเวลาที่สอน</h2>
        <input
          type="text"
          readOnly="readOnly"
          className="document-input MyInput input-bordered"
          name="study_time"
          value={TQF5data.study_time || ""}
        />
      </div>
    </form>
  );
};

export default Chapter1;
