import React, { useState, useContext, useEffect, useMemo } from "react";
import "../../components/Head.css";
import "./WeekSNote.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { toast } from "react-toastify";
import {
  AuthContext,
  ProfileContext,
  WeekSNoteContext,
} from "../../context/index";
import { useHistory } from "react-router-dom";
import PostgreAPI from "../../apis/PostgreAPI";
import Bar from "../Professor/002bar";
import WeekCLO from "./WeekCLO";
import autosize from "autosize";
import Modal from "react-modal";
import RangeSlider from "react-bootstrap-range-slider";
import ProfessorHead from "../Professor/ProfessorHead";

export default function WeekSNoteDetail(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const { profile, setProfile } = useContext(ProfileContext);
  const {
    subjectID,
    setSubjectID,
    modalCLOIsOpen,
    setModalCLOIsOpen,
    WeekSNoteData,
    setWeekSNoteData,
    TeachplanData,
    setTeachplanData,
  } = useContext(WeekSNoteContext);
  const { isAuthenticated, loading } = useContext(AuthContext);

  const [courseList, setCourseList] = useState([
    {
      id: "",
      code: "",
      engname: "",
      study_time: "",
    },
  ]);
  const [popupShow, setPopupShow] = useState("0");
  // const [page, setPage] = useState(0);
  const [isSetID, setIsSetID] = useState(false);

  useMemo(() => {
    setSubjectID(props.match.params.id);
    setIsSetID(true);
  }, []);

  const fetchweeksnote = async (weeksnoteid) => {
    PostgreAPI.get("/weeksnote/get2/" + weeksnoteid)
      .then((res) => {
        console.log(res.data);
        setWeekSNoteData(res.data);
        autosize.update(document.querySelectorAll("textarea"));
      })
      .catch((error) => {
        console.log("[WeekSNote.js] weeksnote1 Postgre not found!!");
        // setPageNotFound(true);
        console.error(error);
      });
    PostgreAPI.get("/weeksnote/getteachplan/" + weeksnoteid)
      .then((res) => {
        console.log("[WeekSNoteDetail.js] Teachplandata", res.data);
        setTeachplanData(res.data);
        autosize.update(document.querySelectorAll("textarea"));
      })
      .catch((error) => {
        console.log("[WeekSNote.js] weeksnote2 Postgre not found!!");
        // setPageNotFound(true);
        console.error(error);
      });
  };

  const getcourseall = async () => {
    PostgreAPI.get("/weeksnote/getall")
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // if (loading && profile.successful) {
    if (loading && isSetID) {
      if (isAuthenticated) {
        PostgreAPI.get("/employee/getprofile")
          .then((res) => {
            console.log("[WeekSNote.js] Data: ", res.data);
            setProfile(res.data);
            getcourseall();
          })
          .catch((error) => {
            console.error(error);
          });
        // fetchweeksnote("YrA5waEubMpc2S9wxOkVOwGFtbpCPt");
      } else {
        history.push("/");
      }

      // if(subjectID === '0'){
      //   console.log("subjectID === '0' -> back");
      //   history.push('/professor/weeksnote/');
      // }
    }
  }, [loading, isAuthenticated]);

  useEffect(() => {
    if (subjectID !== "0") {
      fetchweeksnote(subjectID);
    }
  }, [subjectID]);

  useEffect(() => {
    autosize(document.querySelectorAll("textarea"));
  }, [WeekSNoteData.current_week]);

  const handleTeachplanChange = (e, index) => {
    if (e.target.validity.valid) {
      const list = [...TeachplanData];
      const { name, value } = e.target;
      const realindex = list.findIndex((x) => x.week == index);
      list[realindex][name] = value;
      // console.log("[WeekSNote.js] list[index2][name]:", list[realindex][name])
      setTeachplanData(list);
    }
  };

  const handlecheckbox = (e, index, subarrayname, index2) => {
    e.stopPropagation();
    const list = [...TeachplanData];
    const realindex = list.findIndex((x) => x.week == index);
    list[realindex][subarrayname][index2].checked = !list[realindex][
      subarrayname
    ][index2].checked;
    setTeachplanData(list);
  };

  const handleslider = (e) => {
    const value = e.target.value;
    setWeekSNoteData((prev) => ({ ...WeekSNoteData, current_week: value - 1 }));
  };

  // const handlepagebutton = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name
  //   console.log("[WeekSNote.js] handlepagebutton e:",e.target.name);
  //   console.log("[WeekSNote.js] handlepagebutton name:",name);

  //   if(name == "plus" && WeekSNoteData.current_week < TeachplanData.length-1){
  //     setWeekSNoteData(prev => ({...prev,current_week:prev.current_week+1}))
  //   }else if(name == "minus" && WeekSNoteData.current_week > 0){
  //     setWeekSNoteData(prev => ({...prev,current_week:prev.current_week-1}))
  //   }
  // }
  const handlepagebutton = (name) => {
    // console.log("[WeekSNote.js] handlepagebutton name:",name);

    if (
      name == "plus" &&
      WeekSNoteData.current_week < TeachplanData.length - 1
    ) {
      setWeekSNoteData((prev) => ({
        ...prev,
        current_week: prev.current_week + 1,
      }));
    } else if (name == "minus" && WeekSNoteData.current_week > 0) {
      setWeekSNoteData((prev) => ({
        ...prev,
        current_week: prev.current_week - 1,
      }));
    }
  };

  const handleTab = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
  };
  const updateWeekSNote = () => {
    updateWeekSNoteCLO();
    // updateTeachplanData()
  };

  const updateWeekSNoteCLO = () => {
    PostgreAPI.put("/weeksnote/update-clo/" + subjectID, WeekSNoteData)
      .then((res) => {
        updateTeachplanData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTeachplanData = () => {
    PostgreAPI.put("/weeksnote/update-teachplan/" + subjectID, TeachplanData)
      .then((res) => {
        toast.success("Update Successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ------------------------------------------- Share -------------------------------------------------------
  const ShareURL = () => {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Copy URL Successfully!");
  };
  // -------------------------------------------end Share-------------------------------------------------------

  const createTQF5 = () => {
    if (window.confirm("Are you sure to create TQF5?")) {
      PostgreAPI.post("/tqf5/create-or-not/" + subjectID)
        .then((res) => {
          console.log("[WeekSNote.js] createTQF5:", res.data);
          if (res.data.AlreadyExist === true) {
            toast.success("This tqf5 is already exist");
          } else {
            toast.success("Create a tqf5 successfully");
          }
          history.push("/document/tqf5/detail/" + res.data.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <Modal
        isOpen={modalCLOIsOpen}
        onRequestClose={() => setModalCLOIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {" "}
        <WeekCLO />{" "}
      </Modal>
      <ProfessorHead />
      <div className="sticky-container">
        <div className="absolute-container">
          <div className="save-bar-container">
            <div className="save-bar">
              {/* <div className="save-bar-item a">
                        <i className="fal fa-edit"></i>
                        <label>แก้ไข</label>
                    </div>
                    <hr/> */}
              <div className="save-bar-item a" onClick={updateWeekSNote}>
                <i className="fal fa-save"></i>
                <label>บันทึก</label>
              </div>
              <hr />
              <div className="save-bar-item c" onClick={ShareURL}>
                <i className="fal fa-share-square"></i>
                <label>แชร์</label>
              </div>
              {/* <hr />
                <div className="save-bar-item c">
                  <i className="fal fa-file-alt"></i>
                  <label>แผนการสอน</label>
                </div>
                <hr />
                <div className="save-bar-item c">
                  <i className="fal fa-file-import"></i>
                  <label>สรุป</label>
                </div> */}
            </div>
          </div>
        </div>
      </div>
      <>
        {/* <div className="weeksnote-backbar-container">
            <div className="weeksnote-backbar-bar" onClick={() => setSubjectID('0')}>
              <i className="fas fa-chevron-left"></i>
              <div className="weeksnote-list-item-text">
                <h1>Back</h1>
              </div>
            </div>
          </div> */}
        <div className="container-center">
          <div className="weeksnote-week-container">
            <div className="weeksnote-course-clo">
              <div className="weeksnote-course-detail">
                <div className="weeksnote-course-detail-head">
                  <h1>รายละเอียดวิชา</h1>
                </div>
                <div className="flex-row">
                  <div className="weeksnote-course-detail-text">
                    {console.log("[WeekSNote.js] render")}
                    <h2>ชื่อวิชา : {WeekSNoteData.engname}</h2>
                    <h2>รหัสวิชา : {WeekSNoteData.code}</h2>
                    <h2>หน่วยกิต : {WeekSNoteData.credit}</h2>
                  </div>
                  <div className="row-gap"></div>
                  <div className="weeksnote-course-detail-text">
                    <h2>
                      ภาคการศึกษา/ชั้นปีที่เรียน : {WeekSNoteData.termyear_code}
                    </h2>
                    <h2>วันและเวลาเรียน : {WeekSNoteData.study_time}</h2>
                    <h2>
                      จำนวนนักศึกษาทั้งหมด : {WeekSNoteData.no_students || ""}
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className="weeksnote-clo"
                onClick={() => setModalCLOIsOpen(true)}
              >
                <div className="weeksnote-clo-center">
                  <h1>การสรุป</h1>
                  <h1>รายวิชา</h1>
                  <h1>ด้วย CLO</h1>
                </div>
              </div>
            </div>
            {TeachplanData.length - 1 === WeekSNoteData.current_week && (
              <div align="right" className="mt-1">
                <button
                  className="MyButton2 btn-next-step font-weight-bold"
                  onClick={createTQF5}
                >
                  เอกสารการสรุปและรวบรวมข้อเสนอแนะ
                  <i className="far fa-chevron-right"></i>
                </button>
              </div>
            )}
            <div className="weeksnote-range-slider">
              <br />
              {/* <input style={{width:"460px"}} type="range" min="0" step="1" max={TeachplanData.length-1} value={WeekSNoteData.current_week} onChange={handleslider} /> */}
              {/* <button className="modal-weeksnote-save-btn" name="minus" onClick={handlepagebutton} > {"<"} </button> */}
              <div
                className="weeksnote-range-slider-arrows"
                name="minus"
                onClick={() => handlepagebutton("minus")}
              >
                <i className="far fa-chevron-left" name="minus"></i>
              </div>

              <div
                style={{
                  width: "460px",
                  padding: "1em",
                  boxSizing: "border-box",
                }}
              >
                <RangeSlider
                  min={1}
                  max={TeachplanData.length}
                  step={1}
                  tooltip={modalCLOIsOpen ? "off" : "on"}
                  tooltipPlacement="top"
                  value={WeekSNoteData.current_week + 1}
                  onChange={handleslider}
                />
              </div>
              {/* <button className="modal-weeksnote-save-btn" name="plus" onClick={handlepagebutton}> {">"} </button> */}
              <div
                className="weeksnote-range-slider-arrows"
                name="plus"
                onClick={() => handlepagebutton("plus")}
              >
                <i className="far fa-chevron-right" name="plus"></i>
              </div>
            </div>
            {TeachplanData.filter(
              (x) =>
                x.week ==
                (WeekSNoteData.current_week ? WeekSNoteData.current_week : 0)
            ).map((el, index) => (
              <div>
                <div className="weeksnote-week">
                  <h1>สัปดาห์ที่ {el.week + 1}</h1>
                  <p className="text-pink text-center">
                    **เมื่อทำบันทึกจนถึงสัปดาห์สุดท้ายของการสอน
                    ถึงจะสามารถสร้างเอกสารการสรุปและรวบรวมข้อเสนอแนะได้
                  </p>
                  <div className="weeksnote-week-bar a">
                    <div className="weeksnote-week-bar-head">
                      <h2>เนื้อหา</h2>
                    </div>
                    <p style={{ wordWrap: "break-word" }}>{el.title || ""}</p>
                    <textarea
                      className="MyTextarea weeksnote-week-textarea a "
                      placeholder="เนื้อหาเมื่อสอนจริง"
                      name="activity_note"
                      value={el.activity_note || ""}
                      onChange={(e) => handleTeachplanChange(e, el.week)}
                      onKeyDown={handleTab}
                    ></textarea>
                    <div className="flex-row">
                      <textarea
                        className="MyTextarea weeksnote-week-textarea b"
                        placeholder="ทำไมถึงไม่เป็นไปตามแผน"
                        name="why_not_plan"
                        value={el.why_not_plan || ""}
                        onChange={(e) => handleTeachplanChange(e, el.week)}
                        onKeyDown={handleTab}
                      ></textarea>
                      <div className="row-gap"></div>
                      <textarea
                        className="MyTextarea weeksnote-week-textarea c"
                        placeholder="แนวทางแก้ไข"
                        name="sol_not_plan"
                        value={el.sol_not_plan || ""}
                        onChange={(e) => handleTeachplanChange(e, el.week)}
                        onKeyDown={handleTab}
                      ></textarea>
                    </div>
                  </div>
                  <div className="weeksnote-week-bar b">
                    <div className="weeksnote-week-bar-head">
                      <h2>ชั่วโมง</h2>
                    </div>
                    <p>ชั่วโมงตามแผน : {el.hour} ชั่วโมง</p>
                    <div className="flex-row">
                      <input
                        className="MyInput weeksnote-week-input"
                        placeholder="ชั่วโมงเมื่อสอนจริง"
                        name="real_hour"
                        value={el.real_hour || ""}
                        onChange={(e) => handleTeachplanChange(e, el.week)}
                      ></input>
                      <div className="row-gap"></div>
                      <textarea
                        className="MyTextarea weeksnote-week-textarea c"
                        placeholder="เหตุผลที่การสอนจริงต่างจากแผนการสอน"
                        name="reason_note"
                        value={el.reason_note || ""}
                        onChange={(e) => handleTeachplanChange(e, el.week)}
                        onKeyDown={handleTab}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="weeksnote-week-bar c">
                    <div className="weeksnote-week-bar-head">
                      <h2>วิธีการสอน</h2>
                    </div>
                    <p>{el.activity || ""}</p>
                  </div>

                  <div className="weeksnote-week-bar d">
                    <div className="weeksnote-week-bar-head">
                      <h2>วิธีการประเมิน</h2>
                    </div>

                    <div className="weeksnote-table-dropdownshow-text">
                      {el.Evaluations.map((el2, index2) => (
                        <span
                          onClick={(e) =>
                            handlecheckbox(e, el.week, "Evaluations", index2)
                          }
                        >
                          <input type="checkbox" checked={el2.checked} />
                          <h2 style={{ wordWrap: "break-word" }}>
                            {el2.howeva}
                          </h2>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="weeksnote-week-bar d">
                    <div className="weeksnote-week-bar-head">
                      <h2>CLO</h2>
                    </div>

                    <div className="weeksnote-table-dropdownshow-text">
                      {el.EvaCLO.map((el3, index3) => (
                        <span
                          onClick={(e) =>
                            handlecheckbox(e, el.week, "EvaCLO", index3)
                          }
                        >
                          <input type="checkbox" checked={el3.checked} />
                          <h2 style={{ wordWrap: "break-word" }}>
                            {el3.value}
                          </h2>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(TeachplanData, null, 2)}</pre></div> */}
          {/* <div style={{ marginTop: 20 }}><pre>{TeachplanData.length-1+"-"+ WeekSNoteData.current_week}</pre></div> */}
        </div>
      </>
    </>
  );
}

// export default WeekSNoteDetail
