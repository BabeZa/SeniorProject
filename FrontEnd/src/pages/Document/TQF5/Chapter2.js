import React, { useContext } from "react";
import { TQF5Context } from "../../../context/TQF5Context";
import StaticTable from "./component/StaticTable";

const Chapter2 = () => {
  const { TQF5data, handleArrayChange, isEdit } = useContext(TQF5Context);

  return (
    <form>
      {/* {console.log("[TQF5.js] chapter2.js render")} */}

      <div>
        <h1>หมวดที่ 2 การจัดการเรียนการสอนที่เปรียบเทียบกับแผนการสอน</h1>
      </div>
      <br />
      <div>
        <h2>1. รายงานชั่วโมงการสอนจริงเทียบกับแผนการสอน</h2>
        {/* <table className="document-textarea-table table-borderless table-hover">
          <colgroup>
            <col style={{ width: "var(--ww-2)" }} />
            <col style={{ width: "var(--ww-1)" }} />
            <col style={{ width: "var(--ww-1)" }} />
            <col style={{ width: "var(--ww-2)" }} />
          </colgroup>
          <thead>
            <tr>
              <th>หัวข้อ</th>
              <th style={{ whiteSpace: "pre-line" }}>
                จำนวนชั่วโมง{"\n"}ตามแผน{"\n"}การสอน
              </th>
              <th style={{ whiteSpace: "pre-line" }}>
                จำนวนชั่วโมง{"\n"}ที่สอนจริง
              </th>
              <th style={{ whiteSpace: "pre-line" }}>
                เหตุผลที่สอนจริง{"\n"}ต่างจากแผนการสอน
              </th>
            </tr>
          </thead>
          <tbody>
            {TQF5data.realvsplan.map((el, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="title"
                      value={el.title}
                      onChange={(e) => handleArrayChange(e, "realvsplan", el)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w1"
                      name="hour"
                      value={el.hour}
                      onChange={(e) => handleArrayChange(e, "realvsplan", el)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w1"
                      name="real_hour"
                      value={el.real_hour}
                      onChange={(e) => handleArrayChange(e, "realvsplan", el)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="reason_note"
                      value={el.reason_note}
                      onChange={(e) => handleArrayChange(e, "realvsplan", el)}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table> */}
        <StaticTable
          columns={[
            { name: "title", label: "หัวข้อ" },
            { name: "hour", label: "จำนวนชั่วโมง\nตามแผน\nการสอน" },
            { name: "real_hour", label: "จำนวนชั่วโมง\nที่สอนจริง" },
            {
              name: "reason_note",
              label: "เหตุผลที่สอนจริง\nต่างจากแผนการสอน",
            },
          ]}
          datas={TQF5data.realvsplan}
          arrayname={"realvsplan"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={true}
        />
      </div>
      <div>
        <h2>2. หัวข้อที่สอนไม่ครอบคลุมตามแผน</h2>
        {/* <table className="document-textarea-table table-borderless table-hover">
          <colgroup>
            <col style={{ width: "var(--ww-2)" }} />
            <col style={{ width: "var(--ww-2)" }} />
            <col style={{ width: "var(--ww-2)" }} />
          </colgroup>
          <thead>
            <tr>
              <th>หัวข้อ</th>
              <th style={{ whiteSpace: "pre-line" }}>
                นัยสำคัญของการสอน{"\n"}ที่ไม่ครอบคลุม
              </th>
              <th style={{ whiteSpace: "pre-line" }}>แนวทางการชดเชยและแก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {TQF5data.notplan.map((el, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="title"
                      value={el.title}
                      onChange={(e) => handleArrayChange(e, "notplan", el)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="why_not_plan"
                      value={el.why_not_plan}
                      onChange={(e) => handleArrayChange(e, "notplan", el)}
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="sol_not_plan"
                      value={el.sol_not_plan}
                      onChange={(e) => handleArrayChange(e, "notplan", el)}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table> */}
        <StaticTable
          columns={[
            { name: "title", label: "หัวข้อ" },
            {
              name: "why_not_plan",
              label: "นัยสำคัญของการสอน\nที่ไม่ครอบคลุม",
            },
            { name: "sol_not_plan", label: "แนวทางการชดเชยและแก้ไข" },
          ]}
          datas={TQF5data.notplan}
          arrayname={"notplan"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={true}
        />
      </div>
      <div>
        <h2>
          3.
          ประสิทธิผลของวิธีการสอนที่ทำให้เกิดผลการเรียนรู้ตามที่ระบุไว้ในรายละเอียดของรายวิชา
        </h2>
        {/* <table className="document-textarea-table table-borderless table-hover">
          <colgroup>
            <col style={{ width: "var(--ww-3)" }} />
            <col style={{ width: "var(--ww-1)" }} />
            <col style={{ width: "var(--ww-2)" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ whiteSpace: "pre-line" }}>
                CLO และ วิธีการสอนที่{"\n"}กำหนดในแผนการสอน
              </th>
              <th>ประสิทธิผล</th>
              <th style={{ whiteSpace: "pre-line" }}>
                ปัญหาของวิธีการสอน{"\n"}และแนวทางในการแก้ไข
              </th>
            </tr>
          </thead>
          <tbody>
            {TQF5data.teachplanperformance.map((el, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="CLO"
                      value={el.CLO}
                      onChange={(e) =>
                        handleArrayChange(e, "teachplanperformance", el)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="performance"
                      value={el.performance}
                      onChange={(e) =>
                        handleArrayChange(e, "teachplanperformance", el)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className="document-textarea MyTextarea mytable w2"
                      name="problem_solving"
                      value={el.problem_solving}
                      onChange={(e) =>
                        handleArrayChange(e, "teachplanperformance", el)
                      }
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table> */}
        <StaticTable
          columns={[
            { name: "clo", label: "CLO และ วิธีการสอน\nที่กำหนดในแผนการสอน" },
            {
              name: "performance",
              label: "ประสิทธิผล",
            },
            {
              name: "problem_solving",
              label: "ปัญหาของวิธีการสอน\nและแนวทางในการแก้ไข",
            },
          ]}
          datas={TQF5data.teachplanperformance}
          remain_students={TQF5data.remain_students}
          no_students={TQF5data.no_students}
          arrayname={"teachplanperformance"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={true}
        />
      </div>
    </form>
  );
};

export default Chapter2;
