import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { SelectContext } from "../../context/index";
import { useTranslation } from "react-i18next";
import PostgreAPI from "../../apis/PostgreAPI";

export default function Bar() {
  const { t } = useTranslation();
  const { select1, setSelect1 } = useContext(SelectContext);

  const [textSearch, setTextSearch] = useState("");

  const [termyearData, setTermyearData] = useState({});
  const [termyearSelect, setTermyearSelect] = useState({});

  const [programData, setProgramData] = useState({});
  const [programSelect, setProgramSelect] = useState({});

  useEffect(() => {
    getTermyearSelect();
    getProgramSelect();
  }, []);

  //.. ----------------------------------------------- Program-----------------------------------------------
  const getProgramSelect = () => {
    PostgreAPI.get("/forselect/program/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setProgramData(res.data);
        setProgramSelect(res.data.find((obj) => obj.value === ""));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProgramSelect = (selectedOption) => {
    setProgramSelect(selectedOption);
    setSelect1({ ...select1, type: selectedOption.value });
  };
  //.. -----------------------------------------------end Program-----------------------------------------------

  //.. ----------------------------------------------- termyear-----------------------------------------------
  const getTermyearSelect = () => {
    PostgreAPI.get("/forselect/termyear/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        setTermyearData(res.data);
        setTermyearSelect(res.data.find((obj) => obj.value === "all"));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTermyearSelect = (selectedOption) => {
    setTermyearSelect(selectedOption);
    if (selectedOption.value === "all") {
      setSelect1({ ...select1, type2: "" });
    } else {
      setSelect1({ ...select1, type2: selectedOption.value });
    }
  };
  //.. -----------------------------------------------end termyear-----------------------------------------------

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
  return (
    <div className="bar-container">
      <div className="bar-items">
        <div style={{ width: 280, height: 40 }}>
          <Select
            className="MySelect"
            options={programData}
            value={programSelect}
            onChange={handleProgramSelect}
            isSearchable={false}
          />
        </div>
        <div style={{ width: 280, height: 40 }}>
          <Select
            className="MySelect"
            options={termyearData}
            value={termyearSelect}
            onChange={handleTermyearSelect}
            isSearchable={false}
          />
        </div>
        <div style={{ width: 280, height: 40 }}>
          <div className="search_box">
            <input
              type="text"
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDowSearch}
              placeholder={t("personnel.search")}
            />
            <i onClick={handleSubmitSearch} className="fas fa-search" />
          </div>
        </div>
      </div>
    </div>
  );
}
