import React, { useState, createContext } from "react";

export const TQF3Context = createContext();

export const TQF3ContextProvider = (props) => {

    const  [docId, setDocId]  = useState(null);
    const  [TQFId, setTQFId] = useState(null);
    const  [canEdit, setCanEdit] = useState(false);
    const  [isEdit2, setIsEdit2] = useState(false);
    const  [multiinput, setMultiinput] = useState([{text:""}]);

    const  [data, setData] = useState(() => {return {
        code: "",
        thainame: "",
        engname: "",
        credit: "",
        program: undefined,
        Professor: [{employee_id:""}],
        termyear_code: "",
        pre_requisites_st: "",
        pre_requisites_nd: "",
        co_requisites: "",
        place: "",
        no_students: undefined,
        createdate: "",
        updatedate: "",
        dayandtime:"",
        createby: "",
        documentstatus_code: "",

        outcome: "",
        objective: "",
        description: "",
        describe: "",
        additionteach: "",
        activelearn: "",
        selflearn: "",
        consulthour: "",
        moraldev: "",
        moralteach: "",
        moralevaluation: "",
        knowledgeget: "",
        knowledgeteach: "",
        knowledgetvaluation: "",
        intellecdev: "",
        intellecteach: "",
        intellectevaluation: "",
        analydev: "",
        analyteach: "",
        analyevaluation: "",
        rangeoutcome: "",
        rangeteach: "",
        rangeevaluation: "",
        Teachplan:[{
            week:undefined,
            title:"",
            hour:"",
            activity:"",
            professorweek:""
        }],
        Evaluationplan:[{
            evaactivity: undefined,
            evaoutcome: "",
            howeva: "",
            evaweek: "",
            evaratio: ""
        }],
        book: "",
        doc: "",
        addodc: "",
        effect: "",
        evaluation: "",
        improve: "",
        exam: "",
        opeartion: "",
        CLO:[{
            id:"",
            tqf2course_clo_id:"",
            index:0,
            howteach:"", 
            howeva:"", 
            problem:"", 
            criterion: null,
            pass: null,
            text: ""
        }]
    }});

    const  [documents, setDocuments] = useState({
        name : '',
        createby : undefined,
        createdate : undefined,
        documenttype_id : undefined,
        documentstatus_code : undefined,
        documentdata_id : '',
        successful: false
    });
    
  
    

  return (
    <TQF3Context.Provider
      value={{
        data, setData,
        docId, setDocId,
        TQFId, setTQFId,
        documents, setDocuments,
        canEdit, setCanEdit,
        multiinput, setMultiinput,
        isEdit2, setIsEdit2
      }}
    >
      {props.children}
    </TQF3Context.Provider>
  );
};


// const  [data, setData] = useState(() => {return {
//   subject_code: "",
//   subject_thainame: "",
//   subject_engname: "",
//   credit: "",
//   program: undefined,
//   professor: "",
//   termyear: "",
//   pre_requi: "",
//   co_requi: "",
//   place: "",
//   UpdateDate : undefined,
//   type: "",
//   status: "",
//   outcome: [{text:""}],
//   objective: "",
//   description: "",
//   describe: "",
//   additionteach: "",
//   activelearn: "",
//   selflearn: "",
//   consulthour: "",
//   moraldev: "",
//   moralteach: "",
//   moralevaluation: "",
//   knowledgeget: "",
//   knowledgeteach: "",
//   knowledgetvaluation: "",
//   intellecdev: "",
//   intellecteach: "",
//   intellectevaluation: "",
//   analydev: "",
//   analyteach: "",
//   analyevaluation: "",
//   rangeoutcome: "",
//   rangeteach: "",
//   rangeevaluation: "",
//   Teachplan:[{
//       week:undefined,
//       title:"",
//       hour:"",
//       activity:"",
//       professorweek:""
//   }],
//   Evaluationplan:[{
//       evaactivity: undefined,
//       evaoutcome: "",
//       howeva: "",
//       evaweek: "",
//       evaratio: ""
//   }],
//   book: "",
//   doc: "",
//   addodc: "",
//   effect: "",
//   evaluation: "",
//   improve: "",
//   exam: "",
//   opeartion: ""
// }});