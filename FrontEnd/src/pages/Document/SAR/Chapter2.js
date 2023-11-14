import React, { useContext } from "react";
import { SARContext } from "../../../context/SARContext";
import TextareaAutosize from "react-textarea-autosize";
import Checkdiv from "./component/Checkdiv";
import DynamicInput from "./component/DynamicInput";

// &emsp; = tab
// &ensp; = space
const Chapter2 = () => {
  const {
    SARdata,
    handleChange,
    handleArrayChange,
    handleArrayAdd,
    handleArrayRemove,
    handleCheck,
    handleCheckV2,
    handleELOAdd,
    handleELORemove,
    handleNestedArrayAdd,
  } = useContext(SARContext);

  return (
    <form>
      <div>
        <h1>ส่วนที่ 2 องค์ประกอบตามเกณฑ์ประเมินคุณภาพระดับหลักสูตร</h1>
      </div>
      <br />
      <div>
        <h2>
          องค์ประกอบที่ 1 ผลการเรียนรู้ที่คาดหวัง (Expected Learning Outcomes)
        </h2>
        <h3>
          1.1 The expected learning outcome have been clearly formulated and
          aligned with the vision and mission of the university.
        </h3>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="ELO_text"
          placeholder={placeholder.ELO_text}
          value={SARdata.ELO_text}
          onChange={(e) => handleChange(e)}
        />
        <h3>โดยที่ผลการเรียนรู้ที่คาดหวังมีทั้งหมดดังนี้</h3>
        <DynamicInput
          datas={{
            data: SARdata.ELO,
            name: "text",
            arrayname: "ELO",
            placeholder: "ผลการเรียนรู้ที่คาดหวัง",
          }}
          onChange={handleArrayChange}
          onAdd={handleELOAdd}
          onRemove={handleELORemove}
        />
        <h3>
          &emsp;&emsp;คุณลักษณะบัณฑิตพึงประสงค์ของมหาวิทยาลัยฯกับผลการเรียนรู้ที่คาดหวัง
          สามารถแสดง ความสัมพันธ์ได้ดังตาราง ดังนี้
        </h3>
        <table
          className="table table-bordered"
          // style={{ border: "1px solid #dee2e6" }}
        >
          <thead>
            <tr>
              <th style={{ verticalAlign: "middle" }} rowSpan="2">
                KMUTT Student QF
              </th>
              <th colSpan={SARdata.ELO.length}>CPE ELO</th>
              <th rowSpan="2">&nbsp;</th>
            </tr>
            <tr>
              {Array(SARdata.ELO.length)
                .fill()
                .map((el, index) => (
                  <th>{index + 1}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {SARdata.characteristic_table.map((el, index) => (
              <tr>
                <td>
                  <p>{el.text}</p>
                </td>
                {el.items.map((item, index2) => (
                  <td
                    style={{ padding: 0 }}
                    onClick={(e) =>
                      handleCheckV2(
                        e,
                        "characteristic_table",
                        "items",
                        el,
                        index2
                      )
                    }
                  >
                    <Checkdiv checked={item} />
                  </td>
                ))}
                <td style={{ padding: 0 }}>
                  <button
                    type="button"
                    onClick={(e) =>
                      handleNestedArrayAdd(e, "characteristic_table", el)
                    }
                  >
                    <i className="fas fa-plus" />
                  </button>
                  {0 !== index && (
                    <button
                      type="button"
                      onClick={(e) =>
                        handleArrayRemove(e, "characteristic_table", el)
                      }
                    >
                      <i className="fas fa-minus" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};
export default Chapter2;
const placeholder = {
  ELO_text: `        หลักสูตรวิศวกรรมศาสตรบัณฑิตสาขาวิศวกรรมคอมพิวเตอร์มีปรัชญาการศึกษา เพื่อผลิต
  วิศวกรที่มีความรู้
  ความสามารถในการคิด การออกแบบ การประยุกต์ใช้งาน การติดตามเรียนรู้
  เทคโนโลยีใหม่ๆ ด้วยตนเองและการเรียนรู้ตลอดชีวิต รวมถึงส่งเสริมให้มีการศึกษาต่อในระดับที่
  สูงขึ้น สอดคล้องกับปณิธานของคณะวิศวกรรมศาสตร์คือ “ในหมู่มนุษย์ผู้ที่ฝึกตนดีแล้วเป็น
  ผู้ประเสริฐที่สุด” โดยมีวัตถุประสงค์ของหลกัสูตรดังนี้
          1. ผลิตบัณฑิตวิศวกรรมคอมพิวเตอร์ให้มีทักษะ 5 ด้าน ได้แก่การเรียนรู้ด้วยตนเอง มีความคิดสร้างสรรค์
  ตระหนักในคุณธรรมและจริยธรรม มีทักษะทางสังคม และเป็นนักปฏิบัติ
          2. ผลิตบัณฑิตวิศวกรรมคอมพิวเตอร์ให้มีความรู้ด้านสถาปัตยกรรมคอมพิวเตอร์ทั้งด้าน
  ฮาร์ดแวร์ซอฟต์แวร์และการประยุกต์ใช้งานคอมพิวเตอร์ในอุตสาหกรรมเป็นอย่างดี ตอบสนอง
  ความต้องการบุคลากรด้าน
  คอมพิวเตอร์ทั้งภาครัฐบาลและเอกชน ซึ้งคาดว่า ประเทศไทยจะมี
  ความต้องการบุคลากรด้านคอมพิวเตอร์
  เป็นจํานวนมากเมื่อก้าวสู่สภาพประเทศอุตสาหกรรม
          3. เพื่อส่งเสริมการวิจัย พัฒนาและถ่ายทอดเทคโนโลยที่เหมาะสม จากต่างประเทศ
          4. เพื่อให้บริการวิชาการด้านวิศวกรรมคอมพิวเตอร์ในประเทศไทย โดยเน้นการวิจัยและ
  พัฒนาที่ใช้คอมพิวเตอร์ เพื่อเพิ่มประสิทธิภาพการผลิตอุตสาหกรรมเป็นสิ่งสำคัญ
          5. เพื่อปลูกฝังนักศึกษาให้มีจิตสํานึกในการใฝ่ เรียนรู้สามารถเรียนรู้ได้ด้วยตนเองและ
  เรียนรู้อย่างต่อเนื่องตลอดชีวิต
          ถึงแม้ไม่ไดร้ะบุไวอ้ย่างชัดเจนในเล่มหลักสูตรเพื่อให้บรรลุตามวัตถุประสงค์ของหลักสูตร
  ดังกล่าวในการประชุมสัมมนาภาควิชาฯ ซึ่งมีคณาจารย์และบุคลากรของภาควิชาทุกท่านเข้าร่วม`,
};
