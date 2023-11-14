import React, { useState, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Select from "react-select";
import "../Profile/Profile.css";
import book from "../../assert/icon/book.svg";
import { ProfileContext, SelectContext } from "../../context/index";
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from "react-router-dom";

export default function Courses() {
  const { t } = useTranslation();
  const history = useHistory();
  const [allDoc, setAllDoc] = useState([]);
  const [loading, setLoading] = useState(false);

  const { profile, setProfile } = useContext(ProfileContext);
  const [select1, setSelect1] = useState({ type: "", type2: "", search: "" });
  const [tempSelect1, setTempSelect1] = useState({});
  const [textSearch, setTextSearch] = useState("");

  const [termyearData, setTermyearData] = useState({});
  const [termyearSelect, setTermyearSelect] = useState({});
  // const [loadingTermyear, setLoadingTermyear] = useState(false);

  const [numCurrent, setNumCurrent] = useState(1);
  const [numTotal, setNumTotal] = useState(0);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    //   fetchAllDocument();
    if (profile.successful) {
      console.log("[Personnel/Courses.js] profile.id: ", profile.id);
      PostgreAPI.post("/tqf3/course-profile/" + profile.id, select1)
        .then((res) => {
          console.log("[Personnel/Courses.js] Courses get: ", res.data);
          setAllDoc(res.data);
          setNumTotal(res.data.length);
          setLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [profile, select1]);

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

  //.. ----------------------------------------------- termyear-----------------------------------------------
  // useMemo(() => {
  //     getTermyearSelect();
  // }, []);

  const getTermyearSelect = () => {
    PostgreAPI.get("/forselect/termyear/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setTermyearData(res.data);
        setTempSelect1(res.data.find((obj) => obj.value === "all"));
        console.log("[Personnel/Courses.js] status: " + res.data[0].value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTermyearSelect();
  }, []);

  const handleTermyearSelect = (selectedOption) => {
    setTempSelect1(
      termyearData.find((obj) => obj.value === selectedOption.value)
    );
    setSelect1({ ...select1, type: selectedOption.value, type2: "" });
  };
  //.. -----------------------------------------------end termyear-----------------------------------------------

  // useEffect(() => {
  //     setTempSelect1(document.find(obj => obj.value === ""));
  // }, []);

  // const handleSelect1 = (selectedOption) => {

  //     setTempSelect1(document.find(obj => obj.value === selectedOption.value));
  //     setSelect1({...select1, type : selectedOption.value, type2 : "" });
  //     console.log("[FileUAC.js] handleSelect1: "+selectedOption.value)
  //   }
  //.. -----------------------------------------------Pagination-----------------------------------------------
  const totolPages = Math.ceil(numTotal / 10);
  const indexOfLastPost = numCurrent * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allDoc.slice(indexOfFirstPost, indexOfLastPost);

  //.. -----------------------------------------------end Pagination-----------------------------------------------

  const goto = (e, id) => {
    e.preventDefault();
    history.push("/course/detail/" + id);
  };

  return (
    <>
      <div className="courses-container">
        <div className="head-container">
          {/* <img src={book} className="head-icon"/> */}
          <i className="fal fa-book-open"></i>
          <h2>รายวิชาที่รับผิดชอบ</h2>
        </div>
        <div className="bar-search">
          <div className="select">
            <Select
              className="MySelect2"
              options={termyearData}
              value={tempSelect1}
              isSearchable={false}
              onChange={handleTermyearSelect}
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
            {/* <col style={{width:"16%"}} /> */}
            <col style={{ width: "74%" }} />
            <col style={{ width: "16%" }} />
            <thead>
              <tr>
                <th>{t("professorprofile.fileuac.order")}</th>
                {/* <th>{t('professorprofile.fileuac.type')}</th> */}
                <th>{t("professorprofile.fileuac.name")}</th>
                <th>{t("professorprofile.fileuac.more")}</th>
              </tr>
            </thead>

            <tbody>
              {allDoc.length > 0 && loading
                ? currentPosts.map((el, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {postsPerPage * (numCurrent - 1) + index + 1}
                        </td>
                        {/* <td>{el.type}</td> */}
                        <td>
                          {localStorage.getItem("i18nextLng") == "th"
                            ? el.thainame
                            : el.engname}
                        </td>
                        <td>
                          <div className="btn-detail" onClick={(e) => goto(e, el.id)}>
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
              {numCurrent >= totolPages ? (
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
