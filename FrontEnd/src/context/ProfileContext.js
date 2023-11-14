import React, { useState, createContext } from "react";

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
  const [profile, setProfile] = useState(() => {return {
    thainame: "",
    engname: "",
    email: "",
    phone: "",
    website: "",
    faculty_id: undefined,
    department_id: undefined,
    level: undefined,
    photo_id: undefined,
    users_id: undefined,
    isactive: undefined,
    successful: false
  }});
  const [canEdit, setCanEdit] = useState(false);
  
  return (
    <ProfileContext.Provider
      value={{
        profile, setProfile,
        canEdit, setCanEdit

      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};