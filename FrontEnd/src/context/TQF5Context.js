import React, { useState, createContext } from "react";

export const TQF5Context = createContext();

export const TQF5ContextProvider = (props) => {
  const [docId, setDocId] = useState(null);
  const [TQFId, setTQFId] = useState(null);
  const [canEdit, setCanEdit] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [documents, setDocuments] = useState({
    name: "",
    createby: undefined,
    createdate: undefined,
    documenttype_id: undefined,
    documentstatus_code: undefined,
    documentdata_id: "",
    successful: false,
  });
  const [TQF5data, setTQF5data] = useState({
    //ดึงมาจาก TQF3
    code: "",
    credit: "",
    thainame: "",
    engname: "",
    place: "",
    study_time: "",
    //ดึงมาจาก weeklynote ทุกอัน
    realvsplan: [
      {
        title: "",
        hour: "",
        real_hour: "",
        reason_note: "",
      },
    ],
    notplan: [
      {
        title: "",
        why_not_plan: "",
        sol_not_plan: "",
      },
    ],
    teachplanperformance: [
      {
        CLO: "",
        howteach: "",
        performance: "",
        problem_solving: "",
      },
    ],
    //หมวด3เป็นต้นไป ไม่มีให้ดึง
    no_students: undefined,
    remain_students: undefined,
    withdraw_students: undefined,
    student_grade: [],
    error_score: "",
    error_timeeva: [
      {
        error: "",
        reason: "",
      },
    ],
    error_howeva: [
      {
        error: "",
        reason: "",
      },
    ],
    student_reconsider: [
      {
        reconsider: "",
        conclude: "",
      },
    ],
    resourse_problems: [
      {
        problem: "",
        effect: "",
      },
    ],
    organize_problems: [
      {
        problem: "",
        effect: "",
      },
    ],
    studenteva_result: [
      {
        criticism: "",
        opinion: "",
      },
    ],
    othereva_result: [
      {
        criticism: "",
        opinion: "",
      },
    ],
    course_progress: [
      {
        plan: "",
        performance: "",
      },
    ],
    other_progress: "",
    proposal_updateplan: [
      {
        proposal: "",
        due_date: "",
        responsible: "",
      },
    ],
    suggestion_toleadear: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (!isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }
    setTQF5data((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, arrayname, object) => {
    let list = TQF5data[arrayname];
    const index = list.indexOf(object);
    const { name, value } = e.target;
    // console.log(list, index);
    list[index][name] = value;
    setTQF5data((prev) => ({ ...prev, [arrayname]: list }));
    // console.log(arrayname, object);
  };

  const handleArrayAdd = (e, arrayname, object) => {
    e.preventDefault();
    let list = TQF5data[arrayname];
    const index = list.indexOf(object);
    const addobject = {};
    for (const attribute in list[0]) {
      addobject[attribute] = "";
    }
    list.splice(index + 1, 0, addobject);
    setTQF5data((prev) => ({
      ...prev,
      [arrayname]: list,
    }));
  };

  const handleArrayRemove = (e, arrayname, object) => {
    e.preventDefault();
    let list = TQF5data[arrayname];
    const index = list.indexOf(object);
    list.splice(index, 1);
    setTQF5data((prev) => ({ ...prev, [arrayname]: list }));
  };

  return (
    <TQF5Context.Provider
      value={{
        TQF5data,
        setTQF5data,
        handleChange,
        handleArrayChange,
        handleArrayAdd,
        handleArrayRemove,
        documents,
        setDocuments,
        docId,
        setDocId,
        TQFId,
        setTQFId,
        canEdit,
        setCanEdit,
        isEdit,
        setIsEdit,
      }}
    >
      {props.children}
    </TQF5Context.Provider>
  );
};
