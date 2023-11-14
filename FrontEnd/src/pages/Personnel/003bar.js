import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { SelectContext } from "../../context/index";
import { useTranslation } from "react-i18next";

const personnel = [
  { value: "professor", label: "Professor" },
  { value: "staff", label: "Staff" },
  { value: "", label: "All Personnel" },
];

export default function Bar() {
  const { t } = useTranslation();
  const { select1, setSelect1 } = useContext(SelectContext);
  const [tempSelect1, setTempSelect1] = useState({});

  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    setTempSelect1(personnel.find((obj) => obj.value === ""));
  }, []);

  const handleSelect1 = (selectedOption) => {
    setTempSelect1(personnel.find((obj) => obj.value === selectedOption.value));
    setSelect1({ ...select1, type: selectedOption.value });
    console.log("[Personnel/bar.js] handleSelect1: " + selectedOption.value);
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
  return (
    <div className="bar-container">
      <div className="bar-items">
        <div style={{ width: 280, height: 40 }}>
          <Select
            className="MySelect"
            options={personnel}
            value={tempSelect1}
            isSearchable={false}
            onChange={handleSelect1}
            placeholder="ประเภทบุคลากร"
          />
        </div>
        <div style={{ width: 280, height: 40 }}>
          {/* {isSelect2 && <Select className="MySelect" options={dataSelect2} value={tempSelect2} onChange={handleSelect2} isSearchable={false} placeholder="ประเภทเอกสาร"/>} */}
        </div>
        <div style={{ width: 100, height: 40 }}></div>
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
