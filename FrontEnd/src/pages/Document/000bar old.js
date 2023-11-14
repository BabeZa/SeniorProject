import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import "./Document.css";
import { SelectContext } from "../../context/index";
import { useTranslation } from "react-i18next";

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

const tqf = [
  { value: "1", label: "TQF1", isDisabled: true },
  { value: "2", label: "TQF2" },
  { value: "3", label: "TQF3" },
  { value: "4", label: "TQF4", isDisabled: true },
  { value: "5", label: "TQF5", isDisabled: true },
  { value: "6", label: "TQF6", isDisabled: true },
  { value: "7", label: "TQF7" },
  { value: "", label: "All" },
];

export default function Bar() {
  const { t } = useTranslation();
  const { select1, setSelect1 } = useContext(SelectContext);
  const [documentSelectData, setDocumentSelectData] = useState({});
  const [tempSelect1, setTempSelect1] = useState({});
  const [dataSelect2, setDataSelect2] = useState({});
  const [tempSelect2, setTempSelect2] = useState({});
  const [isSelect2, setIsSelect2] = useState(false);

  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") == "th") {
      setDocumentSelectData(documentSelectDataTH);
      setTempSelect1(documentSelectDataTH.find((obj) => obj.value === ""));
    } else {
      setDocumentSelectData(documentSelectDataEN);
      setTempSelect1(documentSelectDataEN.find((obj) => obj.value === ""));
    }
  }, [localStorage.getItem("i18nextLng")]);

  const handleSelect1 = (selectedOption) => {
    setTempSelect1(
      documentSelectData.find((obj) => obj.value === selectedOption.value)
    );
    if (selectedOption.value === "TQF") {
      setDataSelect2(tqf);
      setTempSelect2(tqf[7]);
      setIsSelect2(true);
    } else {
      // setSelect1({...select1, type : selectedOption.value, type2 : "" }); //. ใส่แล้ว bug
      setDataSelect2({});
      setIsSelect2(false);
    }
    setSelect1({ ...select1, type: selectedOption.value, type2: "" });
    console.log("[Document/bar.js] handleSelect1: " + selectedOption.value);
  };

  const handleSelect2 = (selectedOption) => {
    setSelect1({ ...select1, type2: selectedOption.value });
    setTempSelect2(
      dataSelect2.find((obj) => obj.value === selectedOption.value)
    );
    console.log("[Document/bar.js] handleSelect2: " + selectedOption.value);
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
            options={documentSelectData}
            value={tempSelect1}
            defaultValue={documentSelectData[7]}
            isSearchable={false}
            onChange={handleSelect1}
            placeholder={t("document.type")}
          />
        </div>
        <div style={{ width: 280, height: 40 }}>
          {isSelect2 && (
            <Select
              className="MySelect"
              options={dataSelect2}
              value={tempSelect2}
              onChange={handleSelect2}
              isSearchable={false}
              placeholder={t("document.type")}
            />
          )}
        </div>

        <div style={{ width: 280, height: 40 }}>
          <div className="search_box">
            <input
              type="text"
              onChange={handleChangeSearch}
              onKeyDown={handleKeyDowSearch}
              placeholder={t("document.search")}
            />
            <i onClick={handleSubmitSearch} className="fas fa-search" />
          </div>
        </div>
      </div>
    </div>
  );
}
