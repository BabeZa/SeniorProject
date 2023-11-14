import React, { useContext } from "react";
import { TQF5Context } from "../../../context/TQF5Context";
import DynamicTable from "./component/DynamicTable";
const Chapter5 = () => {
  const {
    TQF5data,
    handleArrayChange,
    handleArrayAdd,
    handleArrayRemove,
    isEdit,
  } = useContext(TQF5Context);

  return (
    <form>
      <div>
        <h1>หมวดที่ 5 การประเมินรายวิชา</h1>
      </div>
      <br />
      <div>
        <h2>1. ผลการประเมินรายวิชาโดยนักศึกษา (แนบเอกสาร)</h2>
        <DynamicTable
          columns={[
            {
              name: "criticism",
              label: "ข้อวิพากษ์ที่สำคัญจากผลการประเมิน\nโดยนักศึกษา",
            },
            {
              name: "opinion",
              label: "ความเห็นของอาจารย์ผู้สอนต่อการประเมิน\nโดยนักศึกษา",
            },
            {
              name: "delete-button",
              content: "removeButton",
            },
            {
              name: "plus-button",
              content: "addButton",
            },
          ]}
          datas={TQF5data.studenteva_result}
          arrayname={"studenteva_result"}
          onTableChange={handleArrayChange}
          onTableAdd={handleArrayAdd}
          onTableRemove={handleArrayRemove}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
      <br />
      <div>
        <h2>2. ผลการประเมินรายวิชาโดยวิธีอื่น</h2>
        <DynamicTable
          columns={[
            {
              name: "criticism",
              label: "ข้อวิพากษ์ที่สำคัญจากผลการประเมิน\nโดยวิธีอื่น",
            },
            {
              name: "opinion",
              label: "ความเห็นของอาจารย์ผู้สอนต่อการประเมิน\nโดยวิธีอื่น",
            },
            {
              name: "delete-button",
              content: "removeButton",
            },
            {
              name: "plus-button",
              content: "addButton",
            },
          ]}
          datas={TQF5data.othereva_result}
          arrayname={"othereva_result"}
          onTableChange={handleArrayChange}
          onTableAdd={handleArrayAdd}
          onTableRemove={handleArrayRemove}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
    </form>
  );
};

export default Chapter5;
