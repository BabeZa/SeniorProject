import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { TQF3Context } from "../../../context/TQF3Context";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Delete from "../../../assert/icon/delete.svg";
import edit from "../../../assert/icon/edit.svg";
import MongoAPI from "../../../apis/MongoAPI";
import PostgreAPI from "../../../apis/PostgreAPI";
import { toast } from "react-toastify";
import moment from "moment";
import Select from "react-select";

export default function Chapter1(props) {
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
    documents,
    setDocuments,
    isEdit2,
  } = useContext(TQF3Context);

  const [statusData, setStatusData] = useState({});
  const [statusSelect, setStatusSelect] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false);

  const [termyearData, setTermyearData] = useState({});
  const [termyearSelect, setTermyearSelect] = useState({});
  const [loadingTermyear, setLoadingTermyear] = useState(false);

  const [pre1Data, setPre1Data] = useState({});
  const [pre1Select, setPre1Select] = useState({});
  const [loadingPre1, setLoadingPre1] = useState(false);
  const [pre2Select, setPre2Select] = useState({});
  const [coSelect, setCoSelect] = useState({});

  const [professorData, setProfessorData] = useState({});
  const [professorSelect, setProfessorSelect] = useState({});
  const [loadingProfessor, setLoadingProfessor] = useState(false);

  const [tqf2SelectData, setTqf2SelectData] = useState({});
  const [tqf2Select, setTqf2Select] = useState({ value: "", label: "" });
  const [loadedTqf2Select, setLoadedTqf2Select] = useState(false);
  const [tqf2CourseSelectData, setTqf2CourseSelectData] = useState({});
  const [tqf2CourseSelect, setTqf2CourseSelect] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == "credit") {
      setData((prevdata) => ({
        ...prevdata,
        [name]: normalizecredit(value, prevdata[name]),
      }));
    } else {
      setData({ ...data, [name]: value });
    }
    // console.log(e.target.value)
  };

  const normalizecredit = (value, prevdata) => {
    if (!value) return value;
    const currentvalue = value.replace(/[^\d]/g, "");
    const cvlength = currentvalue.length;
    if (!prevdata || value.length > prevdata.length) {
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
    if (true) {
      getStatusSelect();
      getTermyearSelect();
      getPre1Select();
      getProfessorSelect();
      getTqf2Select();
    }
  }, [localStorage.getItem("i18nextLng")]);

  //.. ----------------------------------------------- StatusSelect-----------------------------------------------
  const getStatusSelect = () => {
    PostgreAPI.get(
      "/forselect/documentstatus/TQF/" + localStorage.getItem("i18nextLng")
    )
      .then((res) => {
        setStatusData(res.data);
        setLoadingStatus(true);
        // console.log("[TQF3/Chapter1.js] status: "+ res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] StatusSelect loadingStatus:",loadingStatus );
    // console.log("[TQF3/Chapter1.js] StatusSelect documents.successful:",documents.successful );
    if (loadingStatus && documents.successful) {
      setStatusSelect(
        statusData.find((obj) => obj.value === documents.documentstatus_code)
      );
      // console.log("[TQF3/Chapter1.js] StatusSelect: "+ statusData.find(obj => obj.value === documents.documentstatus_code));
    }
  }, [
    statusData,
    loadingStatus,
    documents.successful,
    documents.documentstatus_code,
  ]);

  const handleStatusSelect = (selectedOption) => {
    setDocuments({ ...documents, documentstatus_code: selectedOption.value });
    setData({ ...data, documentstatus_code: selectedOption.value });
  };
  //.. -----------------------------------------------end StatusSelect-----------------------------------------------

  //.. ----------------------------------------------- termyear-----------------------------------------------
  const getTermyearSelect = () => {
    PostgreAPI.get("/forselect/termyear/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setTermyearData(res.data);
        setLoadingTermyear(true);
        // console.log("[TQF3/Chapter1.js] status: "+ res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] TermyearSelect loadingTermyear:",loadingTermyear );
    // console.log("[TQF3/Chapter1.js] TermyearSelect documents.successful:",data.successful );
    if (loadingTermyear && data.successful) {
      setTermyearSelect(
        termyearData.find((obj) => obj.value === data.termyear_code)
      );
      // console.log("[TQF3/Chapter1.js] TermyearSelect: "+ termyearData.find(obj => obj.value === data.termyear_code));
    }
  }, [termyearData, loadingTermyear, data.successful, data.termyear_code]);

  const handleTermyearSelect = (selectedOption) => {
    setData({ ...data, termyear_code: selectedOption.value });
  };
  //.. -----------------------------------------------end termyear-----------------------------------------------
  //.. ----------------------------------------------- pre1-----------------------------------------------
  const getPre1Select = () => {
    PostgreAPI.get("/forselect/pre1/0/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setPre1Data(res.data);
        setLoadingPre1(true);
        // console.log("[TQF3/Chapter1.js] Pre1: "+ res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] Pre1Select loadingPre1:",loadingPre1 );
    // console.log("[TQF3/Chapter1.js] Pre1Select documents.successful:",data.successful );
    if (loadingPre1 && data.successful) {
      setPre1Select(
        pre1Data.find((obj) => obj.value === data.pre_requisites_st)
      );
      if (pre1Data.find((obj) => obj.value === data.pre_requisites_st)) {
        // console.log("[TQF3/Chapter1.js] Pre1Select: "+ pre1Data.find(obj => obj.value === data.pre_requisites_st));
      } else {
        setPre1Select({ label: "" });
      }
    }
  }, [pre1Data, loadingPre1, data.successful, data.pre_requisites_st]);

  const handlePre1Select = (selectedOption) => {
    setData({ ...data, pre_requisites_st: selectedOption.value });
  };
  //.. -----------------------------------------------end pre1-----------------------------------------------
  //.. ----------------------------------------------- pre2-----------------------------------------------

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] Pre2Select loadingPre1:",loadingPre1 );
    // console.log("[TQF3/Chapter1.js] Pre2Select documents.successful:",data.successful );
    if (loadingPre1 && data.successful) {
      setPre2Select(
        pre1Data.find((obj) => obj.value === data.pre_requisites_nd)
      );
      if (pre1Data.find((obj) => obj.value === data.pre_requisites_nd)) {
        // console.log("[TQF3/Chapter1.js] Pre2Select: "+ pre1Data.find(obj => obj.value === data.pre_requisites_nd));
      } else {
        setPre2Select({ label: "" });
      }
    }
  }, [pre1Data, loadingPre1, data.successful, data.pre_requisites_nd]);

  const handlePre2Select = (selectedOption) => {
    setData({ ...data, pre_requisites_nd: selectedOption.value });
  };
  //.. -----------------------------------------------end pre2-----------------------------------------------
  //.. ----------------------------------------------- co-----------------------------------------------

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] CoSelect loadingPre1:",loadingPre1 );
    // console.log("[TQF3/Chapter1.js] Pre1Select documents.successful:",data.successful );
    if (loadingPre1 && data.successful) {
      setCoSelect(pre1Data.find((obj) => obj.value === data.co_requisites));
      if (pre1Data.find((obj) => obj.value === data.co_requisites)) {
        // console.log("[TQF3/Chapter1.js] Pre1Select: "+ pre1Data.find(obj => obj.value === data.co_requisites));
      } else {
        setCoSelect({ label: "" });
      }
    }
  }, [pre1Data, loadingPre1, data.successful, data.co_requisites]);

  const handleCoSelect = (selectedOption) => {
    setData({ ...data, co_requisites: selectedOption.value });
  };
  //.. -----------------------------------------------end co-----------------------------------------------
  //.. ----------------------------------------------- Professor-----------------------------------------------
  const getProfessorSelect = () => {
    console.log("[TQF3/Chapter1.js] getProfessorSelect: done ", data.id);
    PostgreAPI.get(
      "/forselect/professordoc/" +
        data.id +
        "/" +
        localStorage.getItem("i18nextLng")
    )
      .then((res) => {
        setProfessorData(res.data);
        setLoadingProfessor(true);
        // console.log("[TQF3/Chapter1.js] getProfessorSelect: "+ res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] ProfessorSelect loadingProfessor:",loadingProfessor );
    // console.log("[TQF3/Chapter1.js] ProfessorSelect documents.successful:",data.successful );
    if (loadingProfessor && data.successful) {
      // setProfessorSelect(professorData.find(obj => obj.value === data.termyear_code));
      var PObj = data.Professor;
      {
        data.Professor.map((item, index) => {
          if (item.role === "main") {
            Object.assign(PObj[index], { isFixed: true });
          }
          Object.assign(PObj[index], {
            value: item.employee_id,
            label: item.engname,
          });
        });
      }
      setProfessorSelect(PObj);
      // console.log("[tqf3/Chapter1.js] Professor00: ",PObj);
      // console.log("[TQF3/Chapter1.js] ProfessorSelect: "+ termyearData.find(obj => obj.value === data.termyear_code));
    }
  }, [professorData, loadingProfessor, data.successful, data.Professor]);

  const myHandleProfessorSelect = (selectedOption) => {
    // console.log("[tqf3/Chapter1.js] Professor22: ", selectedOption);
    // console.log("[tqf3/Chapter1.js] Professor33: ", data);
    setData({ ...data, Professor: selectedOption });
  };

  // styles that do not show 'x' for fixed options
  const professorSelectStyles = useMemo(
    () => ({
      multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
      },
    }),
    []
  );

  // // sort options with alphabet order
  // const orderByLabel = useCallback(
  //     (a, b) => a.label.localeCompare(b.label),
  //     []
  // );

  // listed fixed options first and then the delete-able options
  const orderOptions = (values) => {
    return values
      .filter((v) => v.isFixed)
      .concat(values.filter((v) => !v.isFixed));
  };

  const handleProfessorSelect = (inputValue, { action, removedValue }) => {
    switch (action) {
      case "remove-value": // delete with 'x'
      case "pop-value": // delete with backspace
        if (removedValue.isFixed) {
          setProfessorSelect(orderOptions([...inputValue, removedValue]));
          return;
        }
        break;
      case "clear": // clear button is clicked
        setProfessorSelect(professorData.filter((v) => v.isFixed));
        return;
      default:
    }
    setProfessorSelect(inputValue);
    //   console.log("[tqf3/Chapter1.js] Professor11: ", inputValue);
    myHandleProfessorSelect(inputValue);
  };

  //.. -----------------------------------------------end Professor-----------------------------------------------
  //.. ----------------------------------------------- tqf2-----------------------------------------------
  const getTqf2Select = () => {
    PostgreAPI.get("/forselect/tqf2/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setTqf2SelectData(res.data);
        setLoadedTqf2Select(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log("[TQF3/Chapter1.js] Pre1Select loadingPre1:",loadingPre1 );
    // console.log("[TQF3/Chapter1.js] Pre1Select documents.successful:",data.successful );
    if (loadedTqf2Select && data.successful) {
      setTqf2Select(
        tqf2SelectData.find((obj) => obj.value === data.tqf2program_id)
      );
      if (tqf2SelectData.find((obj) => obj.value === data.tqf2program_id)) {
        // console.log("[TQF3/Chapter1.js] tqf2Select304: "+ JSON.stringify(tqf2SelectData.find(obj => obj.value === data.tqf2program_id).label));
        setData({
          ...data,
          tqf2program_label: tqf2SelectData.find(
            (obj) => obj.value === data.tqf2program_id
          ).label,
        });
      } else {
        setTqf2Select({ label: "" });
      }
    }
  }, [tqf2SelectData, loadedTqf2Select, data.successful, data.tqf2program_id]);

  const handleTqf2Select = (selectedOption) => {
    // setTqf2Select(selectedOption);
    setData({
      ...data,
      tqf2program_id: selectedOption.value,
      tqf2program_label: selectedOption.label,
    });
  };

  useEffect(() => {
    if (loadedTqf2Select && data.successful) {
      PostgreAPI.get(
        "/forselect/tqf2-course/" +
          data.tqf2program_id +
          "/" +
          localStorage.getItem("i18nextLng")
      )
        .then((res) => {
          setTqf2CourseSelectData(res.data);
          // console.log("[tqf3/Chapter1.js] Tqf2CourseSelectData:", res.data);

          if (res.data.find((obj) => obj.value === data.tqf2course_id)) {
            setTqf2CourseSelect(
              res.data.find((obj) => obj.value === data.tqf2course_id)
            );
            // console.log("[TQF3/Chapter1.js] tqf2Select: "+ tqf2SelectData.find(obj => obj.value === data.pre_requisites_st));
            setData({
              ...data,
              tqf2course_label: res.data.find(
                (obj) => obj.value === data.tqf2course_id
              ).label,
            });
          } else {
            setTqf2CourseSelect({ label: "" });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    loadedTqf2Select,
    tqf2Select,
    data.successful,
    localStorage.getItem("i18nextLng"),
  ]);

  const handleTqf2CourseSelect = (selectedOption) => {
    setTqf2CourseSelect(selectedOption);
    setData({
      ...data,
      tqf2course_id: selectedOption.value,
      tqf2course_label: selectedOption.label,
    });
  };
  //.. -----------------------------------------------end tqf2-----------------------------------------------
  //. ---------------------------------------------------------------------------------------------------------
  const goToNote = () => {
    history.push("/professor/weeksnote/detail/" + data.id);
  };
  return (
    <>
      {/* {console.log("[TQF3] Chapter1.js render")} */}
      <div className={isEdit2 ? "tqf3 none" : "tqf3"}>
        {/* <div className="edit-container">
                {canEdit &&<img src={ edit } onClick={() => setIsEdit(true)} className="tqf-edit" />}
            </div> */}
        <div>
          <h1>{t("tqf3.chapter1.title")}</h1>
        </div>
        <br />
        <div>
          <h2>1. {t("tqf3.chapter1.t1.title")}</h2>
          <table className="tqf3-table">
            <tbody>
              <tr>
                <td>
                  <p className="subtitle">{t("tqf3.chapter1.t1.st1")}</p>
                </td>
                <td>
                  <p className="subtitle-value">{data.code}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="subtitle">{t("tqf3.chapter1.t1.st2")}</p>
                </td>
                <td>
                  <p className="subtitle-value">{data.thainame}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="subtitle">{t("tqf3.chapter1.t1.st3")}</p>
                </td>
                <td>
                  <p className="subtitle-value">{data.engname}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="subtitle">{t("tqf3.chapter1.t1.st4")}</p>
                </td>
                <td>
                  <p className="subtitle-value">{data.credit}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div>
                    <h2>2. {t('tqf3.chapter1.t2')}</h2>
                    <input readOnly="readOnly" className="document-input MyInput" type="text" value={data.credit} name='credit' />
                </div> */}
        <div>
          <h2>2. {t("tqf3.chapter1.t3")}</h2>
          <div>
            <p className="document-show">
              {tqf2Select.label === "" ? "-" : tqf2Select.label}
            </p>
          </div>
          {/* <div>
                        <input readOnly="readOnly" className="document-input MyInput" type="text" value={tqf2CourseSelect.label === "" ? "" : tqf2CourseSelect.label} />
                    </div> */}

          {/* <p className="mar-left-w1">{tqf2Select.label === "" ? "" : tqf2Select.label}</p>
                    <p className="mar-left-w1">{tqf2CourseSelect.label === "" ? "" : tqf2CourseSelect.label}</p> */}
          {/* <div><pre>{JSON.stringify(tqf2Select, null, 2)}</pre></div>
                <div><pre>{JSON.stringify(tqf2CourseSelect, null, 2)}</pre></div> */}
        </div>
        <div>
          <h2>3. {t("tqf3.chapter1.t4")}</h2>
          {data.Professor.map((el, index) => {
            return (
              <div key={index}>
                <p className="document-show">
                  {el.role == "main" ? "อาจารย์ผู้สอน" : "อาจารย์ผู้ช่วยสอน"}{" "}
                  {localStorage.getItem("i18nextLng") == "th"
                    ? el.thainame
                    : el.engname}
                </p>
              </div>
            );
          })}
        </div>
        <div>
          <h2>4. {t("tqf3.chapter1.t5")}</h2>
          <p className="document-show">{termyearSelect.label}</p>
        </div>
        <div>
          <h2>5.{t("tqf3.chapter1.t6")}</h2>
          <p className="document-show">
            {pre1Select.value === "" ? "-" : pre1Select.label}
          </p>
          <p className="document-show">
            {pre2Select.value === "" ? "" : pre2Select.label}
          </p>
        </div>
        <div>
          <h2>6. {t("tqf3.chapter1.t7")}</h2>
          <p className="document-show">
            {coSelect.value === "" ? "-" : coSelect.label}
          </p>
        </div>
        <div>
          <h2>7. {t("tqf3.chapter1.t8")}</h2>
          <p className="document-show">{data.place || "-"}</p>
        </div>
        <div>
          <h2>8. {t("tqf3.chapter1.t9")}</h2>
          <p className="document-show">{data.UpdateDate || "-"}</p>
        </div>
        <div>
          <h2>9. {t("tqf3.chapter1.t10")}</h2>
          <p className="document-show">{data.study_time || "-"}</p>
        </div>
        {/* <div>
                <h2>{t('tqf3.chapter1.type')}</h2>
                <input readOnly="readOnly" className="document-input MyInput" type="text" value={data.type}  name='type' />
            </div>*/}
        <div>
          <h2>{t("tqf3.chapter1.status")}</h2>
          <input
            readOnly="readOnly"
            className="document-input MyInput"
            type="text"
            value={statusSelect.label}
            name="status"
          />
        </div>
        {canEdit && data.documentstatus_code != "DRAFT" && (
          <div align="right">
            <button
              className="MyButton2 btn-next-step font-weight-bold"
              onClick={goToNote}
            >
              บันทึกประจำสัปดาห์<i className="far fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}

      <div className={isEdit2 ? "tqf3" : "tqf3  none"}>
        <form>
          {/* <div className="edit-container">
                <img src={ Delete } onClick={() => setIsEdit(false)} className="tqf-edit" />
            </div> */}
          <div>
            <h1>{t("tqf3.chapter1.title")}</h1>
          </div>
          <br />
          <div>
            <h2>1. {t("tqf3.chapter1.t1.title")}</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="document-input MyInput"
                      type="text"
                      value={data.code}
                      onChange={handleChange}
                      name="code"
                      placeholder={"CPExxx"}
                    />
                  </td>
                  <td>
                    <input
                      className="document-input back MyInput"
                      type="text"
                      value={data.credit}
                      onChange={handleChange}
                      name="credit"
                      placeholder={"x (x-x-x)"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="document-input MyInput"
                      type="text"
                      value={data.thainame}
                      onChange={handleChange}
                      name="thainame"
                      placeholder={t("tqf3.chapter1.t1.st2")}
                    />
                  </td>
                  <td>
                    <input
                      className="document-input back MyInput"
                      type="text"
                      value={data.engname}
                      onChange={handleChange}
                      name="engname"
                      placeholder={t("tqf3.chapter1.t1.st3")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div>
                        <h2>{t('tqf3.chapter1.t2')}</h2>
                        <input className="document-input MyInput" type="text" value={data.credit} onChange={handleChange} name='credit' placeholder={"x (x-x-x)"} />
                    </div> */}
          <div>
            <h2>2. {t("tqf3.chapter1.t3")}</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Select
                      className="MySelect2 tqf3-select"
                      options={tqf2SelectData}
                      value={tqf2Select}
                      onChange={handleTqf2Select}
                    />
                  </td>
                  <td>
                    <Select
                      className="MySelect2 tqf3-select back"
                      options={tqf2CourseSelectData}
                      value={tqf2CourseSelect}
                      onChange={handleTqf2CourseSelect}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div><pre>{JSON.stringify(data.tqf2program_id, null, 2)}</pre></div>
                <div><pre>{JSON.stringify(data.tqf2course_id, null, 2)}</pre></div> */}
          </div>
          <div>
            <h2>3. {t("tqf3.chapter1.t4")}</h2>
            <Select
              className="MySelect2 tqf3-select"
              options={professorData}
              value={professorSelect}
              onChange={handleProfessorSelect}
              styles={professorSelectStyles}
              isMulti
              isClearable={false}
            />
          </div>
          <div>
            <h2>4. {t("tqf3.chapter1.t5")}</h2>
            {/* <input readOnly="readOnly" className="document-input MyInput" type="text" value={data.termyear}  name='termyear' /> */}
            <Select
              className="MySelect2 tqf3-select"
              options={termyearData}
              value={termyearSelect}
              onChange={handleTermyearSelect}
              isSearchable={false}
            />
          </div>
          <div>
            <h2>5. {t("tqf3.chapter1.t6")}</h2>
            {/* <input className="document-input MyInput" type="text" value={data.pre_requi} onChange={handleChange} name='pre_requi' placeholder={t('tqf3.chapter1.t6')}/> */}
            <table>
              <tbody>
                <tr>
                  <td>
                    <Select
                      className="MySelect2 tqf3-select"
                      options={pre1Data}
                      value={pre1Select}
                      onChange={handlePre1Select}
                    />
                  </td>
                  <td>
                    <Select
                      className="MySelect2 tqf3-select back"
                      options={pre1Data}
                      value={pre2Select}
                      onChange={handlePre2Select}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>6. {t("tqf3.chapter1.t7")}</h2>
            {/* <input className="document-input MyInput" type="text" value={data.co_requi} onChange={handleChange} name='co_requi' placeholder={t('tqf3.chapter1.t7')}/> */}
            <Select
              className="MySelect2 tqf3-select"
              options={pre1Data}
              value={coSelect}
              onChange={handleCoSelect}
            />
          </div>
          <div>
            <h2>7. {t("tqf3.chapter1.t8")}</h2>
            <input
              className="document-input MyInput"
              type="text"
              value={data.place || "KMUTT"}
              onChange={handleChange}
              name="place"
              placeholder={t("tqf3.chapter1.t8")}
            />
          </div>
          <div>
            <h2>8. {t("tqf3.chapter1.t9")}</h2>
            <input
              readOnly="readOnly"
              className="document-input MyInput"
              type="text"
              value={data.UpdateDate || ""}
              onChange={handleChange}
              name="UpdateDate"
              placeholder={t("tqf3.chapter1.t9")}
            />
          </div>
          <div>
            <h2>9. {t("tqf3.chapter1.t10")}</h2>
            <input
              className="document-input MyInput"
              type="text"
              value={data.study_time}
              onChange={handleChange}
              name="study_time"
              placeholder={t("tqf3.chapter1.t10")}
            />
          </div>
          {/* <div>
                <h2>{t('tqf3.chapter1.type')}</h2>
                <input readOnly="readOnly" className="document-input MyInput" type="text" value={data.type} onChange={handleChange} name='type' placeholder={t('tqf3.chapter1.type')}/>
            </div>*/}
          <div>
            <h2>
              {t("tqf3.chapter1.status")}{" "}
              <span className="text-pink">
                {t("tqf3.chapter1.status-remark")}
              </span>
            </h2>
            {/* <input className="document-input MyInput" type="text" value={data.status} onChange={handleChange} name='status' placeholder={t('tqf3.chapter1.status')}/> */}
            <Select
              className="MySelect2 tqf3-select"
              options={statusData}
              value={statusSelect}
              onChange={handleStatusSelect}
              placeholder={t("tqf3.chapter1.status")}
              isSearchable={false}
            />
          </div>
          {/* {console.log("[Chapter1.js] UpdateDate: ", data.UpdateDate)} */}
          {/* <div className="chapter-footer">
                <button type="submit" className="chapter-footer-button" onClick={() => {setClick(!click)}}>{t('btn.save')}</button>
            </div> */}
          <div>
            <h2>{t("tqf3.chapter1.number")}</h2>
            {/* <input className="document-input MyInput" type="text" value={data.status} onChange={handleChange} name='status' placeholder={t('tqf3.chapter1.status')}/> */}
            <input
              className="document-input MyInput"
              type="number"
              value={data.no_students}
              onChange={handleChange}
              name="no_students"
              placeholder={t("tqf3.chapter1.number")}
            />
          </div>
        </form>
      </div>
    </>
  );
}
