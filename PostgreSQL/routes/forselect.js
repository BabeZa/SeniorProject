const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/faculty/:lang", async (req, res) => {
    try {
      const { lang } = req.params;
      var faculty
      if(lang === "th"){
        faculty = await pool.query('SELECT id as value, thainame as label, isdisabled as "isDisabled" FROM faculty');
      }else{
        faculty = await pool.query('SELECT id as value, engname as label, isdisabled as "isDisabled" FROM faculty');
      }
      
      res.json(faculty.rows);
    } catch (err) {
      console.error(err.message);
    }
});

router.get("/department/:fid/:lang", async (req, res) => {
  try {
    const { lang, fid} = req.params;
    var faculty
    if(lang === "th"){
      faculty = await pool.query('SELECT id as value, thainame as label, isdisabled as "isDisabled" FROM department WHERE faculty_id = $1 OR id = 1', [fid]);
    }else{
      faculty = await pool.query('SELECT id as value, engname as label, isdisabled as "isDisabled" FROM department WHERE faculty_id = $1 OR id = 1', [fid]);
    }
    
    res.json(faculty.rows);
  } catch (err) {
    console.error(err.message);
  }
});
  
router.get("/documentstatus/:search/:lang", async (req, res) => {
  try {
    const {search, lang } = req.params;
    var status
    if(lang === "th"){
      status = await pool.query('SELECT code as value, thainame as label, isdisabled as "isDisabled" FROM documentstatus WHERE note like \'%'+search+'%\' AND note NOT LIKE \'%INACTIVE%\'');
    }else{
      status = await pool.query(' SELECT code as value, engname as label, isdisabled as "isDisabled" FROM documentstatus WHERE note like \'%'+search+'%\' AND note NOT LIKE \'%INACTIVE%\'');
    }
    
    res.json(status.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/termyear/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    var obj
    if(lang === "th"){
      obj = await pool.query('SELECT code as value, thainame as label, isdisabled as "isDisabled" FROM termyear ');
    }else{
      obj = await pool.query(' SELECT code as value, engname as label, isdisabled as "isDisabled" FROM termyear ');
    }
    
    res.json(obj.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/program/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    var get
    if(lang === "th"){
      get = await pool.query("SELECT t2.id as value, CONCAT(t2.mini_thai,' ',t2.program_year_detail_th ,'พ.ศ.',t2.program_year,' ',t2.program_type_th) as label FROM tqf2 t2 WHERE t2.status_code NOT LIKE 'HIDE'");
      get.rows.push({value: '', label: 'หลักสูตรทั้งหมด'})
    }else{
      get = await pool.query("SELECT t2.id as value, CONCAT(t2.mini_eng,' ',t2.program_year_detail_en ,'พ.ศ.',t2.program_year,' ',t2.program_type_en) as label FROM tqf2 t2 WHERE t2.status_code NOT LIKE 'HIDE'");
      get.rows.push({value: '', label: 'All Program'})
    }
    res.json(get.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/pre1/:search/:lang", async (req, res) => {
  try {
    const { search, lang } = req.params; 
    var obj
    var add
    obj = await pool.query('SELECT DISTINCT CONCAT(code,\' \', engname) as value, CONCAT(code,\' \', engname) as label FROM tqf3 WHERE documentstatus_code NOT LIKE \'HIDE\' ');
    if(lang === "th"){
      obj.rows.push({value: '', label: 'ไม่ระบุ'})
    }else{
      obj.rows.push({value: '', label: 'Not specified'})
    }
    // Object.assign(obj.rows[0], add)
    
    res.json(obj.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/professordoc/:search/:lang", async (req, res) => {
  try {
    const { search, lang } = req.params;
    var obj
    const tobj = await pool.query('SELECT employee_id, role FROM tqf3_employee_match WHERE tqf3_id = $1 ',[search]);
    if(lang === "th"){
      obj = await pool.query('SELECT e.id as value, e.thainame as label, e.thainame, e.id as employee_id, e.engname FROM employee e WHERE type = \'professor\' ');
    }else{
      obj = await pool.query(' SELECT e.id as value, e.engname as label, e.thainame, e.id as employee_id, e.engname FROM employee e WHERE type = \'professor\' ');
    }

    for (var j = 0; j < obj.rows.length; j++) {
      Object.assign(obj.rows[j], {role: null})
    }

    // console.log("[forselect.js] professordoc:",obj.rows);
    for (var i = 0; i < tobj.rows.length; i++) {
      // console.log("[forselect.js] professordoc loop1: ",tobj.rows[i].employee_id);
      for (var j = 0; j < obj.rows.length; j++) {
        if(tobj.rows[i].employee_id === obj.rows[j].value){
          // console.log("[forselect.js] professordoc: ",tobj.rows[i].employee_id);
          Object.assign(obj.rows[j], {role:tobj.rows[i].role})
          if(tobj.rows[i].role === "main"){
            Object.assign(obj.rows[j], {isFixed: true})
          }
        }
      }
    }
    // console.log("[forselect.js] professordoc:",obj.rows);

    
    res.json(obj.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/tqf2/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    var get
    if(lang === "th"){
      get = await pool.query("SELECT t2.id as value, CONCAT(t2.mini_thai,' ',t2.program_year_detail_th ,'พ.ศ.',t2.program_year,' ',t2.program_type_th) as label FROM tqf2 t2 WHERE t2.status_code NOT LIKE 'HIDE'");
      get.rows.push({value: '', label: 'ไม่ระบุ'})
    }else{
      get = await pool.query("SELECT t2.id as value, CONCAT(t2.mini_eng,' ',t2.program_year_detail_en ,'พ.ศ.',t2.program_year,' ',t2.program_type_en) as label FROM tqf2 t2 WHERE t2.status_code NOT LIKE 'HIDE'");
      get.rows.push({value: '', label: 'Not specified'})
    }
    res.json(get.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/tqf2-course/:tqf2id/:lang", async (req, res) => {
try {
  const { lang, tqf2id} = req.params;
  var get
    if(lang === "th"){
      get = await pool.query('SELECT t2c.id as value, CONCAT(t2c.course_code,\' \', t2c.course_thainame) as label FROM tqf2course t2c WHERE tqf2_id = $1',[tqf2id]);
      get.rows.push({value: '', label: 'ไม่ระบุ'})
    }else{
      get = await pool.query('SELECT t2c.id as value, CONCAT(t2c.course_code,\' \', t2c.course_engname) as label FROM tqf2course t2c WHERE tqf2_id = $1',[tqf2id]);
      get.rows.push({value: '', label: 'Not specified'})
    }
    res.json(get.rows);
} catch (err) {
  console.error(err.message);
}
});


module.exports = router;