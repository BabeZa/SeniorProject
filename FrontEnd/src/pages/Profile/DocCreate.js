import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Select from "react-select";
import "./Profile.css";
import file2 from "../../assert/icon/file2.svg";
import { ProfileContext, SelectContext } from "../../context/index";
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from "react-router-dom";

const document = [
  { value: "SAR", label: "SAR" },
  { value: "TQF", label: "TQF" },
  { value: "CS", label: "Course Syllabus" },
  { value: "", label: "All Document" },
];

const documentSelectDataTH = [
  { value: "SAR", label: "เอกสารการประเมินตัวเอง" },
  { value: "TQF3", label: "แผนการสอน" },
  { value: "TQF5", label: "การสรุปและรวบรวมข้อเสนอแนะ" },
  { value: "OTHER", label: "เอกสารอื่นๆ" },
  { value: "", label: "เอกสารทั้งหมด" },
];

const documentSelectDataEN = [
  { value: "SAR", label: "Self assessment report" },
  { value: "TQF3", label: "Lesson Plan" },
  { value: "TQF5", label: "Conclusions and Recommendation" },
  { value: "OTHER", label: "Other documents" },
  { value: "", label: "All documents" },
];

export default function DocCreate() {
  const { t } = useTranslation();
  const history = useHistory();
  const [allDoc, setAllDoc] = useState([]);

  const { profile, setProfile } = useContext(ProfileContext);
  // const { select1, setSelect1 } = useContext(SelectContext);
  const [select1, setSelect1] = useState({ type: "", type2: "", search: "" });
  const [tempSelect1, setTempSelect1] = useState({});
  const [textSearch, setTextSearch] = useState("");

  const [documentSelectData, setDocumentSelectData] = useState({});

  const [numCurrent, setNumCurrent] = useState(1);
  const [numTotal, setNumTotal] = useState(0);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") == "th") {
      setDocumentSelectData(documentSelectDataTH);
      setTempSelect1(documentSelectDataTH.find((obj) => obj.value === ""));
    } else {
      setDocumentSelectData(documentSelectDataEN);
      setTempSelect1(documentSelectDataEN.find((obj) => obj.value === ""));
    }
  }, [localStorage.getItem("i18nextLng")]);

  useEffect(() => {
    //   fetchAllDocument();
    if (profile.successful) {
      PostgreAPI.post("/document/allprofessor/" + profile.id, select1)
        .then((res) => {
          console.log("[FileUAC.js] document get: ", res.data);
          setAllDoc(res.data);
          setNumTotal(res.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [profile, select1]);

  const goto = (e, path, id, dataID) => {
    e.preventDefault();
    history.push("/document" + path + "/detail/" + id);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setTextSearch(e.target.value);
  };

  const handleSubmitSearch = () => {
    setSelect1({ ...select1, search: textSearch });
  };

  const handleKeyDowSearch = (e) => {
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  };

  // useEffect(() => {
  //     setTempSelect1(document.find(obj => obj.value === ""));
  // }, []);

  const handleSelect1 = (selectedOption) => {
    setTempSelect1(
      documentSelectData.find((obj) => obj.value === selectedOption.value)
    );
    setSelect1({ ...select1, type: selectedOption.value, type2: "" });
    console.log("[FileUAC.js] handleSelect1: " + selectedOption.value);
  };
  //.. -----------------------------------------------Pagination-----------------------------------------------
  const totolPages = Math.ceil(numTotal / 10);
  const indexOfLastPost = numCurrent * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allDoc.slice(indexOfFirstPost, indexOfLastPost);

  //.. -----------------------------------------------end Pagination-----------------------------------------------
  return (
    <>
      <div className="courses-container">
        <div className="head-container">
          <i className="fal fa-file-alt"></i>
          <h2>เอกสาร</h2>
        </div>
        <div className="bar-search">
          <div className="select">
            <Select
              className="MySelect2"
              options={documentSelectData}
              value={tempSelect1}
              isSearchable={false}
              onChange={handleSelect1}
            />
          </div>
          <div className="search_box ">
            <input
              type="text"
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDowSearch}
              placeholder={t("professorprofile.fileuac.search")}
            />
            <i onClick={handleSubmitSearch} className="fas fa-search" />
          </div>
        </div>
        <div className="courses-content">
          <hr className="profile-hr" />
          <table className="profile-table table-borderless table-hover">
            <col style={{ width: "10%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "58%" }} />
            <col style={{ width: "16%" }} />
            <thead>
              <tr>
                <th>{t("professorprofile.fileuac.order")}</th>
                <th>{t("professorprofile.fileuac.type")}</th>
                <th>{t("professorprofile.fileuac.name")}</th>
                <th>{t("professorprofile.fileuac.more")}</th>
              </tr>
            </thead>

            <tbody>
              {allDoc.length > 0
                ? currentPosts.map((el, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {postsPerPage * (numCurrent - 1) + index + 1}
                        </td>
                        <td>{el.type}</td>
                        <td>{el.name}</td>
                        <td>
                          <div
                            className="btn-detail"
                            onClick={(e) =>
                              goto(e, el.path, el.id, el.documentdata_id)
                            }
                          >
                            {t("professorprofile.fileuac.detail")}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                : " "}
            </tbody>
          </table>
          <div className="flex-center">
            <div className="flex-row MyPagination1">
              {numCurrent === 1 ? (
                <i className="fal fa-chevron-left disabled"></i>
              ) : (
                <i
                  className="fal fa-chevron-left"
                  onClick={() => setNumCurrent(numCurrent - 1)}
                ></i>
              )}
              <h4>
                {numCurrent}/{totolPages}
              </h4>
              {numCurrent === totolPages ? (
                <i className="fal fa-chevron-right disabled"></i>
              ) : (
                <i
                  className="fal fa-chevron-right"
                  onClick={() => setNumCurrent(numCurrent + 1)}
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
