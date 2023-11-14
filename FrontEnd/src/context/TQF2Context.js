import React, { useState, createContext } from "react";

export const TQF2Context = createContext();

export const TQF2ContextProvider = (props) => {

    const  [docId, setDocId]  = useState(null);
    const  [TQFId, setTQFId] = useState(null);
    const  [canEdit, setCanEdit] = useState(false);
    const  [isEdit, setIsEdit] = useState(true);

    const  [dataTQF2, setDataTQF2] = useState(() => {return {
      program_name:"",
      program_depart:"",
      program_year:"",
      program_code: "",
      program_thainame: "",
      program_engname: "",
      full_thai: "",
      mini_thai: "",
      full_eng: "",
      mini_eng: "",
      major: "",
      allcredit: "",
      createdate: "",
      createby: "",
      course: [{
        index: 0,
        course_code: "",
        course_thainame: "",
        course_engname: "",
        course_credit: "",
        course_prerequi: "",
        course_describtion: "",
        course_expectlearningoutcome: [{
            index: 0,
            value: ""
        }]
      }],
      course_delete:[{
        course_id: ""
      }],
      course_expectlearningoutcome_delete:[{
        course_expectlearningoutcome_id: ""
      }]
    }});

    const  [documentData, setDocumentData] = useState({
        name : '',
        createby : undefined,
        createdate : undefined,
        documenttype_id : undefined,
        documentstatus_code : undefined,
        documentdata_id : '',
        successful: false
    });
    
  
    

  return (
    <TQF2Context.Provider
      value={{
        dataTQF2, setDataTQF2,
        documentData, setDocumentData,
        canEdit, setCanEdit,
        isEdit, setIsEdit
      }}
    >
      {props.children}
    </TQF2Context.Provider>
  );
};
