import React, { useRef, useContext } from "react";
import { SARContext } from "../../../context/SARContext";
import TextareaAutosize from "react-textarea-autosize";

const Chapter1 = () => {
  const { SARdata, handleChange } = useContext(SARContext);

  return (
    <form>
      <div>
        <h1>ส่วนที่ 1 บทนำ</h1>
      </div>
      <br />
      <div>
        <h2>1.บทสรุปผู้บริหาร</h2>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="conclution_director"
          placeholder={placeholder.conclution_director}
          value={SARdata.conclution_director}
          onChange={(e) => handleChange(e)}
          minRows={22}
        />
      </div>
      <div>
        <h2>2. แผนการดำเนินงานการประเมินตนเอง</h2>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="sar_plan"
          placeholder={placeholder.sar_plan}
          value={SARdata.sar_plan}
          onChange={(e) => handleChange(e)}
        />
        <p>กระบวนการในการจัดทํารายงานการประเมินตนเอง แสดงได้ดังนี้</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button>เขียนข้อความ</button>
          <p>หรือ</p>
          <button>อัพโหลดรูปภาพ</button>
        </div>

        {/* <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="sar_process"
          placeholder={placeholder.sar_process}
          value={SARdata.sar_process}
          onChange={(e) => handleChange(e)}
        /> */}
      </div>
      <div>
        <h2>
          1.3 ภาพรวมของมหาวิทยาลัย คณะวิศวกรรมศาสตร์
          และภาควิชาวิศวกรรมคอมพิวเตอร์
        </h2>
        <h3>1.3.1 ภาพรวมของมหาวิทยาลัย</h3>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="overall"
          placeholder={placeholder.overall}
          value={SARdata.overall}
          onChange={(e) => handleChange(e)}
        />
        <h3>1.3.2 ภาควิชาวิศวกรรมคอมพิวเตอร์</h3>
        <TextareaAutosize
          className="document-textarea MyTextarea textarea-bordered"
          name="cpe"
          placeholder={placeholder.cpe}
          value={SARdata.cpe}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </form>
  );
};
export default Chapter1;
const placeholder = {
  conclution_director: `รายงานการประเมินตนเองฉบับนี้จัดทำขึ้นโดยเฉพาะภาควิชาวัศวกรรมคอมพิวเตอร์ มจธ. มีวัตถุประสงค์เพื่อใช้บริการตรวจการประเมินคุณภาพตามเกณฑ์ของ AUN-QA และ CUPT-QA
    การตรวจประเมินตนเองตามเกณฑ์ของ AUN-QA เป็นการประเมินกระบวนการคุณภาพ
ที่เน้นลูกค้า(customer focus) หรือผู้มีส่วนได้ส่วนเสีย ภาควิชาวิศวกรรมคอมพิวเตอร์แบ่ง
กระบวนการหลักออกเป็นการออกแบบหลักสูตรการ
สรรหาและพัฒนาบุคลากร การจัดการเรียน
การสอน การสรรหาและพัฒนานักศึกษา การบริหารจัดการห้องเรียนเรียน
ห้องปฏิบัติการ
และสิ่งอำนวยความสะดวกต่างๆ และกระบวนการรับฟังความคิดเห็นจากผู้มีส่วนได้ส่วนเสีย ในการดําเนินงานรายปีกระบวนการต่างๆ จะถูกกาํหนดไวใ้นแผนการดําเนินการระบบการบริหาร
งบประมาณแบบ PBBS ล่าสุด
คือแผน PBBS ประจําปี งบประมาณ 2560 (ตุลาคม 2559 –กันยายน 2560) ซึ่งประกอบด้วย 8 โครงการย่อยดังนี้
    โครงการที่ 1 โครงการบริหารจัดการภาควิชา
    โครงการที่ 2 โครงการจัดการเรียนการสอน
    โครงการที่ 3 โครงการส่งเสริมกิจกรรมพฒั นานกัศึกษาและจิตอาสา
    โครงการที่ 4 โครงการส่งเสริมการสร้างงานวจิยัและนวัตกรรม
    โครงการที่ 5 โครงการประชาสัมพันธ์และสื่อสารภาควิชา
    โครงการที่ 6 โครงการส่งเสริมและพฒั นากิจการนานาชาติ
    โครงการที่ 7 โครงการศูนย์นวัตกรรมประมวลผลวิจัยและบริการวิชาการ
    โครงการที่ 8 โครงการบริหารค่าตอบแทน PBBS`,
  sar_plan: `         แผนการดําเนินงานการประเมินตนเองของภาควิชาวิศวกรรมคอมพิวเตอร์ได้มีการบูรณา
    การเข้ากับกระบวนการที่สําคัญของภาควิชาได้แก่ กระบวนการจัดทำหลักสูตร กระบวนการ วิเคราะห์ และการวางแผนอัตรากำลังใหเ้หมาะสมกับหลักสูตรที่คณาจารย์ นักวิจัยและเจ้าหน้าที่ กระบวนการวิเคราะห์ทรัพยากรสนับสนุนการเรียนการสอน กระบวนการประเมินนักศึกษาแรกเข้า กระบวนการจัดการเรียนการสอน กระบวนการประเมินผลการเรียนรู้ของนักศึกษากระบวนการ รับฟังความเห็นจากผู้มีส่วนได้ส่วนเสียและกระบวนการติดตามบัณฑิต`,
  overall: `         มหาวิทยาลยัเทคโนโลยีพระจอมเกลา้ธนบุรีก่อตั้งขึ้นในปีพ.ศ. 2503 ในชื่อเดิมคือ
    วิทยาลัยเทคนิคธนบุรีสังกัดกรมอาชีวศึกษา พร้อมกับวิทยาลัยอีก 2 แห่งคือ วิทยาลยัเทคนิค
    พระนครเหนือ และวิทยาลัยโทรคมนาคม หลังจากนั้น ในปีพ.ศ. 2514 วิทยาเขตทั้งสามแห่ง
    ได้เปลี่ยนเป็น สถาบันเทคโนโลยีพระจอมเกล้าวิทยาเขตธนบุรี สถาบันเทคโนโลยีพระจอมเกล้า
    วิทยาเขตพระนครเหนือ และสถาบันเทคโนโลยีพระจอมเกล้าวิทยาเขตเจ้าคุณทหารลาดกระบัง สังกัดทบวงมหาวิทยาลัย ในปีพ.ศ. 2529 ที่ทั้งสามสถาบันได้แยกเป็นอิสระจากกันในชื่อ สถาบันเทคโนโลยพีระจอมเกล้าธนบุรี
    สถาบันเทคโนโลยีพระจอมเกล้าพระนครเหนือ และ
    สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
             ในปีพ.ศ. 2541 สถาบันฯ ได้เปลี่ยนเป็นมหาวิทยาลัยในกำกับของรัฐบาล สังกัดสํานักงาน
    คณะกรรมการการอุดมศึกษากระทรวงศึกษาธิการ ในปัจจุบัน มีคณะต่างๆ 10 คณะ คือ คณะวิศวกรรมศาสตร์ คณะวิทยาศาสตร์ คณะครุศาสตร์อุตสากรรมและเทคโนโลยีคณะเทคโนโลยี สารสนเทศ คณะสถาปัตยกรรมศาสตร์และการออกแบบ คณะพลังงานสิ่งแวดล้อมและวัสดุ คณะทรัพยากรชีวภาพและเทคโนโลยีบัณฑิตวิทยาลยัการจดัการและนวตักรรม สถาบันวิทยาการ
    หุ่นยนต์ภาคสนาม และคณะศิลปะศาสตร์
             วิสัยทัศน์ของมหาวิทยาลัย
    มุ่งมั่น          เป็นมหาวิทยาลัยที่ใฝ่เรียนรู้
    มุ่งสู่            ความเป็นเลิศในเทคโนโลยีและการวิจัย
    มุ่งธำรง        ปณิธานในการสร้างบัณฑิตที่เก่งและดี`,
  cpe: `         ภาควิชาวิศวกรรมคอมพิวเตอร ์คณะวิศวกรรมศาสตร์ได้ดำเนินการขอจัดตั้งภาควิชา
    วิศวกรรมคอมพิวเตอร์ โดยแยกออกจากภาควิชาวิศวกรรมไฟฟ้า โดยผ่านมติที่ประชุมสภา
    สถาบันเทคโนโลยีพระจอมเกล้าธนบุรี(ในขณะนั้น) เมื่อวันที่ 19 มกราคม 2531 และได้มีการเสนอ
    ทบวงมหาวิทยาลัยเพื่อพิจารณา แต่เนื่องจากว่าโครงการดังกล่าวมิได้บรรจุไว้ในแผนพัฒนาการ
    ศึกษาระดับอุดมศึกษา ฉบับที่ 6 (พ.ศ. 2530-2534) และแผนปฏิบัติการประจําปี งบประมาณ 2531 ซึ่งทบวงไม่สามารถจะปรับเปลี่ยนแผน 6 ได้ ดังนั้นภาควิชาวิศวกรรมคอมพิวเตอร์จึงขอ
    ดําเนินการเปิดสอนก่อน โดยทบวงมหาวิทยาลัยให้ความเห็นชอบหลักสูตรวิศวกรรมคอมพิวเตอร์
    เมื่อวันที่2 มิถุนายน 2531 โดยมีที่ทำการชั่วคราวอยู่ที่ตึกไฟฟ้า 2 และ ย้ายไปอยู่ที่ทำการชั่วคราว
    อีกครั้งที่อาคารเรียนรวม 2 ห้อง CB2310 ในช่วงที่สถาบัน ฯ ทำการก่อสร้างอาคารเรียนรวม 3,4 และ 5 ในเวลาต่อมาไดม้ีการบรรจุโครงการจัดตั้งภาควิชาวิศวกรรมคอมพิวเตอร์ไว้ในแผนพัฒนา
    การศึกษาระดับอุดมศึกษา ฉบับที่ 7 (พ.ศ.2535-2539) และได้รับอนุมัติให้ดําเนินการจัดตั้งใหม่
    ในเมื่อวันที่ 11 กุมภาพันธ์
    2540 และประกาศในพระราชกฤษฎีกา เรื่องการจัดตั้งส่วนราชการ
    ในสถาบันเทคโนโลยพีระจอมเกล้าธนบุรีพ.ศ. 2540 ซึ่งประกาศในราชกิจจานุเบกษา เล่ม 114 ตอนพิเศษ 54 ลงวันที่ 30 มิถุนายน 2540 ปัจจุบัน มีที่ทำการถาวรตั้งอยู่ที่ อาคารวิศววัฒนะ
    (ชั้น 10,11)
             วิสัยทัศน์ของภาควิชาวิศวกรรมคอมพิวเตอร์
    เป็นภาควิชาวิศวกรรมคอมพิวเตอร์อันดับ 1 ของประเทศไทยและมีมาตรฐานการเรียนการสอน
    ที่เป็นสากล`,
};
