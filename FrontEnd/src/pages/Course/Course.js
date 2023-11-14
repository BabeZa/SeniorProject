import React, { useState, useContext, useEffect } from "react";
import "./Course.css";
import { useTranslation } from "react-i18next";
import PostgreAPI from "../../apis/PostgreAPI";
import autosize from "autosize";
import { useHistory } from "react-router-dom";

export default function Course(props) {
  const history = useHistory();
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState([]);
  const [courseProfessor, setCourseProfessor] = useState([]);
  const [courseAssistant, setCourseAssistant] = useState([]);
  const [courseTermYear, setCourseTermYear] = useState("", "");

  useEffect(() => {
    PostgreAPI.get("/tqf3/get-course/" + props.match.params.id)
      .then((res) => {
        console.log(res.data[0]);
        setCourseData(res.data[0]);
        setCourseProfessor(res.data[0].Professor);
        setCourseAssistant(res.data[0].Assistant);
        var temp = res.data[0].termyear_code.split("/");
        if (localStorage.getItem("i18nextLng") == "th") {
          setCourseTermYear(
            "ภาคเรียนที่ " +
              temp[0] +
              " ปีการศึกษา " +
              (parseInt(temp[1]) + 543)
          );
        } else {
          setCourseTermYear("Semester " + temp[0] + " year " + temp[1]);
        }

        autosize(document.querySelectorAll("textarea"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const gogo = (e) => {
    e.preventDefault();
    // console.log("[Course/Card.js] e:",e.target.tagName.toLowerCase());
    if (e.target.tagName.toLowerCase() === "a") {
      //   console.log("[Course/Card.js] e:",e.target.href.replace("/course/detail", ""));
      window.open(e.target.href.replace("/course/detail", ""), "_blank");
    }
  };

  const goToNote = () => {
    history.push("/document/tqf3/detail/" + courseData.id);
  };

  return (
    <>
      <div className="Head">
        <div className="Head-content">
          <div>
            <label>{courseData.engname}</label>
          </div>
          <div className="Head-title3">
            <label>
              {(localStorage.getItem("i18nextLng") == "th"
                ? courseProfessor.thainame
                : courseProfessor.engname) +
                " / " +
                courseTermYear}
            </label>
          </div>
        </div>
      </div>

      <div className="container-center">
        <div className="document-content">
          <br />
          <div className="document-course-container">
            <div className="flex-row document-course-head">
              <i className="fal fa-info-circle"></i>
              <h1>ข้อมูลทั่วไป</h1>
            </div>
            <table className="document-course-table1">
              <tr>
                <th>รหัสและชื่อรายวิชา</th>
                <td>
                  {courseData.code +
                    " " +
                    courseData.engname +
                    "(" +
                    courseData.thainame +
                    ")"}
                </td>
              </tr>
              <tr>
                <th>หน่วยกิต</th>
                <td>{courseData.credit}</td>
              </tr>
              <tr>
                <th>อาจารย์ผู้สอน</th>
                <td>
                  <a
                    href={"personnel/detail/" + courseProfessor.employee_id}
                    onClick={(e) => gogo(e)}
                  >
                    {localStorage.getItem("i18nextLng") == "th"
                      ? courseProfessor.thainame
                      : courseProfessor.engname}
                  </a>{" "}
                  อาจารย์ผู้สอน
                  {courseAssistant.map((item) => (
                    <>
                      <br />
                      <a
                        href={"personnel/detail/" + item.employee_id}
                        onClick={(e) => gogo(e)}
                      >
                        {localStorage.getItem("i18nextLng") == "th"
                          ? item.thainame
                          : item.engname}
                      </a>{" "}
                      อาจารย์ผู้ช่วยสอน
                    </>
                  ))}
                </td>
              </tr>
              <tr>
                <th>ภาคเรียน/ปีการศึกษา</th>
                <td>{courseTermYear}</td>
              </tr>
              <tr>
                <th>รายวิชาที่ต้องเรียนมาก่อน</th>
                <td>{courseData.pre_requisites_st}</td>
              </tr>
              <tr>
                <th>สถานที่เรียน</th>
                <td>{courseData.place}</td>
              </tr>
              <tr>
                <th>วันเวลาที่สอน</th>
                <td>{courseData.study_time}</td>
              </tr>
              <tr>
                <th>จำนวนนักศึกษา</th>
                <td>{courseData.no_students} คน</td>
              </tr>
            </table>
            <div align="right">
              <button
                className="MyButton2 btn-next-step font-weight-bold"
                onClick={goToNote}
              >
                แผนการสอน<i className="far fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <br />
          <div className="document-course-container">
            <div className="flex-row document-course-head">
              <i className="fal fa-bullseye-arrow"></i>
              <h1>วัตถุประสงค์</h1>
            </div>
            <div className="document-course-text">
              <textarea
                readOnly="readOnly"
                className="MyTextarea document-course-textarea"
                value={courseData.outcome}
              ></textarea>
            </div>
          </div>
          <br />
          <div className="document-course-container">
            <div className="flex-row document-course-head">
              <i className="fal fa-user-chart"></i>
              <h1>รายละเอียด</h1>
            </div>
            <div className="document-course-text">
              <textarea
                readOnly="readOnly"
                className="MyTextarea document-course-textarea"
                value={courseData.description}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
