const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");
//! เป็นไฟล์ตัวอย่างเพราะตาราง subject ไม่ได้ใช้แล้ว
//..create subject โดย Insert ตามข้อมูลที่ส่งมาใน req.body
router.post("/create", async (req, res) =>{                   //. สร้างฟังก์ชั่นรับส่งข้อมูล
  try {
      //.↓↓↓ ดึงค่าจากใน req.body มาใส่ตัวแปลแต่ละตัวตามชื่อ
      const { code, thainame, engname, decription, credit } = req.body; 
      const newsubject = await pool.query(                    //. เชื่อมต่อกับฐานข้อมูล
        "INSERT INTO subject (code, thainame, engname, decription, credit ) "+
        "VALUES ($1, $2, $3, $4, $5) RETURNING *",            //. SQL ที่ต้องการส่งไปยัง DB
        [code, thainame, engname, decription, credit ]  );    //. ตัวแปลที่เอาไว้ใสค่าใน $...
      res.json(newsubject.rows[0]);                           //. ส่งผลลัพธ์กลับไป
  } catch (error) {                                           //. ถ้า error ให้โชว์ error
      console.error(err.message);
  }
});

//..get all subject โดยเอาข้อมูลทั้งหมดใน subject
router.get("/", async (req, res) => {
  try {
    const allsubject = await pool.query("SELECT * FROM subject"); //. ดึงข้อมูลจากฐานข้อมูล
    res.json(allsubject.rows);                                //. ส่งผลลัพธ์กลับไป
  } catch (err) {                                             //. ถ้า error ให้โชว์ error
    console.error(err.message);
  }
});

//..get a subject โดยเอาข้อมูลตาม id ใน subject
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;                                //. ดึงค่า params ที่อยู่ใน url
    //.↓↓↓ ส่งคำสั่งไปยังฐานข้อมูล
    const subject = await pool.query("SELECT * FROM subject WHERE id = $1", [id] );
    res.json(subject.rows[0]);                                //. ส่งผลลัพธ์กลับไป
  } catch (err) {                                             //. ถ้า error ให้โชว์ error
    console.error(err.message);
  }
});

//..update a subject โดย Update ตามข้อมูลที่ส่งมาใน req.body และ id ใน req.params
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code, thainame, engname, decription, credit } = req.body;
    const updatesubject = await pool.query(                   //. ส่งคำสั่งไปยังฐานข้อมูล
      "UPDATE subject SET code = $2, thainame = $3, engname = $4, "+
      "decription = $5, credit = $6 WHERE id = $1 ",
      [code, thainame, engname, decription, credit] );
    res.json("subject was updated!");                         //. ส่งผลลัพธ์กลับไป
  } catch (err) {                                             //. ถ้า error ให้โชว์ error
    console.error(err.message);
  }
});

//..delete a subject โดยลบข้อมูลตาม id ใน subject
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;                                //. ดึงค่า params ที่อยู่ใน url
    const deletesubject = await pool.query(                   //. ส่งคำสั่งไปยังฐานข้อมูล
      "DELETE FROM subject WHERE id = $1", [id] );
    res.json("subject was deleted!");                         //. ส่งผลลัพธ์กลับไป
  } catch (err) {                                             //. ถ้า error ให้โชว์ error
    console.log(err.message);
  }
});

// -----------------------------------------------------------------------------------------
router.post("/createssub", authJwt.verifyToken, async (req, res) =>{
  try {
      const { no_students, createby, document_id, documentdata_id, time } = req.body;
      const newsubject = await pool.query(
          "INSERT INTO shortsubject ( no_students, createby, document_id, documentdata_id, time ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [ no_students, req.user.id, document_id, documentdata_id, time  ]
      );
      res.json(newsubject.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});

router.get("/ssuball", async (req, res) => {
  try {
    const allsubject = await pool.query("SELECT * FROM shortsubject");
    res.json(allsubject.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/ssub-professor-filter/:pid", async (req, res) => {
  try {
    const allsubject = await pool.query("SELECT * FROM shortsubject");
    res.json(allsubject.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/ssubget/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await pool.query("SELECT * FROM shortsubject WHERE id = $1", [
      id
    ]);

    res.json(subject.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;













