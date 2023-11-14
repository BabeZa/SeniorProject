import React, { useState, createContext } from "react";

export const WeekSNoteContext = createContext();

export const WeekSNoteContextProvider = (props) => {

    const [subjectID, setSubjectID] = useState('0');
    const [modalCLOIsOpen, setModalCLOIsOpen] = useState(false);

    const [WeekSNoteData, setWeekSNoteData] = useState({
      code: "",
      thainame: "",
      engname: "",
      credit: "",
      termyear_code: "",
      study_time: 0,
      no_students: 0,
      CLO: [],
      successful: true
    })
    const [TeachplanData, setTeachplanData] = useState([{
      id:"",
      week:"",
      title:"",
      hour:0,
      activity:"",
      professorweek:"",
      activity_note:"",
      Evaluations:[],
      EvaCLO:[]
    }]);
  
    

  return (
    <WeekSNoteContext.Provider
      value={{
        subjectID, setSubjectID,
        modalCLOIsOpen, setModalCLOIsOpen,
        WeekSNoteData, setWeekSNoteData,
        TeachplanData, setTeachplanData
        
      }}
    >
      {props.children}
    </WeekSNoteContext.Provider>
  );
};
