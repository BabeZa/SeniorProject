import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import file from "../../assert/icon/file.svg";
import { useOutside } from "../../components/Outside";
import PostgreAPI from "../../apis/PostgreAPI";
import { useHistory } from "react-router-dom";
import {
  AuthContext,
  ProfileContext,
  SelectContext,
} from "../../context/index";
import moment from "moment";
import Modal from "react-modal";
import cancel from "./../../assert/icon/cancel.svg";
import Select from "react-select";
import ProfessorHead from "../Professor/ProfessorHead";

const typeSelectDataTH = [
  { value: "TQF2", label: "มคอ.2" },
  { value: "TQF3", label: "แผนการสอน" },
  { value: "TQF5", label: "การสรุปและรวบรวมข้อเสนอแนะ" },
  { value: "SAR", label: "รายงานการประเมินตนเอง" },
];
const typeSelectDataEN = [
  { value: "TQF2", label: "TQF2" },
  { value: "TQF3", label: "Lesson plan" },
  { value: "TQF5", label: "Summarizing and collecting recommendations" },
  { value: "SAR", label: "Self-assessment report" },
];

export default function UploadDoc() {
  const { t } = useTranslation();
  const history = useHistory();
  const { isSelect, setIsSelect, ref } = useOutside(false);
  const { profile } = useContext(ProfileContext);

  const { modalIsOpenUploadDoc, setModalIsOpenUploadDoc } = useContext(
    SelectContext
  );
  const [docName, setDocName] = useState("");

  const [next, setNext] = useState(false);
  const [file, setFile] = useState({});
  const [isFile, setIsFile] = useState(false);

  const [typeSelectData, setTypeSelectData] = useState({});
  const [typeSelect, setTypeSelect] = useState({});
  const [typeSelectV, setTypeSelectV] = useState("0");

  const handleUploadfile = (e) => {
    try {
      const file = e.target.files[0]; // เก็บไว้ setState ลงใน file
      const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
        console.log("[UploadDoc.js] file:", file);
        setFile(file);
        setIsFile(true);
      };
    } catch (error) {
      setIsFile(false);
      console.error(error);
    }
  };

  const Uploadfile = () => {
    console.log("[UploadDoc.js] file:", file);
    console.log("[UploadDoc.js] docName:", docName);
    console.log("[UploadDoc.js] typeSelect:", typeSelect.value);
    const formData = new FormData();
    formData.append("myPDF", file);
    console.log("[UploadDoc.js] formData: ", formData);

    PostgreAPI.post("/pdf/upload", formData)
      .then((res) => {
        const body = {
          docname: docName,
          documenttype_code: typeSelect.value,
          isactive: true,
          documentstatus_code: "FINISH",
          filename: res.data.filename,
          mimetype: res.data.mimetype,
          createdate: moment().format("DD MMMM YYYY HH:mm:ss"),
        };
        PostgreAPI.post("/document-upload/supercreate", body)
          .then((res) => {
            toast.success("Upload a document successfully!");
            setModalIsOpenUploadDoc(false);
            console.log("[UploadDoc.js] document-upload:", res.data);
          })
          .catch((error) => {
            console.error(error);
          });

        console.log("[UploadDoc.js] pdf:", res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (localStorage.getItem("i18nextLng") == "th") {
      setTypeSelectData(typeSelectDataTH);
    } else {
      setTypeSelectData(typeSelectDataEN);
    }
  }, [localStorage.getItem("i18nextLng")]);

  const handleTypeSelect = (selectedOption) => {
    setTypeSelect(selectedOption);
  };

  const handleTypeSelectV = () => {
    setTypeSelectV(typeSelect.value);
    console.log("typeSelect.value :", typeSelect.value);
  };
  // --------------------------------------------------------------------------------------
  return (
    <>
      <div className="modal-createdoc-container">
        <div className="modal-cancel">
          <img
            src={cancel}
            onClick={() => setModalIsOpenUploadDoc(false)}
            className="modal-cancel-icon cancel-icon-rotate"
          />
        </div>

        {next === false && (
          <>
            <div className="modal-header">
              <h1>อัพโหลดเอกสาร</h1>
            </div>
            <div className="modal-upload">
              {/* <i className="fal fa-upload"></i> */}
              <input
                type="file"
                name="file-5[]"
                id="file-5"
                className={
                  isFile
                    ? "inputfile inputfile-4 active"
                    : "inputfile inputfile-4"
                }
                onChange={handleUploadfile}
              />
              <label for="file-5">
                <figure>
                  <i className="fal fa-upload"></i>
                </figure>{" "}
                <span>{isFile ? file.name : "Choose a fise..."}</span>
              </label>
            </div>
            {isFile && (
              <div
                className="modal-createdoc-btn b MyButton"
                onClick={() => setNext(true)}
              >
                Next
              </div>
            )}
          </>
        )}

        {next && (
          <>
            <div className="modal-header">
              <h1>อัพโหลดเอกสาร</h1>
            </div>
            <div className="modal-createdoc-input-container">
              <input
                className="modal-createdoc-input MyInput"
                type="text"
                onChange={(e) => setDocName(e.target.value)}
                placeholder={"ชื่อไฟล์เอกสาร"}
              />
              <Select
                className="modal-createdoc-select c MySelect2"
                options={typeSelectData}
                onChange={handleTypeSelect}
                menuPortalTarget={document.body}
              />
              {/* <p><pre>{JSON.stringify(typeSelect, null, 2)}</pre></p> */}
            </div>
            <div
              className="modal-createdoc-btn a MyButton"
              onClick={() => setNext(false)}
            >
              Back
            </div>
            <div
              className="modal-createdoc-btn b MyButton"
              onClick={() => Uploadfile()}
            >
              Upload
            </div>
          </>
        )}
      </div>
    </>
  );
}
