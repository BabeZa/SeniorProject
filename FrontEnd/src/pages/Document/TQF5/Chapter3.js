import React, { useEffect, useContext } from "react";
import { TQF5Context } from "../../../context/TQF5Context";
import StaticTable from "./component/StaticTable";

const Chapter3 = () => {
  const {
    TQF5data,
    setTQF5data,
    handleChange,
    handleArrayChange,
    isEdit,
  } = useContext(TQF5Context);

  const { no_students, remain_students, student_grade } = TQF5data;

  const percentValue = (el) => {
    let value =
      (el?.student_amount * 100) /
        (TQF5data.remain_students
          ? TQF5data.remain_students
          : TQF5data.no_students) || undefined;

    return value ? value.toFixed(2) : value;
  };
  const setWithdrawStudents = () => {
    let value = no_students - remain_students;
    setTQF5data((prev) => ({ ...prev, withdraw_students: value }));
  };

  useEffect(() => {
    if (!(no_students && remain_students)) return;
    setWithdrawStudents();
  }, [no_students, remain_students]);

  // const setPercent = (grade) => {
  //   if (!grade.student_amount) return;
  //   let list = student_grade;
  //   const index = student_grade.indexOf(grade);
  //   let value =
  //     (grade["amount"] * 100) /
  //     (remain_students ? remain_students : no_students);
  //   value = parseFloat(value.toFixed(2));
  //   list[index]["percent"] = value;
  //   setTQF5data((prev) => ({ ...prev, student_grade: list }));
  // };

  // useEffect(() => {
  //   student_grade.map((grade) => {
  //     setPercent(grade);
  //   });
  // });

  return (
    <form>
      {/* {console.log("[TQF5.js] chapter3.js render")} */}
      <div>
        <h1>หมวดที่ 3 สรุปผลการจัดการเรียนการสอนของรายวิชา</h1>
      </div>
      <br />
      <div>
        <h2>1. ข้อมูลทั่วไปของนักศึกษาต่อรายวิชา</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <p className="subtitle">จำนวนนักศึกษาที่ลงทะเบียนเรียน</p>
              </td>
              <td>
                <input
                  className="document-input MyInput input-bordered"
                  readOnly={!isEdit}
                  name="no_students"
                  type="number"
                  value={TQF5data.no_students || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="subtitle">
                  จำนวนนักศึกษาที่คงอยู่เมื่อสิ้นสุดภาคการศึกษา
                </p>
              </td>
              <td>
                <input
                  className="document-input MyInput input-bordered"
                  readOnly={!isEdit}
                  name="remain_students"
                  type="number"
                  value={TQF5data.remain_students || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p className="subtitle">จำนวนนักศึกษาที่ถอน</p>
              </td>
              <td>
                <input
                  className="document-input MyInput input-bordered"
                  readOnly={!isEdit}
                  name="withdraw_students"
                  type="number"
                  value={TQF5data.withdraw_students || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p>{/* <pre>{JSON.stringify(TQF5data, null, 2)}</pre> */}</p>
      </div>
      <div>
        <h2>2. การกระจายของระดับคำแนน</h2>
        <table className="document-textarea-table table-borderless table-hover">
          <colgroup>
            <col style={{ width: "var(--ww-2)" }} />
            <col style={{ width: "var(--ww-2)" }} />
            <col style={{ width: "var(--ww-2)" }} />
          </colgroup>
          <thead>
            <tr>
              <th>ระดับเกรดคะแนน</th>
              <th>จำนวนนักศึกษา</th>
              <th>ร้อยละ</th>
            </tr>
          </thead>
          <tbody>
            {TQF5data.student_grade?.map((el, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td style={{ textAlign: "center" }}>{el.grade}</td>
                  <td>
                    <input
                      className="MyInput input-bordered"
                      readOnly={!isEdit}
                      name="student_amount"
                      type="number"
                      value={el?.student_amount || undefined}
                      onChange={(e) =>
                        handleArrayChange(e, "student_grade", el)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="MyInput input-bordered"
                      name="percent"
                      type="text"
                      value={percentValue(el)}
                      readOnly
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>3. ปัจจัยที่ทำให้ระดับคะแนนผิดปกติ</h2>
        <input
          style={{ width: 700 }}
          type="text"
          className="document-input MyInput input-bordered"
          readOnly={!isEdit}
          name="error_score"
          placeholder={"ปัจจัยที่ทำให้ระดับคะแนนผิดปกติ"}
          value={TQF5data.error_score || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <h2>
          4. ความคลาดเคลื่อนจากแผนการประเมินผลที่กำหนดไว้ในรายละเอียดของรายวิชา
        </h2>
        <p>4.1 ความคลาดเคลื่อนด้านกำหนดเวลาการประเมิน</p>
        <StaticTable
          columns={[
            { name: "error", label: "ความคลาดเคลื่อน" },
            { name: "reason", label: "เหตุผล" },
          ]}
          datas={TQF5data.error_timeeva}
          arrayname={"error_timeeva"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
        <p>4.2 ความคลาดเคลื่อนด้านวิธีการประเมินผลการเรียนรู้</p>
        <StaticTable
          columns={[
            { name: "error", label: "ความคลาดเคลื่อน" },
            { name: "reason", label: "เหตุผล" },
          ]}
          datas={TQF5data.error_howeva}
          arrayname={"error_howeva"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
      <div>
        <h2>5. การทวนสอบผลสมฤทธิ์ของนักศึกษา</h2>
        <StaticTable
          columns={[
            { name: "reconsider", label: "วิธีการทวนสอบ" },
            { name: "conclude", label: "สรุปผล" },
          ]}
          datas={TQF5data.student_reconsider}
          arrayname={"student_reconsider"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
    </form>
  );
};

export default Chapter3;
