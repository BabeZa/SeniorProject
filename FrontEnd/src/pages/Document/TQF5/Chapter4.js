import React, { useContext } from "react";
import { TQF5Context } from "../../../context/TQF5Context";
import StaticTable from "./component/StaticTable";

const Chapter4 = () => {
  const { TQF5data, handleArrayChange, isEdit } = useContext(TQF5Context);

  return (
    <form>
      {/* {console.log("[TQF5.js] chapter4.js render")} */}
      <div>
        <h1>หมวดที่ 4 ปัญหาและผลกระทบต่อการดำเนินการ</h1>
      </div>
      <br />
      <div>
        <h2>1. ประเด็นปัญหาด้านทรัพยากรประกอบการเรียนและสิ่งอำนวยความสะดวก</h2>
        <StaticTable
          columns={[
            {
              name: "problem",
              label: "ประเด็นปัญหาด้านทรัพยากร\nประกอบการเรียนการสอน",
            },
            { name: "effect", label: "ผลกระทบ" },
          ]}
          datas={TQF5data.resourse_problems}
          arrayname={"resourse_problems"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
      <div>
        <h2>2. ปัญหาด้านการบริหารและองค์กร</h2>
        <StaticTable
          columns={[
            {
              name: "problem",
              label: "ปัญหาด้านการบริหารและองค์กร",
            },
            { name: "effect", label: "ผลกระทบต่อผลกาเรียนรู้ของนักศึกษา" },
          ]}
          datas={TQF5data.organize_problems}
          arrayname={"organize_problems"}
          onTableChange={handleArrayChange}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
        />
      </div>
    </form>
  );
};

export default Chapter4;
