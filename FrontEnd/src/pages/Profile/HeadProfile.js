import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Profile.css";
import user from "../../assert/image/user.png";
import edit from "../../assert/icon/edit.svg";
import uploadphoto from "../../assert/icon/uploadphoto.svg";
import { ProfileContext } from "../../context/index";
import PostgreAPI from "../../apis/PostgreAPI";
import { PostgreURL } from "../../apis/PostgreAPI";
import Bar from "./001bar";

export default function HeadProfile() {
  const { t } = useTranslation();
  const { profile, setProfile, canEdit } = useContext(ProfileContext);
  const [isEdit, setIsEdit] = useState(false);

  // ----------------------------------------------------------------------------
  const [file, setFile] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [photoid, setPhotoid] = useState(0);
  // ----------------------------------------------------------------------------

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProfile({ ...profile, [e.target.name]: value });
    // console.log(e.target.value)
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    PostgreAPI.put("/employee/update/" + profile.id, profile);
    setIsEdit(false);
    console.log("[HeadProfile.js] profile: " + profile.id);
    onClickUpload();
  };

  // ------------------------------------------------------------------------
  const handleUploadImage = (e) => {
    const file = e.target.files[0]; // เก็บไว้ setState ลงใน file
    const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
      // sconsole.log("[HeadProfile.js] handleUploadImage: ",file);
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
  };

  // useEffect(()=>{
  //     onClickUpload();
  //     console.log("[HeadProfile.js] file2: ",file);
  // }, [file])

  const onClickUpload = () => {
    // console.log("[HeadProfile.js] onClickUpload: done :",file);
    const formData = new FormData();
    formData.append("myImage", file);
    // console.log("[HeadProfile.js] formData: ",formData);

    PostgreAPI.post("/image/upload", formData)
      .then((res) => {
        console.log("[HeadProfile.js] image/upload: ", res.data);
        const path2 = res.data.destination.replace("/app", PostgreURL);
        const img = {
          filename: res.data.filename,
          path: path2,
          mimetype: res.data.mimetype,
          size: undefined,
          thumbnail: undefined,
        };
        PostgreAPI.post("/photo/supercreate", img)
          .then((res) => {
            setPhotoid(res.data.id);
            console.log(
              "[HeadProfile.js] photoid: ",
              photoid,
              " <- ",
              res.data.id
            );
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (photoid !== 0) {
      UpdatePhotoID();
    }
  }, [photoid]);

  const UpdatePhotoID = () => {
    const body = {
      newphoto_id: photoid,
    };
    console.log("[HeadProfile.js] photoid/body: ", body);

    PostgreAPI.put("/photo/updatephotoidauth", body)
      .then((res) => {
        toast.success("photoid was updated!");
        // window.location.reload();
        PostgreAPI.delete("/photo/superdelete/" + profile.photo_id)
          .then((res) => {
            toast.success("Old photo was deleted!");
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ------------------------------------------------------------------------

  return (
    <>
      {isEdit ? (
        <div className="Head-profile">
          <div className="Head-profile-container">
            <button className="button-profile MyButton" onClick={handlesubmit}>
              {t("btn.save2")}
            </button>
          </div>
          <div className="Head-profile-content">
            <div className="Head-profile-photo-edit">
              <div className="Head-profile-photo-edit-photodiv">
                <button className="Head-profile-photo-edit btn">
                  <img src={uploadphoto} />
                </button>
                <input type="file" onChange={handleUploadImage} name="myfile" />
                <img
                  src={imagePreviewUrl ? imagePreviewUrl : profile.path}
                  className="userphoto"
                />
              </div>
            </div>

            <div className="Head-profile-name">
              <h1>
                {localStorage.getItem("i18nextLng") == "en"
                  ? profile.engname
                  : profile.thainame}
              </h1>
            </div>
            <div className="Head-profile-contact">
              <br />
              <input
                className="Head-profile-contact input"
                type="text"
                value={profile.email}
                onChange={handleChange}
                name="email"
                placeholder="email"
              />
              <input
                className="Head-profile-contact input"
                type="text"
                value={profile.phone}
                onChange={handleChange}
                name="phone"
                placeholder="หมายเลขโทรศัพท์"
              />
              <input
                className="Head-profile-contact input"
                type="text"
                value={profile.website}
                onChange={handleChange}
                name="website"
                placeholder="เว็บไชต์"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="Head-profile">
          <div className="Head-profile-container">
            {canEdit && <img src={edit} onClick={() => setIsEdit(true)} />}
          </div>
          <div className="Head-profile-content">
            <div className="Head-profile-photo-edit">
              <div className="Head-profile-photo-edit-photodiv">
                <div className="Head-profile-photo-photodiv">
                  <img
                    src={profile.path === null ? user : profile.path}
                    className="userphoto"
                  />
                </div>
              </div>
            </div>

            <div className="Head-profile-name">
              <h1>
                {localStorage.getItem("i18nextLng") == "en"
                  ? profile.engname
                  : profile.thainame}
              </h1>
            </div>
            <div className="Head-profile-contact">
              <Bar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
