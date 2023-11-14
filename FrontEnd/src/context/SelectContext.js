import React, { useState, createContext } from "react";

export const SelectContext = createContext();

export const SelectContextProvider = (props) => {

  const [modalIsOpenLogin, setModalIsOpenLogin] = useState(false);
  const [modalIsOpenUploadDoc, setModalIsOpenUploadDoc] = useState(false);
  const [modalIsOpenCreateDoc, setModalIsOpenCreateDoc] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [select1, setSelect1] = useState({
    type: "",
    type2: "",
    search:""
  });

  return (
    <SelectContext.Provider
      value={{
        modalIsOpenLogin, setModalIsOpenLogin,
        modalIsOpenUploadDoc, setModalIsOpenUploadDoc,
        modalIsOpenCreateDoc, setModalIsOpenCreateDoc,
        select1, setSelect1,
        modalIsOpen, setModalIsOpen,
        modalIsOpen2, setModalIsOpen2
      }}
    >
      {props.children}
    </SelectContext.Provider>
  );
};