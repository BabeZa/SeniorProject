import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./Profile.css";
import edit from "../../assert/icon/edit.svg";
import user from "../../assert/icon/user.svg";
import { ProfileContext } from "../../context/index";
import PostgreAPI from "../../apis/PostgreAPI";
import Select from "react-select";

export default function Information() {
  const { t } = useTranslation();
  const { profile, setProfile, canEdit } = useContext(ProfileContext);
  const [isEdit, setIsEdit] = useState(false);
  const [faculty, setFaculty] = useState({});
  const [facultySelect, setFacultySelect] = useState({});
  const [department, setDepartment] = useState({});
  const [departmentSelect, setDepartmentSelect] = useState({});
  const [loadingFaculty, setLoadingFaculty] = useState(false);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProfile({ ...profile, [e.target.name]: value });
    // console.log(e.target.value)
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    updateInformation();
    setIsEdit(false);
    console.log("[Information.js] profile: " + profile.id);
  };

  const updateInformation = async () => {
    try {
      PostgreAPI.put("/employee/update/" + profile.id, profile);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    PostgreAPI.get("/forselect/faculty/" + localStorage.getItem("i18nextLng"))
      .then((res) => {
        // console.log("[Information.js] faculty get: ",res.data);
        setFaculty(res.data);
        setLoadingFaculty(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (loadingFaculty && profile.successful) {
      // console.log("[Information.js] faculty init: ",faculty);
      setFacultySelect(faculty.find((obj) => obj.value === profile.faculty_id));

      PostgreAPI.get(
        "/forselect/department/" +
          profile.faculty_id +
          "/" +
          localStorage.getItem("i18nextLng")
      )
        .then((res) => {
          // console.log("[Information.js] department get: ",res.data);
          setDepartment(res.data);
          setLoadingDepartment(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [faculty, loadingFaculty, profile]);

  const handleFacultySelect = (selectedOption) => {
    setProfile({ ...profile, faculty_id: selectedOption.value });
    setDepartmentSelect(department.find((obj) => obj.value === 18));
    console.log(
      "[Information.js] handleFacultySelect: " + selectedOption.value
    );
    setLoadingDepartment(false);
    setNewDepartment(true);
  };

  useEffect(() => {
    if (loadingDepartment && profile.successful && !newDepartment) {
      console.log("[Information.js] Department init: ", department);
      setDepartmentSelect(
        department.find((obj) => obj.value === profile.department_id)
      );
    }
  }, [department, loadingDepartment, profile]);

  const handleDepartmentSelect = (selectedOption) => {
    setNewDepartment(false);
    setProfile({ ...profile, department_id: selectedOption.value });
    console.log(
      "[Information.js] handleDepartmentSelect: " + selectedOption.value
    );
  };

  return (
    // console.log("[Information.js] faculty find: ", faculty[0]),
    // console.log("[Information.js] faculty facultySelect :", facultySelect.label),
    <>
      <div
        className={
          isEdit ? "information-container none" : "information-container"
        }
      >
        <div className="head-container">
          {canEdit && (
            <img
              src={edit}
              className="head-edit"
              onClick={() => setIsEdit(true)}
            />
          )}
          {/* <img src={user} className="head-icon"/> */}
          <i className="fal fa-user"></i>
          <h2>{t("professorprofile.information.title")}</h2>
        </div>
        <div className="infor-content">
          <table className="infor-table">
            <tbody>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.nameth")}</h3>
                </td>
                <td>
                  <input
                    readOnly="readOnly"
                    className="input-profile"
                    type="text"
                    value={profile.thainame}
                    onChange={handleChange}
                    name="thainame"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.nameen")}</h3>
                </td>
                <td>
                  <input
                    readOnly="readOnly"
                    className="input-profile"
                    type="text"
                    value={profile.engname}
                    onChange={handleChange}
                    name="engname"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.faculty")}</h3>
                </td>
                <td>
                  <input
                    readOnly="readOnly"
                    className="input-profile"
                    type="text"
                    value={facultySelect.label}
                    onChange={handleChange}
                    name="subject_code"
                    placeholder="คณะ"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.department")}</h3>
                </td>
                <td>
                  <input
                    readOnly="readOnly"
                    className="input-profile"
                    type="text"
                    value={departmentSelect.label}
                    onChange={handleChange}
                    name="subject_code"
                    placeholder="สาขา"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={
          isEdit ? "information-container" : "information-container none"
        }
      >
        <div className="head-container">
          <img src={user} className="head-icon" />
          <h2>{t("professorprofile.information.title")}</h2>
          <button className="button-profile MyButton" onClick={handlesubmit}>
            {t("btn.save2")}
          </button>
        </div>
        <div className="infor-content">
          <table className="infor-table">
            <tbody>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.nameth")}</h3>
                </td>
                <td>
                  <input
                    className="input-profile"
                    type="text"
                    value={profile.thainame}
                    onChange={handleChange}
                    name="thainame"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>{t("professorprofile.information.nameen")}</h3>
                </td>
                <td>
                  <input
                    className="input-profile"
                    type="text"
                    value={profile.engname}
                    onChange={handleChange}
                    name="engname"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>คณะ</h3>
                </td>
                <td>
                  {/* <input readOnly="readOnly" className="input-profile" type="text"  value={"วิศวกรรมศาสตร์"} onChange={handleChange} name='subject_code' placeholder="คณะ"/> */}
                  <Select
                    className="infor-select"
                    options={faculty}
                    placeholder={t("professorprofile.information.faculty")}
                    value={facultySelect}
                    isSearchable={false}
                    onChange={handleFacultySelect}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h3>สาขา</h3>
                </td>
                <td>
                  {/* <input readOnly="readOnly" className="input-profile" type="text"  value={"วิศวกรรมคอมพิวเตอร์"} onChange={handleChange} name='subject_code' placeholder="สาขา"/> */}
                  <Select
                    className="infor-select"
                    options={department}
                    placeholder={t("professorprofile.information.department")}
                    value={departmentSelect}
                    isSearchable={false}
                    onChange={handleDepartmentSelect}
                  />
                </td>
              </tr>
              {/* <tr>
                            <td><h3>Email</h3></td>
                            <td><input className="input-profile" type="text"  value={profile.email} onChange={handleChange} name='email' placeholder="email"/></td>
                        </tr>
                        <tr>
                            <td><h3>หมายเลขโทรศัพท์</h3></td>
                            <td><input className="input-profile" type="text"  value={profile.phone} onChange={handleChange} name='phone' placeholder="หมายเลขโทรศัพท์"/></td>
                        </tr>
                        <tr>
                            <td><h3>เว็บไชต์</h3></td>
                            <td><input className="input-profile" type="text"  value={profile.website} onChange={handleChange} name='website' placeholder="เว็บไชต์"/></td>
                        </tr> */}
            </tbody>
          </table>
          {/* <div style={{ marginTop: 20 }}><pre>{JSON.stringify(profile, null, 2)}</pre></div> */}
        </div>
      </div>
    </>
  );
}
