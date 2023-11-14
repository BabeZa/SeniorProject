import React, { useContext } from "react";
import { TQF5Context } from "../../../context/TQF5Context";
import DynamicTable from "./component/DynamicTable";
import TextareaAutosize from "react-textarea-autosize";

function Chapter6() {
  const {
    TQF5data,
    handleChange,
    handleArrayChange,
    handleArrayAdd,
    handleArrayRemove,
    isEdit,
  } = useContext(TQF5Context);
  return (
    <form>
      {/* {console.log("[TQF5.js] chapter4.js render")} */}
      <div>
        <h1>หมวดที่ 6 แผนการปรับปรุง</h1>
      </div>
      <br />
      <div>
        <h2>
          1.
          ความก้าวหน้าของแผนการปรับปรุงตามที่เสนอในรายงานผลการดำเนินการของรายวิชาครั้งที่ผ่านมา
        </h2>
        <DynamicTable
          columns={[
            {
              name: "plan",
              label: "แผนการปรับปรุงที่เสนอในครั้งที่ผ่านมา",
            },
            {
              name: "performance",
              label: "ผลการดำเนินงาน",
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
          datas={TQF5data.course_progress}
          arrayname={"course_progress"}
          onTableChange={handleArrayChange}
          onTableAdd={handleArrayAdd}
          onTableRemove={handleArrayRemove}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
          paramsIsEdit={isEdit}
        />
      </div>
      <div>
        <h2>2. การดำเนินการอื่นๆในการปรับปรุงรายวิชา</h2>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          readOnly={!isEdit}
          name={"other_progress"}
          value={TQF5data.other_progress || ""}
          placeholder={"การดำเนินการอื่นๆในการปรับปรุงรายวิชา"}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <h2>3. ข้อเสนอแผนการปรับปรุงรายวิชาสำหรับภาค/ปีการศึกษาต่อไป</h2>
        <DynamicTable
          columns={[
            {
              name: "proposal",
              label: "ข้อเสนอแผนการปรับปรุง",
            },
            {
              name: "due_date",
              label: "กำหนดเวลาที่แล้วเสร็จ",
            },
            {
              name: "responsible",
              label: "ผู้รับผิดชอบ",
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
          datas={TQF5data.proposal_updateplan}
          arrayname={"proposal_updateplan"}
          onTableChange={handleArrayChange}
          onTableAdd={handleArrayAdd}
          onTableRemove={handleArrayRemove}
          paramsClass="document-textarea MyTextarea mytable textarea-bordered"
          paramsReadOnly={!isEdit}
          paramsIsEdit={isEdit}
        />
      </div>
      <div>
        <h2>
          4.ข้อเสนอแนะของอาจารย์ผู้รับผิดชอบรายวิชา
          ต่ออาจารย์ผู้รับผิดชอบหลักสูตร
        </h2>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          readOnly={!isEdit}
          name={"suggestion_toleadear"}
          value={TQF5data.suggestion_toleadear || ""}
          placeholder={
            "4.ข้อเสนอแนะของอาจารย์ผู้รับผิดชอบรายวิชา ต่ออาจารย์ผู้รับผิดชอบหลักสูตร"
          }
          onChange={(e) => handleChange(e)}
        />
      </div>
    </form>
  );
}

export default Chapter6;
