const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

router.post("/create-or-not/:tqf2id", authJwt.verifyToken, async (req, res) =>{
	try {
    const { tqf2id } = req.params;
    const gettqf5 = await pool.query("SELECT d.id FROM document d JOIN tqf5 t5 ON t5.id = d.documentdata_id JOIN tqf3 t3 ON t5.tqf3_id = t3.id WHERE t3.id = $1", [tqf2id]);
    if(gettqf5.rowCount > 0){
      const add = {AlreadyExist: true}
      Object.assign(gettqf5.rows[0], add)
      return res.json(gettqf5.rows[0]);
    }
    // const newtqf5 = {AlreadyExist: false};
    const temp = {
      remain_students: undefined,
      withdraw_students: undefined,
      student_grade: [{"grade":"A","student_amount":"0","percent":"0"},{"grade":"B+","student_amount":"0","percent":"0"},{"grade":"B","student_amount":"0","percent":"0"},{"grade":"C+","student_amount":"0","percent":"0"},{"grade":"C","student_amount":"0","percent":"0"},{"grade":"D+","student_amount":"0","percent":"0"},{"grade":"D","student_amount":"0","percent":"0"},{"grade":"F","student_amount":"0","percent":"0"}],
      error_score: "",
      error_timeeva: [{error: "",reason: ""}],
      error_howeva: [{error: "",reason: ""}],
      student_reconsider: [{reconsider: "",conclude: ""}],
      resourse_problems: [{problem: "",effect: ""}],
      organize_problems: [{problem: "",effect: ""}],
      studenteva_result: [{criticism: "",opinion: ""}],
      othereva_result: [{criticism: "",opinion: ""}],
      course_progress: [{plan: "",performance: "",}],
      other_progress: "",
      proposal_updateplan: [{proposal: "",due_date: "",responsible: ""}],
      suggestion_toleadear: "",
      documentstatus_code: "DRAFT",
    }
		const newtqf5 = await pool.query(
      "INSERT INTO tqf5 ( tqf3_id, remain_students, withdraw_students, student_grade, error_score, error_timeeva, error_howeva, student_reconsider, resourse_problems, organize_problems, studenteva_result, othereva_result, course_progress, other_progress, proposal_updateplan, suggestion_toleadear, createby, createdate, documentstatus_code ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 ) RETURNING *", 
      [ tqf2id, temp.remain_students, temp.withdraw_students, JSON.stringify(temp.student_grade), temp.error_score, JSON.stringify(temp.error_timeeva), JSON.stringify(temp.error_howeva), JSON.stringify(temp.student_reconsider), JSON.stringify(temp.resourse_problems), JSON.stringify(temp.organize_problems), JSON.stringify(temp.studenteva_result), JSON.stringify(temp.othereva_result), JSON.stringify(temp.course_progress), temp.other_progress, JSON.stringify(temp.proposal_updateplan), temp.suggestion_toleadear, req.user.id, new Date(), temp.documentstatus_code ] );
		
    const newdocument = await pool.query("INSERT INTO document ( name, createby, createdate, documenttype_code, documentstatus_code, documentdata_id, isactive ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *", 
      [ "New Document", req.user.id, new Date(), "TQF5", "DRAFT", newtqf5.rows[0].id, true ] );
    
    const add = {AlreadyExist: false}
    Object.assign(newtqf5.rows[0], add)

    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Create', 'tqf5/create', 'TQF5 [ID: '+newtqf5.rows[0].id+'] was created', req.user.id ] );

    res.json(newdocument.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

router.get("/getbydocid/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const document = await pool.query("SELECT * FROM document WHERE id = $1",
      [id] 
    );
    if (document.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }  
    // console.log("[tqf5.js] getbydocid:",document.rows[0]);

    
    const tqf5 = await pool.query("SELECT * FROM tqf5 WHERE id = $1", [document.rows[0].documentdata_id]);
    if (tqf5.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }  

    const gettqf3 = await pool.query("SELECT code, thainame, engname, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, documentstatus_code FROM tqf3 WHERE id = $1", 
      [tqf5.rows[0].tqf3_id]);
    if (gettqf3.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }  
    Object.assign(tqf5.rows[0], gettqf3.rows[0]);

    const Professor = await pool.query(
      "SELECT t3em.employee_id, e.thainame, e.engname, t3em.role "+
      "FROM tqf3_employee_match t3em "+
      "JOIN employee e ON e.id = t3em.employee_id "+
      "WHERE t3em.tqf3_id = $1 ",
      [tqf5.rows[0].tqf3_id]
    );
    
    
    
    const teachplanperformance = await pool.query("SELECT text as clo, howteach, criterion, pass, problem as problem_solving FROM tqf3clo WHERE tqf3_id = $1", [tqf5.rows[0].tqf3_id]);
    const realvsplan = await pool.query("SELECT week, title, hour, real_hour, reason_note FROM tqf3teachplan WHERE tqf3_id = $1 ORDER BY week ASC", [tqf5.rows[0].tqf3_id]);
    const notplan = await pool.query("SELECT week, title, why_not_plan, sol_not_plan FROM tqf3teachplan WHERE tqf3_id = $1 ORDER BY week ASC", [tqf5.rows[0].tqf3_id]);
    const add = {
      autosize: false,
      Professor: Professor.rows, 
      teachplanperformance: teachplanperformance.rows,
      realvsplan: realvsplan.rows,
      notplan: notplan.rows
    }
    Object.assign(tqf5.rows[0], add)
    const data = {
      successful: true,
      document: document.rows[0], 
      tqf5data: tqf5.rows[0]
    }

    return res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});


router.post("/clone/:id", authJwt.verifyToken, async (req, res) =>{
  try {
    const { id } = req.params;
    // console.log("[tqf3.js] clone -> id:",id);
    const gettqf5 = await pool.query("SELECT * FROM tqf5 WHERE id = $1", [id]);
    const newtqf5 = await pool.query(
      "INSERT INTO tqf5 ( tqf3_id, remain_students, withdraw_students, student_grade, error_score, error_timeeva, error_howeva, student_reconsider, resourse_problems, organize_problems, studenteva_result, othereva_result, course_progress, other_progress, proposal_updateplan, suggestion_toleadear, createby, createdate ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18 ) RETURNING *", 
      [ gettqf5.rows[0].tqf3_id, gettqf5.rows[0].remain_students, gettqf5.rows[0].withdraw_students, JSON.stringify(gettqf5.rows[0].student_grade), gettqf5.rows[0].error_score, JSON.stringify(gettqf5.rows[0].error_timeeva), JSON.stringify(gettqf5.rows[0].error_howeva), JSON.stringify(gettqf5.rows[0].student_reconsider), JSON.stringify(gettqf5.rows[0].resourse_problems), JSON.stringify(gettqf5.rows[0].organize_problems), JSON.stringify(gettqf5.rows[0].studenteva_result), JSON.stringify(gettqf5.rows[0].othereva_result), JSON.stringify(gettqf5.rows[0].course_progress), gettqf5.rows[0].other_progress, JSON.stringify(gettqf5.rows[0].proposal_updateplan), gettqf5.rows[0].suggestion_toleadear, req.user.id, new Date() ] );

    const getdocument = await pool.query("SELECT * FROM document d JOIN tqf5 t5 on d.documentdata_id = t5.id WHERE t5.id = $1 AND d.documenttype_code = 'TQF5'", [id] );
    const newdocument = await pool.query("INSERT INTO document ( name, createby, createdate, documenttype_code, documentstatus_code, documentdata_id, isactive ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *", 
    [ "Clone "+getdocument.rows[0].name, req.user.id, new Date(), getdocument.rows[0].documenttype_code, getdocument.rows[0].documentstatus_code, newtqf5.rows[0].id, getdocument.rows[0].isactive ] );


    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Clone', 'tqf5/clone', 'TQF5 [ID: '+id+' -> '+newtqf5.rows[0].id+'] was cloned', req.user.id ] );

    // console.log("[tqf3.js] clone -> new id:",newtqf3.rows[0].id);
    res.json(newdocument.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});


//update ------------------------------------------
router.put("/update/:id", authJwt.verifyToken, async (req, res) =>{
	try {
		const { id } = req.params;
		const { remain_students, withdraw_students, student_grade, error_score, error_timeeva, error_howeva, student_reconsider, resourse_problems, organize_problems, studenteva_result, othereva_result, course_progress, other_progress, proposal_updateplan, suggestion_toleadear } = req.body;
		const updatetqf5 = await pool.query(
      "UPDATE tqf5 SET remain_students = $2, withdraw_students = $3, student_grade = $4, error_score = $5, error_timeeva = $6, error_howeva = $7, student_reconsider = $8, resourse_problems = $9, organize_problems = $10, studenteva_result = $11, othereva_result = $12, course_progress = $13, other_progress = $14, proposal_updateplan = $15, suggestion_toleadear = $16 WHERE id = $1 ", 
      [ id, remain_students, withdraw_students, JSON.stringify(student_grade), error_score, JSON.stringify(error_timeeva), JSON.stringify(error_howeva), JSON.stringify(student_reconsider), JSON.stringify(resourse_problems), JSON.stringify(organize_problems), JSON.stringify(studenteva_result), JSON.stringify(othereva_result), JSON.stringify(course_progress), other_progress, JSON.stringify(proposal_updateplan), suggestion_toleadear ] );
		// console.log("[tqf5.js] update:",req.body);

    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Update', 'tqf5/update', 'TQF5 [ID: '+id+'] was updated', req.user.id ] );

    res.json("tqf5 was updated!"); 
	} catch (err) {


		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});


//deletebyid ------------------------------------------
router.delete("/delete/:id", authJwt.verifyToken, async (req, res) =>{
	try {
		const { id } = req.params;
		const gettqf5 = await pool.query("SELECT * FROM tqf5 WHERE id = $1", [id] );
		if (gettqf5.rows.length === 0) {return res.status(404).json("Not Found!");} 
		const deletetqf5 = await pool.query("DELETE FROM tqf5 WHERE id = $1", [id] );

    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Delete', 'tqf5/delete', 'TQF5 [ID: '+id+'] was deleted!', req.user.id ] );

		res.json("tqf5 was deleted!"); 
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

module.exports = router;













