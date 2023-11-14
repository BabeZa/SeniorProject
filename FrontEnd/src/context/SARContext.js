import React, { useState, createContext } from "react";
import _ from "lodash";

export const SARContext = createContext();

export const SARContextProvider = (props) => {
  const [SARdata, setSARdata] = useState({
    conclution_director: "",
    sar_plan: "",
    sar_process: "",
    overall: "",
    cpe: "",
    ELO_text: "",
    ELO: [
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
    ],
    characteristic_table: [
      {
        text: "1. Knowledge",
        items: [false, true, true, false, false, false, true, false, false],
      },
    ],
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (!isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }
    setSARdata((prev) => ({ ...prev, [name]: value }));
  };
  const handleArrayChange = (e, arrayname, object) => {
    let list = SARdata[arrayname];
    const index = list.indexOf(object);
    const { name, value } = e.target;
    // console.log(list, index);
    list[index][name] = value;
    setSARdata((prev) => ({ ...prev, [arrayname]: list }));
    // console.log(arrayname, object);
  };
  const handleArrayAdd = (e, arrayname, object) => {
    e.preventDefault();
    let list = SARdata[arrayname];
    const index = list.indexOf(object);
    const addobject = {};
    for (const attribute in list[0]) {
      addobject[attribute] = "";
    }
    list.splice(index + 1, 0, addobject);
    setSARdata((prev) => ({
      ...prev,
      [arrayname]: list,
    }));
  };

  const handleArrayRemove = (e, arrayname, object) => {
    e.preventDefault();
    let list = SARdata[arrayname];
    const index = list.indexOf(object);
    list.splice(index, 1);
    setSARdata((prev) => ({ ...prev, [arrayname]: list }));
  };

  const handleCheck = (e, name, arrayname, object) => {
    e.stopPropagation();
    let list = SARdata[arrayname];
    const index = list.indexOf(object);
    list[index][name] = !list[index][name];
    setSARdata((prev) => ({ ...prev, [arrayname]: list }));
  };

  const handleCheckV2 = (e, arrayname, nestarrayname, object, index) => {
    e.stopPropagation();
    let list = SARdata[arrayname];
    const listindex = list.indexOf(object);
    list[listindex][nestarrayname][index] = !list[listindex][nestarrayname][
      index
    ];
    setSARdata((prev) => ({ ...prev, [arrayname]: list }));
  };

  const handleELOAdd = (e, arrayname, object) => {
    e.preventDefault();
    let list = SARdata[arrayname];
    let list2 = SARdata["characteristic_table"];
    const index = list.indexOf(object);
    const addobject = {};
    for (const attribute in list[0]) {
      addobject[attribute] = "";
    }
    list.splice(index + 1, 0, addobject);
    for (const list2index in list2) {
      list2[list2index].items.splice(index + 1, 0, false);
    }
    setSARdata((prev) => ({
      ...prev,
      [arrayname]: list,
      characteristic_table: list2,
    }));
  };

  const handleELORemove = (e, arrayname, object) => {
    e.preventDefault();
    let list = SARdata[arrayname];
    let list2 = SARdata["characteristic_table"];
    const index = list.indexOf(object);
    list.splice(index, 1);
    for (const list2index in list2) {
      list2[list2index].items.splice(index, 1);
    }
    setSARdata((prev) => ({
      ...prev,
      [arrayname]: list,
      characteristic_table: list2,
    }));
  };
  const handleNestedArrayAdd = (e, arrayname, object) => {
    e.preventDefault();
    let list = SARdata[arrayname];
    const index = list.indexOf(object);
    let addobject = {};
    for (const key in list[0]) {
      // console.log(_.isArray(list[listindex][key]), list[listindex][key]);
      if (_.isArray(list[0][key])) {
        const length = list[0][key].length;
        const newarray = Array(length).fill(false);
        addobject[key] = newarray;
      } else {
        addobject[key] = "";
      }
    }
    list.splice(index + 1, 0, addobject);
    setSARdata((prev) => ({
      ...prev,
      [arrayname]: list,
    }));
  };

  return (
    <SARContext.Provider
      value={{
        SARdata,
        setSARdata,
        handleChange,
        handleArrayChange,
        handleArrayAdd,
        handleArrayRemove,
        handleCheckV2,
        handleELOAdd,
        handleELORemove,
        handleNestedArrayAdd,
      }}
    >
      {props.children}
    </SARContext.Provider>
  );
};
