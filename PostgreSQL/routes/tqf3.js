const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt.verifyToken, async (req, res) =>{
  try {
      console.log("[tqf3.js] create:",req.body);
      if(req.body.tqf2program_id === ''){
        req.body.tqf2program_id = null
      }
      if(req.body.tqf2course_id === ''){
        req.body.tqf2course_id = null
      }
      const { code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, createdate, updatedate, createby, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion, outcome } = req.body;
      
      const newo = await pool.query(
        "INSERT INTO tqf3 ( code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, createdate, updatedate, createby, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion, outcome ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51 ) RETURNING *",
        [code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, createdate, updatedate, req.user.id, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion, outcome]
      );
      console.log("[tqf3.js] create newo:",newo.rows[0].id);
 
      // const new1 = await pool.query(
      //   "INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 )",
      //   [ newo.rows[0].id, 1, null, null, null, null ]);
  
      // const new2 = await pool.query(
      //   "INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek ) VALUES ( $1, $2, $3, $4, $5, $6 )",
      //   [ newo.rows[0].id, 1, null, null, null, null ]);

      // const new3 = await pool.query(
      //   "INSERT INTO tqf3outcome ( tqf3_id, no, text ) VALUES ( $1, $2, $3 )",
      //   [ newo.rows[0].id, 1, null ]);

      if(req.body.Evaluationplan.length > 0){
        for (var i = 0; i < req.body.Evaluationplan.length; i++) {
          pool.query('INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *', [newo.rows[0].id, req.body.Evaluationplan[i].evaactivity, req.body.Evaluationplan[i].evaoutcome, req.body.Evaluationplan[i].howeva, req.body.Evaluationplan[i].evaweek, req.body.Evaluationplan[i].evaratio ], 
            (error, results) => {
              if (error) {
                console.error(error.message);
              } else {
                // console.log("Rows " + JSON.stringify(results.rows));
              }
            }
          );
        }
      }
  
      if(req.body.Teachplan.length > 0){
        for (var i = 0; i < req.body.Teachplan.length; i++) {
          pool.query('INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek, activity_note, real_hour, reason_note, why_not_plan, sol_not_plan ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *', [newo.rows[0].id, req.body.Teachplan[i].week, req.body.Teachplan[i].title,  req.body.Teachplan[i].hour,  req.body.Teachplan[i].activity, req.body.Teachplan[i].professorweek, req.body.Teachplan[i].activity_note, req.body.Teachplan[i].real_hour, req.body.Teachplan[i].reason_note, req.body.Teachplan[i].why_not_plan, req.body.Teachplan[i].sol_not_plan ], 
            (error, results) => {
              if (error) {
                console.error(error.message);
              } else {
                // console.log("Rows " + JSON.stringify(results.rows));
              }
            }
          );
        }
      }
  
      // if(req.body.outcome.length > 0){
      //   // console.log("[tqf3.js] outcome.length:", req.body.outcome.length);
      //   for (var i = 0; i < req.body.outcome.length; i++) {
      //     pool.query('INSERT INTO tqf3outcome ( tqf3_id, no, text ) VALUES ( $1, $2, $3 ) RETURNING *', [newo.rows[0].id, i, req.body.outcome[i].text ], 
      //       (error, results) => {
      //         if (error) {
      //           console.error(error.message);
      //         } else {
      //           // console.log("Rows " + JSON.stringify(results.rows));
      //         }
      //       }
      //     );
      //   }
      // }

      if(req.body.Professor.length > 0){
        // console.log("[tqf3.js] outcome.length:", req.body.outcome.length);
        for (var i = 0; i < req.body.Professor.length; i++) {
          pool.query('INSERT INTO tqf3_employee_match ( tqf3_id, employee_id, role ) VALUES ( $1, $2, $3 ) RETURNING *', [newo.rows[0].id, req.body.Professor[i].employee_id, "main" ], 
            (error, results) => {
              if (error) {
                console.error(error.message);
              } else {
                // console.log("Rows " + JSON.stringify(results.rows));
              }
            }
          );
        }
      }


      // if(req.body.CLO.length > 0){
      //   for (var i = 0; i < req.body.CLO.length; i++) {
      //     pool.query('INSERT INTO tqf3clo ( tqf3_id, tqf2course_clo_id, index, howteach, howeva, problem ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *', 
      //       [newo.rows[0].id, req.body.CLO[i].tqf2course_clo_id, req.body.CLO[i].index, req.body.CLO[i].howteach, req.body.CLO[i].howeva, req.body.CLO[i].problem ], 
      //       (error, results) => {
      //         if (error) {
      //           console.error(error.message);
      //         } else {
      //           // console.log("Rows " + JSON.stringify(results.rows));
      //         }
      //       }
      //     );
      //   }
      // }

      const newback_log = await pool.query(
        "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
        [ 'Create', 'tqf3/create', 'TQF3 [ID: '+newo.rows[0].id+'] was created', req.user.id ] );
  
      res.json(newo.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});


router.post("/clone/:id", authJwt.verifyToken, async (req, res) =>{
  try {
    const { id } = req.params;
    console.log("[tqf3.js] clone -> id:",id);
    const gettqf3 = await pool.query("SELECT * FROM tqf3 WHERE id = $1", [id]);
    const newtqf3 = await pool.query(
      "INSERT INTO tqf3 ( code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, createdate, updatedate, createby, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion, outcome, current_week ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52 ) RETURNING *",
      [gettqf3.rows[0].code, gettqf3.rows[0].thainame, gettqf3.rows[0].engname, gettqf3.rows[0].tqf2program_id, gettqf3.rows[0].tqf2course_id, gettqf3.rows[0].credit, gettqf3.rows[0].termyear_code, gettqf3.rows[0].pre_requisites_st, gettqf3.rows[0].pre_requisites_nd, gettqf3.rows[0].co_requisites, gettqf3.rows[0].place, gettqf3.rows[0].study_time, gettqf3.rows[0].no_students, 'now()', new Date(), req.user.id, gettqf3.rows[0].documentstatus_code, gettqf3.rows[0].objective, gettqf3.rows[0].description, gettqf3.rows[0].describe, gettqf3.rows[0].additionteach, gettqf3.rows[0].activelearn, gettqf3.rows[0].selflearn, gettqf3.rows[0].consulthour, gettqf3.rows[0].moraldev, gettqf3.rows[0].moralteach, gettqf3.rows[0].moralevaluation, gettqf3.rows[0].knowledgeget, gettqf3.rows[0].knowledgeteach, gettqf3.rows[0].knowledgetvaluation, gettqf3.rows[0].intellecdev, gettqf3.rows[0].intellecteach, gettqf3.rows[0].intellectevaluation, gettqf3.rows[0].relation, gettqf3.rows[0].reationteach, gettqf3.rows[0].relationevaluation, gettqf3.rows[0].analydev, gettqf3.rows[0].analyteach, gettqf3.rows[0].analyevaluation, gettqf3.rows[0].rangeoutcome, gettqf3.rows[0].rangeteach, gettqf3.rows[0].rangeevaluation, gettqf3.rows[0].book, gettqf3.rows[0].doc, gettqf3.rows[0].addodc, gettqf3.rows[0].effect, gettqf3.rows[0].evaluation, gettqf3.rows[0].improve, gettqf3.rows[0].exam, gettqf3.rows[0].opeartion, gettqf3.rows[0].outcome, 1]
    );

    const gettqf3_employee_match = await pool.query("SELECT * FROM tqf3_employee_match WHERE tqf3_id = $1", [id] );
    // console.log("[tqf3.js] clone -> gettqf3_employee_match:\n",gettqf3_employee_match.rows);
    if(gettqf3_employee_match.rowCount > 0){
      for(var i = 0; i < gettqf3_employee_match.rowCount; i++){
        // console.log("[tqf3.js] clone -> gettqf3_employee_match for:",gettqf3_employee_match.rows[i]);
        const newtqf3_employee_match = await pool.query(
          "INSERT INTO tqf3_employee_match ( tqf3_id, employee_id, role ) VALUES ( $1, $2, $3 ) RETURNING *", 
          [ newtqf3.rows[0].id, gettqf3_employee_match.rows[i].employee_id, gettqf3_employee_match.rows[i].role ] );
      }
    }

    const gettqf3clo = await pool.query("SELECT * FROM tqf3clo WHERE tqf3_id = $1", [id] );
    if(gettqf3clo.rowCount > 0){
      for(var i = 0; i < gettqf3clo.rowCount; i++){
        const newtqf3clo = await pool.query(
          "INSERT INTO tqf3clo ( tqf3_id, tqf2course_clo_id, index, howteach, howeva, problem, criterion, pass, text ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *", 
          [ newtqf3.rows[0].id, gettqf3clo.rows[i].tqf2course_clo_id, gettqf3clo.rows[i].index, gettqf3clo.rows[i].howteach, gettqf3clo.rows[i].howeva, gettqf3clo.rows[i].problem, gettqf3clo.rows[i].criterion, gettqf3clo.rows[i].pass, gettqf3clo.rows[i].text ] );
      }
    }

    const gettqf3evaluationplan = await pool.query("SELECT * FROM tqf3evaluationplan WHERE tqf3_id = $1", [id] );
    if(gettqf3evaluationplan.rowCount > 0){
      for(var i = 0; i < gettqf3evaluationplan.rowCount; i++){
        const newtqf3evaluationplan = await pool.query(
          "INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *", 
          [ newtqf3.rows[0].id, gettqf3evaluationplan.rows[i].evaactivity, gettqf3evaluationplan.rows[i].evaoutcome, gettqf3evaluationplan.rows[i].howeva, gettqf3evaluationplan.rows[i].evaweek, gettqf3evaluationplan.rows[i].evaratio ] );
      }
    }

    const gettqf3outcome = await pool.query("SELECT * FROM tqf3outcome WHERE tqf3_id = $1", [id] );
    if(gettqf3outcome.rowCount > 0){
      for(var i = 0; i < gettqf3outcome.rowCount; i++){
        const newtqf3outcome = await pool.query(
          "INSERT INTO tqf3outcome ( tqf3_id, no, text ) VALUES ( $1, $2, $3 ) RETURNING *", 
          [ newtqf3.rows[0].id, gettqf3outcome.rows[i].no, gettqf3outcome.rows[i].text ] );
      }
    }

    const gettqf3teachplan = await pool.query("SELECT * FROM tqf3teachplan WHERE tqf3_id = $1", [id] );
    if(gettqf3teachplan.rowCount > 0){
      for(var i = 0; i < gettqf3teachplan.rowCount; i++){
        const newtqf3teachplan = await pool.query(
          "INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek, activity_note, real_hour, reason_note, why_not_plan, sol_not_plan ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *", 
          [ newtqf3.rows[0].id, gettqf3teachplan.rows[i].week, gettqf3teachplan.rows[i].title, gettqf3teachplan.rows[i].hour, gettqf3teachplan.rows[i].activity, gettqf3teachplan.rows[i].professorweek, gettqf3teachplan.rows[i].activity_note, gettqf3teachplan.rows[i].real_hour, gettqf3teachplan.rows[i].reason_note, gettqf3teachplan.rows[i].why_not_plan, gettqf3teachplan.rows[i].sol_not_plan ] );
      }
    }

    const getdocument = await pool.query("SELECT * FROM document d JOIN tqf3 t3 on d.documentdata_id = t3.id WHERE t3.id = $1 AND d.documenttype_code = 'TQF3'", [id] );
    const newdocument = await pool.query("INSERT INTO document ( name, createby, createdate, documenttype_code, documentstatus_code, documentdata_id, isactive ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *", 
    [ "Clone "+getdocument.rows[0].name, req.user.id, new Date(), getdocument.rows[0].documenttype_code, getdocument.rows[0].documentstatus_code, newtqf3.rows[0].id, getdocument.rows[0].isactive ] );


    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Clone', 'tqf3/clone', 'TQF3 [ID: '+id+' -> '+newtqf3.rows[0].id+'] was cloned', req.user.id ] );

    // console.log("[tqf3.js] clone -> new id:",newtqf3.rows[0].id);
    res.json(newdocument.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM tqf3");
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query("SELECT * FROM tqf3 WHERE id = $1", [id]);
    if (get.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }  

    // const gett3o = await pool.query("SELECT id, tqf3_id, no, text FROM tqf3outcome WHERE tqf3_id = $1 ORDER BY no ASC ", [id]);
    // // console.log("[tqf3.js] t3o:",gett3o);
    // const add = {outcome: gett3o.rows}
    // Object.assign(get.rows[0], add)

    const gett3e = await pool.query("SELECT id, tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio FROM tqf3evaluationplan WHERE tqf3_id = $1 ORDER BY evaactivity ASC", [id]);
    // console.log("[tqf3.js] t3e:",gett3e);
    const add2 = {Evaluationplan: gett3e.rows}
    Object.assign(get.rows[0], add2)

    const gett3t = await pool.query("SELECT id, tqf3_id, week, title, hour, activity, professorweek, activity_note, real_hour, reason_note, why_not_plan, sol_not_plan FROM tqf3teachplan WHERE tqf3_id = $1 ORDER BY week ASC", [id]);
    // console.log("[tqf3.js] t3t:",gett3t);
    const add3 = {Teachplan: gett3t.rows}
    Object.assign(get.rows[0], add3)

    const gett3p = await pool.query("SELECT employee_id, role, e.engname, e.thainame FROM tqf3_employee_match t3em JOIN employee e ON e.id = t3em.employee_id WHERE tqf3_id = $1", [id]);
    // console.log("[tqf3.js] t3t:",gett3t);
    const add5 = {Professor: gett3p.rows}
    Object.assign(get.rows[0], add5)

    const clo = await pool.query("SELECT t2.id as tqf2course_clo_id, t2.value, t2.index FROM tqf2course_clo t2 JOIN tqf3 t3 ON t3.tqf2course_id = t2.tqf2course_id WHERE t3.id = $1  ORDER BY t2.index ASC", [id]);
    const gett3c = await pool.query("SELECT id, tqf2course_clo_id, index, howteach, howeva, problem, criterion, pass, text FROM tqf3clo WHERE tqf3_id = $1 ORDER BY index ASC", [id]);
    // console.log("[tqf3.js] clo:",clo.rows);
    for(var i = 0; i < clo.rowCount; i++){
      // console.log("[tqf3.js] clo find:",gett3c.rows.find(obj => obj.tqf2course_clo_id === clo.rows[i].tqf2course_clo_id));
      if(gett3c.rows.find(obj => obj.tqf2course_clo_id === clo.rows[i].tqf2course_clo_id)){
        const temp = gett3c.rows.find(obj => obj.tqf2course_clo_id === clo.rows[i].tqf2course_clo_id)
        // temp.text = clo.rows[i].value
        temp.index = i
        Object.assign(clo.rows[i], temp)
        // console.log("[tqf3.js] clo find temp:", temp);
      }else{
        const addnewclo = {id:"",tqf2course_clo_id: clo.rows[i].tqf2course_clo_id, index: i, howteach: "", howeva: "",problem: "", criterion: null, pass: null, text:""}
        addnewclo.text = clo.rows[i].value
        Object.assign(clo.rows[i], addnewclo)
      }
    }
    var j = 0;
    for(var i = 0; i < gett3c.rowCount; i++){
      // console.log("[tqf3.js] clo find:",gett3c.rows[i]);
      if(gett3c.rows[i].tqf2course_clo_id === '' || gett3c.rows[i].tqf2course_clo_id === null){
        const addnewclo = { id:gett3c.rows[i].id, tqf2course_clo_id: "", index: clo.rowCount+j, howteach: gett3c.rows[i].howteach, howeva: gett3c.rows[i].howeva, problem: gett3c.rows[i].problem, criterion: gett3c.rows[i].criterion, pass: gett3c.rows[i].pass, text: gett3c.rows[i].text}
        clo.rows.push(addnewclo)
        // console.log("[tqf3.js] clo find: true:", gett3c.rows[i]);
        j++;
      }
    }




    const add6 = {CLO: clo.rows}
    Object.assign(get.rows[0], add6)

    const adds = {
      successful: true,
      outcome_delete:[],
      Teachplan_delete:[],
      Evaluationplan_delete:[],
      CLO_delete:[],
      tqf2program_label:"",
      tqf2course_label:"",
      UpdateDate: null
    }
    Object.assign(get.rows[0], adds)

    res.json(get.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update/:id", authJwt.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("[tqf3.js] update req.body:",req.body);
    const { code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, UpdateDate, createby, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion, outcome } = req.body;
    const update = await pool.query(
      "UPDATE tqf3 SET code = $2, thainame = $3, engname = $4, tqf2program_id = $5, tqf2course_id = $6, credit = $7, termyear_code = $8, pre_requisites_st = $9, pre_requisites_nd = $10, co_requisites = $11, place = $12, study_time = $13, no_students = $14, outcome = $15, updatedate = $16, createby = $17, documentstatus_code = $18, objective = $19, description = $20, describe = $21, additionteach = $22, activelearn = $23, selflearn = $24, consulthour = $25, moraldev = $26, moralteach = $27, moralevaluation = $28, knowledgeget = $29, knowledgeteach = $30, knowledgetvaluation = $31, intellecdev = $32, intellecteach = $33, intellectevaluation = $34, relation = $35, reationteach = $36, relationevaluation = $37, analydev = $38, analyteach = $39, analyevaluation = $40, rangeoutcome = $41, rangeteach = $42, rangeevaluation = $43, book = $44, doc = $45, addodc = $46, effect = $47, evaluation = $48, improve = $49, exam = $50, opeartion = $51 WHERE id = $1",
      [id, code, thainame, engname, tqf2program_id, tqf2course_id, credit, termyear_code, pre_requisites_st, pre_requisites_nd, co_requisites, place, study_time, no_students, outcome, UpdateDate, createby, documentstatus_code, objective, description, describe, additionteach, activelearn, selflearn, consulthour, moraldev, moralteach, moralevaluation, knowledgeget, knowledgeteach, knowledgetvaluation, intellecdev, intellecteach, intellectevaluation, relation, reationteach, relationevaluation, analydev, analyteach, analyevaluation, rangeoutcome, rangeteach, rangeevaluation, book, doc, addodc, effect, evaluation, improve, exam, opeartion]
    );

    //.. ----------------------------------------------------------------------------
    // if(req.body.outcome_delete.length > 0){
    //   for (var i = 0; i < req.body.outcome_delete.length; i++) {
    //     // console.log("[tqf3.js] update delete outcome: ",req.body.outcome_delete[i].outcome_id);
    //     pool.query('DELETE FROM tqf3outcome WHERE id = $1 ',[req.body.outcome_delete[i].outcome_id], 
    //       (error, results) => {if (error) {console.error(error.message);}});
    //   }
    // }

    if(req.body.Teachplan_delete.length > 0){
      for (var i = 0; i < req.body.Teachplan_delete.length; i++) {
        // console.log("[tqf3.js] update delete Teachplan_delete: ",req.body.Teachplan_delete[i].Teachplan_id);
        pool.query('DELETE FROM weeksnote_eva_clo WHERE tqf3teachplan_id = $1 ',[req.body.Teachplan_delete[i].Teachplan_id], 
          (error, results) => {if (error) {console.error(error.message);}});

        pool.query('DELETE FROM weeksnote_evaluations WHERE tqf3teachplan_id = $1 ',[req.body.Teachplan_delete[i].Teachplan_id], 
          (error, results) => {if (error) {console.error(error.message);}});

        pool.query('DELETE FROM tqf3teachplan WHERE id = $1 ',[req.body.Teachplan_delete[i].Teachplan_id], 
          (error, results) => {if (error) {console.error(error.message);}});
      }
    }

    if(req.body.Evaluationplan_delete.length > 0){
      for (var i = 0; i < req.body.Evaluationplan_delete.length; i++) {
        // console.log("[tqf3.js] update delete Evaluationplan_delete: ",req.body.Evaluationplan_delete[i].Evaluationsplan_id);
        pool.query('DELETE FROM weeksnote_evaluations WHERE tqf3evaluationplan_id = $1 ',[req.body.Evaluationplan_delete[i].Evaluationsplan_id], 
          (error, results) => {if (error) {console.error(error.message);}});

        pool.query('DELETE FROM tqf3evaluationplan WHERE id = $1 ',[req.body.Evaluationplan_delete[i].Evaluationsplan_id], 
          (error, results) => {if (error) {console.error(error.message);}});
      }
    }

    if(req.body.CLO_delete.length > 0){
        for (var i = 0; i < req.body.CLO_delete.length; i++) {
          // console.log("[tqf3.js] update delete outcome: ",req.body.outcome_delete[i].outcome_id);
          pool.query('DELETE FROM tqf3clo WHERE id = $1 ',[req.body.CLO_delete[i].CLO_id], 
            (error, results) => {if (error) {console.error(error.message);}});
        }
      }

    //.. ----------------------------------------------------------------------------




    if(req.body.Evaluationplan.length > 0){
      for (var i = 0; i < req.body.Evaluationplan.length; i++) {
        // console.log("[tqf3.js] updata Evaluationplan : ",req.body.Evaluationplan[i].id);
        if(req.body.Evaluationplan[i].id !== ''){ //. มี id แล้ว
          const update_Evaluationplane = await pool.query('UPDATE tqf3evaluationplan SET tqf3_id = $2, evaactivity = $3, evaoutcome = $4, howeva = $5, evaweek = $6, evaratio = $7 WHERE id = $1', 
            [req.body.Evaluationplan[i].id, req.body.Evaluationplan[i].tqf3_id, req.body.Evaluationplan[i].evaactivity, req.body.Evaluationplan[i].evaoutcome, req.body.Evaluationplan[i].howeva, req.body.Evaluationplan[i].evaweek, req.body.Evaluationplan[i].evaratio ]);
        }else{//. ยังไม่มี id สร้างใหม่
          const new_Evaluationplane = await pool.query('INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *', 
            [id, req.body.Evaluationplan[i].evaactivity, req.body.Evaluationplan[i].evaoutcome, req.body.Evaluationplan[i].howeva, req.body.Evaluationplan[i].evaweek, req.body.Evaluationplan[i].evaratio ]);
        }
      }
    }

    if(req.body.Teachplan.length > 0){
      for (var i = 0; i < req.body.Teachplan.length; i++) {
        // console.log("[tqf3.js] updata Teachplan : ",req.body.Teachplan[i].id);
        if(req.body.Teachplan[i].id !== ''){ //. มี id แล้ว
          const update_Teachplan = await pool.query('UPDATE tqf3teachplan SET tqf3_id = $2, week = $3, title = $4, hour = $5, activity = $6, professorweek = $7, activity_note = $8, real_hour = $9, reason_note = $10, why_not_plan = $11, sol_not_plan = $12 WHERE id = $1', 
            [req.body.Teachplan[i].id, req.body.Teachplan[i].tqf3_id, req.body.Teachplan[i].week, req.body.Teachplan[i].title,  req.body.Teachplan[i].hour,  req.body.Teachplan[i].activity, req.body.Teachplan[i].professorweek, req.body.Teachplan[i].activity_note, req.body.Teachplan[i].real_hour, req.body.Teachplan[i].reason_note, req.body.Teachplan[i].why_not_plan, req.body.Teachplan[i].sol_not_plan]);
        }else{//. ยังไม่มี id สร้างใหม่
          const new_Teachplan = await pool.query('INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek, activity_note, real_hour, reason_note, why_not_plan, sol_not_plan ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *', 
            [id, req.body.Teachplan[i].week, req.body.Teachplan[i].title,  req.body.Teachplan[i].hour,  req.body.Teachplan[i].activity, req.body.Teachplan[i].professorweek, req.body.Teachplan[i].activity_note, req.body.Teachplan[i].real_hour, req.body.Teachplan[i].reason_note, req.body.Teachplan[i].why_not_plan, req.body.Teachplan[i].sol_not_plan]);
        }
      }
    }

    // if(req.body.outcome.length > 0){
    //   for (var i = 0; i < req.body.outcome.length; i++) {
    //     // console.log("[tqf3.js] updata outcome : ",req.body.outcome[i].id);
    //     if(req.body.outcome[i].id !== ''){ //. มี id แล้ว
    //       const update_outcome = await pool.query('UPDATE tqf3outcome SET tqf3_id = $2, no = $3, text = $4 WHERE id = $1', 
    //         [req.body.outcome[i].id, req.body.outcome[i].tqf3_id, req.body.outcome[i].no, req.body.outcome[i].text]);
    //     }else{//. ยังไม่มี id สร้างใหม่
    //       const new_outcome = await pool.query('INSERT INTO tqf3outcome ( tqf3_id, no, text ) VALUES ( $1, $2, $3 ) RETURNING *', 
    //         [id, req.body.outcome[i].no, req.body.outcome[i].text]);
    //     }
    //   }
    // }

    if(req.body.Professor.length > 0){
      // console.log("[tqf3.js] Professor:", req.body.Professor);
      const deletet3p = await pool.query("DELETE FROM tqf3_employee_match WHERE tqf3_id = $1", [id]);
      for (var i = 0; i < req.body.Professor.length; i++) {
        pool.query('INSERT INTO tqf3_employee_match ( tqf3_id, employee_id, role ) VALUES ( $1, $2, $3 ) RETURNING *', [id, req.body.Professor[i].employee_id, req.body.Professor[i].role ], 
          (error, results) => {
            if (error) {
              console.error(error.message);
            } else {
              // console.log("Rows " + JSON.stringify(results.rows));
            }
          }
        );
      }
    }


    if(req.body.CLO.length > 0){
      for (var i = 0; i < req.body.CLO.length; i++) {
        console.log("[tqf3.js] updata CLO : ",req.body.CLO[i]);
        if(req.body.CLO[i].id !== ''){ //. มี id แล้ว
          const update_CLO = await pool.query('UPDATE tqf3clo SET tqf3_id = $2, tqf2course_clo_id = $3, index = $4, howteach = $5, howeva = $6, problem = $7, criterion = $8, pass = $9, text = $10 WHERE id = $1', 
            [req.body.CLO[i].id, id, req.body.CLO[i].tqf2course_clo_id, req.body.CLO[i].index, req.body.CLO[i].howteach, req.body.CLO[i].howeva, req.body.CLO[i].problem, req.body.CLO[i].criterion, req.body.CLO[i].pass, req.body.CLO[i].text]);
        }else{//. ยังไม่มี id สร้างใหม่
          const new_CLO = await pool.query('INSERT INTO tqf3clo ( tqf3_id, tqf2course_clo_id, index, howteach, howeva, problem, criterion, pass, text ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9  )', 
            [id, req.body.CLO[i].tqf2course_clo_id, req.body.CLO[i].index, req.body.CLO[i].howteach, req.body.CLO[i].howeva, req.body.CLO[i].problem, req.body.CLO[i].criterion, req.body.CLO[i].pass, req.body.CLO[i].text]);
        }
      }
    }
    

    // console.log("[tqf3.js] data:",req.body);
    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Update', 'tqf3/update', 'TQF3 [ID: '+id+'] was updated', req.user.id ] );
    res.json("tqf3 was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/delete/:id", authJwt.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const tqf3 = await pool.query("SELECT code FROM tqf3 WHERE id = $1",[id]);
    if (tqf3.rows.length === 0) {
      return res.status(404).json("Not Found!");
    } 
    const deletetqf3= await pool.query("DELETE FROM tqf3 WHERE id = $1", [id]);

    const add = {successful: true,message: "tqf3 was deleted!"}
    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Delete', 'tqf3/delete', 'TQF3 [ID: '+id+'] was deleted!', req.user.id ] );
    res.status(200).json({successful: true,message: "tqf3 was deleted!"});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error: "+err.message);
  }
});


router.post("/course-allfilter", async (req, res) => {
  try {
    const { type, type2, search } = req.body;
    const all = await pool.query(
      "SELECT t3.id, t3.thainame, t3.engname, t3.code, t3.pre_requisites_st, t3.pre_requisites_nd "+
      "FROM tqf3 t3 "+
      "WHERE t3.tqf2program_id LIKE '%" + type + "%' AND t3.termyear_code LIKE '%" + type2 + "%' AND ( LOWER(t3.thainame) LIKE LOWER('%" + search + "%') OR LOWER(t3.engname) LIKE LOWER('%" + search + "%') OR LOWER(t3.code) LIKE LOWER('%" + search + "%') ) AND t3.documentstatus_code LIKE 'FINISH' "+
      "ORDER BY t3.createdate ASC "
    );
    
    if(all.rowCount > 0){
      for (var i = 0; i < all.rowCount; i++) {
        const Professor = await pool.query(
          "SELECT t3em.employee_id, e.thainame, e.engname "+
          "FROM tqf3_employee_match t3em "+
          "JOIN employee e ON e.id = t3em.employee_id "+
          "WHERE t3em.tqf3_id = $1 AND t3em.role LIKE 'main' ",
          [all.rows[i].id]
        );
        const Assistant = await pool.query(
          "SELECT t3em.employee_id, e.thainame, e.engname "+
          "FROM tqf3_employee_match t3em "+
          "JOIN employee e ON e.id = t3em.employee_id "+
          "WHERE t3em.tqf3_id = $1 AND (t3em.role NOT LIKE 'main' OR t3em.role IS NULL) ",
          [all.rows[i].id]
        );
        const add = {Professor: Professor.rows[0], Assistant: Assistant.rows}
        Object.assign(all.rows[i], add)
      }
    }

    
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});



router.post("/course-myprofile", authJwt.verifyToken, async (req, res) => {
  try {
    const { type, type2, search } = req.body;
    var all
    if(type === "all" || type === ""){
      all = await pool.query(
        "SELECT t3.id, t3.thainame, t3.engname, t3.code, t3.termyear_code "+
        "FROM tqf3 t3 "+
        "WHERE t3.createby = $1 AND ( LOWER(t3.thainame) LIKE LOWER('%" + search + "%') OR LOWER(t3.engname) LIKE LOWER('%" + search + "%')) "+
        "ORDER BY t3.createdate ASC ",
        [req.user.id]
      );
    }else{
      all = await pool.query(
        "SELECT t3.id, t3.thainame, t3.engname, t3.code, t3.termyear_code "+
        "FROM tqf3 t3 "+
        "WHERE t3.createby = $1 AND ( LOWER(t3.thainame) LIKE LOWER('%" + search + "%') OR LOWER(t3.engname) LIKE LOWER('%" + search + "%')) AND t3.termyear_code = $2 "+
        "ORDER BY t3.createdate ASC ",
        [req.user.id,type]
      );
    }
    
    
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/course-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("[tqf3.js]  id:", id);
    const { type, type2, search } = req.body;
    var all
    if(type === "all" || type === ""){
      all = await pool.query(
        "SELECT t3.id, t3.thainame, t3.engname, t3.code, t3.termyear_code "+
        "FROM tqf3 t3 "+
        "JOIN employee e ON e.users_id = t3.createby "+
        "WHERE e.id = $1 AND ( LOWER(t3.thainame) LIKE LOWER('%" + search + "%') OR LOWER(t3.engname) LIKE LOWER('%" + search + "%')) AND t3.documentstatus_code LIKE 'FINISH'"+
        "ORDER BY t3.createdate ASC ",
        [id]
      );
    }else{
      all = await pool.query(
        "SELECT t3.id, t3.thainame, t3.engname, t3.code, t3.termyear_code "+
        "FROM tqf3 t3 "+
        "JOIN employee e ON e.users_id = t3.createby "+
        "WHERE e.id = $1 AND ( LOWER(t3.thainame) LIKE LOWER('%" + search + "%') OR LOWER(t3.engname) LIKE LOWER('%" + search + "%')) AND t3.termyear_code = $2 AND t3.documentstatus_code LIKE 'FINISH'"+
        "ORDER BY t3.createdate ASC ",
        [id,type]
      );
    }
    
    
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/get-course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query(
      "SELECT t.code, t.thainame, t.engname, t.tqf2program_id, t.tqf2course_id, t.credit, t.termyear_code, t.pre_requisites_st, t.pre_requisites_nd, t.co_requisites, t.place, t.study_time, t.no_students, t.outcome, t.description, d.id "+
      "FROM tqf3 t "+
      "JOIN document d ON d.documentdata_id = t.id "+
      "WHERE t.id = $1 ", [id]);
    if (get.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }


    const Professor = await pool.query(
      "SELECT t3em.employee_id, e.thainame, e.engname "+
      "FROM tqf3_employee_match t3em "+
      "JOIN employee e ON e.id = t3em.employee_id "+
      "WHERE t3em.tqf3_id = $1 AND t3em.role LIKE 'main' ",
      [id]
    );
    const Assistant = await pool.query(
      "SELECT t3em.employee_id, e.thainame, e.engname "+
      "FROM tqf3_employee_match t3em "+
      "JOIN employee e ON e.id = t3em.employee_id "+
      "WHERE t3em.tqf3_id = $1 AND (t3em.role NOT LIKE 'main' OR t3em.role IS NULL) ",
      [id]
    );
    const add = {Professor: Professor.rows[0], Assistant: Assistant.rows}
    Object.assign(get.rows[0], add)


    res.json(get.rows);
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;













