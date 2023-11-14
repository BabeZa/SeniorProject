import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useContext,
} from "react";
import "./TQF2.css";
import MongoAPI from "../../../apis/MongoAPI";
import moment from "moment";
import autosize, { update } from "autosize";
import HeadTQF2 from "./HeadTQF2";
import { TQF2ContextProvider, TQF2Context } from "../../../context/index";
import PostgreAPI from "../../../apis/PostgreAPI";
import { toast } from "react-toastify";

const MyTQ2 = (props) => {
  const [textarea, setTextarea] = useState(true);
  const [toggleindex, setToggleindex] = useState(true);
  const {
    dataTQF2,
    setDataTQF2,
    documentData,
    setDocumentData,
    setCanEdit,
    canEdit,
    setIsEdit,
    isEdit,
  } = useContext(TQF2Context);
  const [pageNotFound, setPageNotFound] = useState(false);
  const prevvalue = useRef("");
  // const [form, setForm] = useState({
  //     input:""
  // })

  const fetchTQF = async (tqfid) => {
    PostgreAPI.get("/tqf2/get/" + tqfid)
      .then((res) => {
        // console.log("[TQF2.js] tqf2 get: ", res.data);

        setDataTQF2(res.data);
        autosize(document.querySelectorAll("textarea"));
        // setMultiinput(body.outcome);
      })
      .catch((error) => {
        console.log("[TQF3.js] tqf2 Postgre not found!!");
        setPageNotFound(true);
        console.error(error);
      });
  };

  useEffect(() => {
    PostgreAPI.get("/document/get/" + props.tempdocId)
      .then((res) => {
        // console.log("[TQF3.js] document get: ",res.data);
        setDocumentData(res.data);
        fetchTQF(res.data.documentdata_id);

        const body = { id: res.data.createby };

        PostgreAPI.post("/permissions/isme", body).then((res) => {
          if (res.data) {
            // console.log("[TQF3.js] isme: 1");
            setCanEdit(true);
          } else {
            // console.log("[TQF3.js] isme: 0");
            setCanEdit(false);
          }

          // console.log("[TQF3.js] isme: ", res.data);
        });
        // console.log("[TQF3.js] found: ",res);
      })
      .catch((error) => {
        console.log("[TQF2.js] DocumentData not found!!");
        setPageNotFound(true);
        console.error(error);
      });
    // fetchTQF()
  }, []);

  // useEffect(() => {
  //     console.log("data change : ",dataTQF2);
  // }, [dataTQF2])

  useEffect(() => {
    // const count = data.course.length
    let list = [...dataTQF2.course];
    for (const index in list) {
      list[index].index = parseInt(index);
    }
    setDataTQF2((prevdata) => {
      return { ...prevdata, course: list };
    });
  }, [toggleindex]);

  useEffect(() => {
    console.log("autosize work");
    autosize(document.querySelectorAll("textarea"));
  }, [textarea]);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.validity.valid) {
      const value = e.target.value;
      setDataTQF2((prevdata) => {
        return { ...prevdata, [e.target.name]: value };
      });
    }
  };

  const normalizecredit = (value, prevdata) => {
    console.log("value", value, "prevdata", prevdata);
    if (!value) return value;
    const currentvalue = value.replace(/[^\d]/g, "");
    const cvlength = currentvalue.length;
    if (!prevdata || value.length > prevdata.length) {
      console.log("work", currentvalue);
      if (cvlength < 2) return currentvalue;
      else if (cvlength == 2)
        return `${currentvalue.slice(0, 1)} (${currentvalue.slice(1)}`;
      else if (cvlength == 3)
        return `${currentvalue.slice(0, 1)} (${currentvalue.slice(
          1,
          2
        )}-${currentvalue.slice(2)}`;
      else if (cvlength == 4)
        return `${currentvalue.slice(0, 1)} (${currentvalue.slice(
          1,
          2
        )}-${currentvalue.slice(2, 3)}-${currentvalue.slice(3)})`;
      else return prevdata;
    }
  };

  useEffect(() => {
    prevvalue.current = dataTQF2.course;
  }, [dataTQF2.course]);

  const handleCoursechange = (e, arrayname, index) => {
    if (e.target.validity.valid) {
      let list = [...dataTQF2[arrayname]];
      const value = e.target.value;
      if (e.target.name == "course_credit") {
        list[index][e.target.name] = normalizecredit(
          value,
          prevvalue.current[index].course_credit
        );
      } else {
        list[index][e.target.name] = value;
      }
      setDataTQF2((prevdata) => {
        return { ...prevdata, [arrayname]: list };
      });
    }
  };

  const CourseAdd = (e, arrayname, subarrayname, index) => {
    e.stopPropagation();
    e.preventDefault();
    let list = [...dataTQF2[arrayname]];
    let sublist = [...dataTQF2[arrayname][0][subarrayname]];
    const list2 = {};
    const sublist2 = {};
    for (const key in sublist[0]) {
      if (key == "index") {
        sublist2[key] = 0;
      } else {
        sublist2[key] = "";
      }
    }
    const sublist2Array = [];
    sublist2Array.push(sublist2);

    for (const key in list[0]) {
      if (key == subarrayname) {
        list2[key] = sublist2Array;
      } else {
        list2[key] = "";
      }
    }
    list.splice(index + 1, 0, list2);
    setDataTQF2((prevdata) => {
      return { ...prevdata, [arrayname]: list };
    });
    setTextarea((prevtextarea) => !prevtextarea);
    setToggleindex((previndex) => !previndex);
  };

  const CourseRemove = (e, arrayname, index) => {
    e.stopPropagation();
    e.preventDefault();
    let list = [...dataTQF2[arrayname]];
    let list2 = [...dataTQF2.course_delete];
    if (list[index].id.length > 0) {
      list2.push({ course_id: list[index].id });
    }
    list.splice(index, 1);
    setDataTQF2((prevdata) => {
      return { ...prevdata, [arrayname]: list, course_delete: list2 };
    });
    setToggleindex((previndex) => !previndex);
  };

  const handleELOchange = (e, arrayname, subarrayname, index, index2) => {
    if (e.target.validity.valid) {
      let list = [...dataTQF2[arrayname]];
      let sublist = [...dataTQF2[arrayname][index][subarrayname]];
      const value = e.target.value;
      sublist[index2][e.target.name] = value;
      list[index][subarrayname] = sublist;
      setDataTQF2((prevdata) => {
        return { ...prevdata, [arrayname]: list };
      });
    }
  };

  const handleELOadd = (e, arrayname, subarrayname, index, index2) => {
    e.stopPropagation();
    let list = [...dataTQF2[arrayname]];
    let sublist = [...dataTQF2[arrayname][index][subarrayname]];
    const sublist2 = {};
    for (const key in sublist[0]) {
      if (key == "index") {
        sublist2[key] = index2 + 1;
      } else {
        sublist2[key] = "";
      }
    }
    sublist = [...sublist, sublist2];
    list[index][subarrayname] = sublist;
    setDataTQF2((prevdata) => {
      return { ...prevdata, [arrayname]: list };
    });
    setTextarea((prevtextarea) => !prevtextarea);
  };

  const handleELOremove = (e, arrayname, subarrayname, index, index2) => {
    e.stopPropagation();
    let list = [...dataTQF2[arrayname]];
    let sublist = [...dataTQF2[arrayname][index][subarrayname]];
    let list2 = [...dataTQF2.course_expectlearningoutcome_delete];
    if (sublist[index2].id.length > 0) {
      list2.push({ course_expectlearningoutcome_id: sublist[index2].id });
    }
    sublist.splice(index2, 1);
    list[index][subarrayname] = sublist;
    setDataTQF2((prevdata) => {
      return {
        ...prevdata,
        [arrayname]: list,
        course_expectlearningoutcome_delete: list2,
      };
    });
  };

  const splitstring = (e, arrayname, index) => {
    e.stopPropagation();
    // let regex =/\n|และ|หรือ|เป็นต้น|เช่น/g
    let list = [...dataTQF2[arrayname]];
    let string = e.target.value.trim().replace(/\n/g, "").split(/\s+/g);
    list[index]["course_describtionarray"] = string;
    setDataTQF2((prevdata) => {
      return { ...prevdata, [arrayname]: list };
    });
  };

  const Tabhandle = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    // setData({ ...data, UpdateDate: moment().format("DD MMMM YYYY HH:mm:ss") })
    updatetqf();
    saveDocument();
  };

  const saveDocument = () => {
    try {
      const res = PostgreAPI.put(
        "/document/update/" + documentData.id,
        documentData
      );
      // toast.success("Update Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updatetqf = () => {
    try {
      PostgreAPI.put("/tqf2/update/" + dataTQF2.id, dataTQF2)
        .then((res) => {
          toast.success("Update Successfully!");
          setIsEdit(false);
          fetchTQF(documentData.documentdata_id);
          autosize.update(document.querySelectorAll("textarea"));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="Head">
        <HeadTQF2 />
      </div>
      <div className="sticky-container">
        <div className="absolute-container">
          {canEdit && (
            <div className="save-bar-container">
              <div className="save-bar">
                {isEdit ? (
                  <>
                    <div
                      className="save-bar-item a"
                      onClick={() => setIsEdit(false)}
                    >
                      <i className="fal fa-times"></i>
                      <label>Cancel</label>
                    </div>
                    <hr />
                    <div className="save-bar-item a" onClick={handleSumbit}>
                      <i className="fal fa-save"></i>
                      <label>Save</label>
                    </div>
                  </>
                ) : (
                  <div
                    className="save-bar-item a"
                    onClick={() => setIsEdit(true)}
                  >
                    <i className="fal fa-edit"></i>
                    <label>แก้ไข</label>
                  </div>
                )}

                <hr />
                {/* <div className="save-bar-item b" onClick={CloneTQF3}>
                                    <i className="fal fa-copy"></i>
                                    <label>Clone</label>
                                </div>
                                <hr /> */}
                <div className="save-bar-item c disabled">
                  <i className="fal fa-share-square"></i>
                  <label>Share</label>
                </div>

                {/* <div className="save-bar-item d disabled">
                                    <i className="fal fa-arrow-to-bottom"></i>
                                    <label>BBBBBB</label>
                                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container clearfix pl-5">
        <div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <input
              type="text"
              placeholder="หลักสูตร"
              className="tqf2-input MyInput first"
              name="program_name"
              value={dataTQF2.program_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <input
              type="text"
              placeholder="สาขาวิชา"
              className="tqf2-input MyInput first"
              name="program_depart"
              value={dataTQF2.program_depart || ""}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <input
              type="text"
              placeholder="หลักสูตรปรับปรุงปี"
              className="tqf2-input MyInput first"
              name="program_year"
              value={dataTQF2.program_year || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <form onSubmit={handleSumbit}>
          <div className="form-group">
            <h2>1. รหัสและชื่อรายหลักสูตร</h2>
            <div>
              <input
                type="text"
                placeholder="รหัสหลักสูตร"
                className="tqf2-input MyInput first"
                name="program_code"
                value={dataTQF2.program_code || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="ชื่อหลักสูตรภาษาไทย"
                pattern="[\u0E00-\u0E7F ()]*"
                className="tqf2-input MyInput first"
                name="program_thainame"
                value={dataTQF2.program_thainame || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="ชื่อหลักสูตรภาษาอังกฤษ"
                pattern="[a-zA-Z ()]*"
                className="tqf2-input MyInput first"
                name="program_engname"
                value={dataTQF2.program_engname || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <h2>2. ชื่อปริญญาและสาขาวิชา</h2>
            <h3>ภาษาไทย</h3>
            <div>
              <input
                type="text"
                placeholder="ชื่อเต็ม"
                pattern="[\u0E00-\u0E7F ()]*"
                className="tqf2-input MyInput first"
                name="full_thai"
                value={dataTQF2.full_thai || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="ชื่อย่อ"
                pattern="[\u0E00-\u0E7F ().]*"
                className="tqf2-input MyInput first"
                name="mini_thai"
                value={dataTQF2.mini_thai || ""}
                onChange={handleInputChange}
              />
            </div>
            <h3>ภาษาอังกฤษ</h3>
            <div>
              <input
                type="text"
                placeholder="ชื่อเต็ม"
                pattern="[a-zA-Z ()]*"
                className="tqf2-input MyInput first"
                name="full_eng"
                value={dataTQF2.full_eng || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="ชื่อย่อ"
                pattern="[a-zA-Z ().]*"
                className="tqf2-input MyInput first"
                name="mini_eng"
                value={dataTQF2.mini_eng || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <h2>3. วิชาเอก</h2>
            <div>
              <input
                type="text"
                placeholder="วิชาเอก"
                className="tqf2-input MyInput first"
                name="major"
                value={dataTQF2.major || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <h2>4. จำนวนหน่วยกิต</h2>
            <div>
              <input
                type="text"
                placeholder="จำนวนหน่วยกิต"
                pattern="[0-9]*"
                className="tqf2-input MyInput first"
                name="allcredit"
                value={dataTQF2.allcredit || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {dataTQF2.course.map((el, index) => {
            return (
              <div className="form-group" key={index}>
                <h2>วิชาที่ {index + 1}</h2>
                <div className="row justify-content-start">
                  <div className="col-lg-2">
                    <input
                      style={{ width: "100%" }}
                      className="tqf2-input MyInput"
                      type="text"
                      placeholder="รหัสวิชา"
                      name="course_code"
                      value={el.course_code || ""}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      style={{ width: "100%" }}
                      className="tqf2-input MyInput mb-2"
                      type="text"
                      placeholder="ชื่อภาษาไทย"
                      pattern="[\u0E00-\u0E7F1-9 ()]*"
                      name="course_thainame"
                      value={el.course_thainame || ""}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                    />
                    <input
                      style={{ width: "100%" }}
                      className="tqf2-input MyInput"
                      type="text"
                      placeholder="ชื่อภาษาอังกฤษ"
                      pattern="[a-zA-Z ()-]*"
                      name="course_engname"
                      value={el.course_engname || ""}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                    />
                    <input
                      style={{ width: "100%" }}
                      className="tqf2-input MyInput"
                      type="text"
                      placeholder="วิชาบังคับก่อน"
                      name="course_prerequi"
                      value={el.course_prerequi || ""}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                    />
                  </div>
                  <div className="col-lg-2">
                    <input
                      style={{ width: "100%" }}
                      className="tqf2-input MyInput"
                      type="text"
                      placeholder="หน่วยกิต"
                      name="course_credit"
                      value={el.course_credit || ""}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-10">
                    <textarea
                      style={{ width: "100%" }}
                      className="tqf2-textarea MyTextarea"
                      placeholder="คำอธิบายรายวิชา"
                      name="course_describtion"
                      value={el.course_describtion}
                      onChange={(e) => handleCoursechange(e, "course", index)}
                      onBlur={(e) => splitstring(e, "course", index)}
                      onKeyDown={(e) => Tabhandle(e)}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <h3>ผลการเรียนรู้</h3>
                  {el.course_expectlearningoutcome.map((el2, index2) => {
                    return (
                      <div className="row" key={index2}>
                        <div className="col-lg-10">
                          <textarea
                            style={{ width: "100%" }}
                            className="tqf2-textarea MyTextarea"
                            name="value"
                            value={el2.value}
                            onChange={(e) =>
                              handleELOchange(
                                e,
                                "course",
                                "course_expectlearningoutcome",
                                index,
                                index2
                              )
                            }
                          />
                        </div>
                        <div className="col-lg-2 inline align-self-center">
                          {1 !== el.course_expectlearningoutcome.length &&
                          index2 ===
                            el.course_expectlearningoutcome.length - 1 ? (
                            <button
                              type="submit"
                              className="btn btn-danger mr-3"
                              onClick={(e) =>
                                handleELOremove(
                                  e,
                                  "course",
                                  "course_expectlearningoutcome",
                                  index,
                                  index2
                                )
                              }
                            >
                              -
                            </button>
                          ) : (
                            ""
                          )}
                          {index2 ===
                          el.course_expectlearningoutcome.length - 1 ? (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={(e) =>
                                handleELOadd(
                                  e,
                                  "course",
                                  "course_expectlearningoutcome",
                                  index,
                                  index2
                                )
                              }
                            >
                              +
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {1 !== dataTQF2.course.length ? (
                  <button
                    type="submit"
                    className="btn btn-danger mr-3"
                    onClick={(e) => CourseRemove(e, "course", index)}
                  >
                    ลด
                  </button>
                ) : (
                  ""
                )}
                {1 ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) =>
                      CourseAdd(
                        e,
                        "course",
                        "course_expectlearningoutcome",
                        index
                      )
                    }
                  >
                    เพิ่ม
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          {/* {canEdit && <button type="submit" className="btn btn-primary"  >บันทึกข้อมูล</button>} */}
        </form>
        {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(dataTQF2, null, 2)}</pre></div> */}
      </div>
    </div>
  );
};

const ShortTQF2 = (props) => (
  <TQF2ContextProvider>
    <MyTQ2 tempdocId={props.match.params.id} />
  </TQF2ContextProvider>
);

export default ShortTQF2;
