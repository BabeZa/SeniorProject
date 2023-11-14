import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen, 
        setModalIsOpen,
        modalIsOpen2,
        setModalIsOpen2
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};