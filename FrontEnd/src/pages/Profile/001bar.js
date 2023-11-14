import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./Profile.css";
import mail from "../../assert/icon/mail.svg";
import phone from "../../assert/icon/phone.svg";
import web from "../../assert/icon/web.svg";
import mail2 from "../../assert/icon/mail2.svg";
import phone2 from "../../assert/icon/phone2.svg";
import web2 from "../../assert/icon/web2.svg";
import { ProfileContext } from "../../context/index";

export default function Bar() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [select, setSelect] = useState(0);

  return (
    <>
      <div className="profile-bar-container">
        <div
          className={
            select !== 1 ? "profile-bar-item a" : "profile-bar-item a none"
          }
          onClick={() => setSelect(1)}
        >
          <div className="profile-bar-i">
            <i className="far fa-envelope" />
          </div>
        </div>
        <div
          className={
            select === 1
              ? "profile-bar-item a text"
              : "profile-bar-item a text none"
          }
          onClick={() => setSelect(0)}
        >
          <p>{profile.email}</p>
        </div>

        <hr className="profile-bar-hr a" />
        {/* ------------------------------------------------------ */}

        <div
          className={
            select !== 2 ? "profile-bar-item b" : "profile-bar-item b none"
          }
          onClick={() => setSelect(2)}
        >
          <div className="profile-bar-i">
            <i className="far fa-phone-alt" />
          </div>
        </div>
        <div
          className={
            select === 2
              ? "profile-bar-item b text"
              : "profile-bar-item b text none"
          }
          onClick={() => setSelect(0)}
        >
          <p>{profile.phone}</p>
        </div>

        <hr className="profile-bar-hr a" />
        {/* ------------------------------------------------------ */}

        <div
          className={
            select !== 3 ? "profile-bar-item c" : "profile-bar-item c none"
          }
          onClick={() => setSelect(3)}
        >
          <div className="profile-bar-i">
            <i className="fal fa-globe" />
          </div>
        </div>
        <div
          className={
            select === 3
              ? "profile-bar-item c text"
              : "profile-bar-item c text none"
          }
          onClick={() => setSelect(0)}
        >
          <p>{profile.website || "-"}</p>
        </div>
      </div>
    </>
  );
}
