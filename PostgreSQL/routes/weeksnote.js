const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

// router.get("/get/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const get = await pool.query("SELECT code, thainame, engname, credit, termyear_code, study_time, no_students FROM tqf3 WHERE id = $1", [id]);
//     if (get.rows.length === 0) {
//       return res.status(404).json("Not Found!");
//     }  

//     const gett3t = await pool.query("SELECT id, week, title, hour, activity, professorweek, activity_note FROM tqf3teachplan WHERE tqf3_id = $1 ORDER BY week ASC", [id]);
//     // console.log("[tqf3.js] t3t:",gett3t.rows);
//     if(gett3t.rowCount > 0){
//       for (var i = 0; i < gett3t.rowCount; i++) {
//         console.log("[weeksnote.js] get tqf3teachplan id:",gett3t.rows[i].id);
//         const get1 = await pool.query("SELECT tqf3teachplan_id, tqf3evaluationplan_id, checked FROM weeksnote_evaluations WHERE tqf3teachplan_id = $1", [gett3t.rows[i].id]);
//         const add1 = {Evaluations: get1.rows}
//         Object.assign(gett3t.rows[i], add1)

//         const get2 = await pool.query("SELECT tqf3teachplan_id, tqf2course_clo_id FROM weeksnote_eva_clo WHERE tqf3teachplan_id = $1", [gett3t.rows[i].id]);
//         const add2 = {EvaCLO: get2.rows}
//         Object.assign(gett3t.rows[i], add2)
//       }
//     }

//     const get4 = await pool.query("SELECT * FROM weeksnote_clo WHERE tqf3_id = $1", [id]);
//     const add4 = {CLO: get4.rows}
//     Object.assign(get.rows[0], add4)

//     const add3 = {Teachplan: gett3t.rows}
//     Object.assign(get.rows[0], add3)


//     const adds = {successful: true}
//     Object.assign(get.rows[0], adds)

//     res.json(get.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// router.get("/getdata/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const get1 = await pool.query("SELECT id, howeva, evaratio FROM tqf3evaluationplan WHERE tqf3_id = $1", [id]);

//     const get2 = await pool.query("SELECT t2.id, t2.value FROM tqf2course_clo t2 JOIN tqf3 t3 ON t3.tqf2course_id = t2.tqf2course_id WHERE t3.id = $1", [id]);

//     const adds = {
//       successful: true,
//       EvaluationsData: get1.rows,
//       CLOData: get2.rows
//     }
//     res.json(adds);
//   } catch (err) {
//     console.error(err.message);
//   }
// });


router.get("/getall", authJwt.verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query(
      "SELECT t3.id, t3.code, t3.engname, t3.study_time ,t3.documentstatus_code  "+
      "FROM tqf3 t3  "+
      "JOIN tqf3_employee_match t3em ON t3em.tqf3_id = t3.id "+
      "WHERE t3em.employee_id =  "+
        "(SELECT e.id FROM employee e JOIN users u ON u.id = e.users_id WHERE u.id = $1) "+
        "AND documentstatus_code NOT LIKE 'DRAFT' AND documentstatus_code NOT LIKE 'HIDE'", 
      [req.user.id]);

    const adds = {successful: true}
    Object.assign(get.rows, adds)

    res.json(get.rows);
  } catch (err) {
    console.error(err.message);
  }
});





router.get("/get2/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query("SELECT code, thainame, engname, credit, termyear_code, study_time, no_students, current_week FROM tqf3 WHERE id = $1", [id]);
    if (get.rows.length === 0) {
      return res.status(404).json("Not Found!");
    }  

    const clo = await pool.query("SELECT * FROM tqf3clo WHERE tqf3_id = $1", [id]);
    // console.log("[weeksnote.js] clo:",clo.rows);

    const add4 = {CLO: clo.rows}
    Object.assign(get.rows[0], add4)

    const adds = {successful: true}
    Object.assign(get.rows[0], adds)

    res.json(get.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



router.get("/getteachplan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Teachplan = await pool.query("SELECT id, week, title, hour, activity, professorweek, activity_note, real_hour, reason_note, why_not_plan, sol_not_plan FROM tqf3teachplan WHERE tqf3_id = $1 ORDER BY week ASC", [id]);
    // const evadata_m = await pool.query("SELECT id, howeva, evaratio FROM tqf3evaluationplan WHERE tqf3_id = $1", [id]);
    // console.log("[weeksnote.js] getteachplan evadata:",evadata.rows);
    // console.log("[tqf3.js] t3t:",Teachplan.rows);
    if(Teachplan.rowCount > 0){
      for (var i = 0; i < Teachplan.rowCount; i++) {
        // console.log("[weeksnote.js] get tqf3teachplan id:",Teachplan.rows[i].id);
        const evadata = await pool.query("SELECT id, howeva, evaratio FROM tqf3evaluationplan WHERE tqf3_id = $1", [id]);
        const eva = await pool.query("SELECT id, tqf3teachplan_id, tqf3evaluationplan_id, checked FROM weeksnote_evaluations WHERE tqf3teachplan_id = $1", [Teachplan.rows[i].id]);
        // console.log("[weeksnote.js] getteachplan evadata:",evadata.rows);  
        if(evadata.rowCount > 0){
          for(var j = 0; j < evadata.rowCount; j++){
            // console.log("[weeksnote.js] getteachplan -----evadata:",evadata.rows[j].id);
            // console.log("[weeksnote.js] getteachplan ----- ****eva --:",eva.rows.find(obj => obj.tqf3evaluationplan_id === evadata.rows[j].id));
            if(eva.rows.find(obj => obj.tqf3evaluationplan_id === evadata.rows[j].id)){
              // console.log("[weeksnote.js] getteachplan ----- ****eva --:",eva.rows.find(obj => obj.tqf3evaluationplan_id === evadata.rows[j].id));
              const temp = eva.rows.find(obj => obj.tqf3evaluationplan_id === evadata.rows[j].id)
              Object.assign(evadata.rows[j], temp)
            }else{
              const addnew = {
                id:"",
                checked: false,
                tqf3teachplan_id:Teachplan.rows[i].id,
                tqf3evaluationplan_id:evadata.rows[j].id}
              Object.assign(evadata.rows[j], addnew)
            }
            
          }
        }
        const add1 = {Evaluations: evadata.rows}
        Object.assign(Teachplan.rows[i], add1)
      }
    }

   

    if(Teachplan.rowCount > 0){
      for (var i = 0; i < Teachplan.rowCount; i++) {
        // console.log("[weeksnote.js] get tqf3teachplan id:",Teachplan.rows[i].id);
        // const clodata = await pool.query("SELECT t2.id, t2.value FROM tqf2course_clo t2 JOIN tqf3 t3 ON t3.tqf2course_id = t2.tqf2course_id WHERE t3.id = $1", [id]);
        const clodata = await pool.query("SELECT id, text as value, index FROM tqf3clo WHERE tqf3_id = $1 ORDER BY index ASC", [id]);
        const clo = await pool.query("SELECT id, tqf3teachplan_id, tqf3clo_id, checked FROM weeksnote_eva_clo WHERE tqf3teachplan_id = $1", [Teachplan.rows[i].id]);
        // console.log("[weeksnote.js] clodata:",clodata.rows);  
        // console.log("[weeksnote.js] clo:",clo.rows);  
        if(clodata.rowCount > 0){
          for(var j = 0; j < clodata.rowCount; j++){
            // console.log("[weeksnote.js] getteachplan -----evadata:",evadata.rows[j].id);
            // // console.log("[weeksnote.js] getteachplan ----- ****eva --:",eva.rows.find(obj => obj.tqf3evaluationplan_id === evadata.rows[j].id));
            if(clo.rows.find(obj => obj.tqf3clo_id === clodata.rows[j].id)){
              // console.log("[weeksnote.js] getteachplan ----- ****clo --:",clo.rows.find(obj => obj.tqf2course_clo_id === clodata.rows[j].id));
              const temp = clo.rows.find(obj => obj.tqf3clo_id === clodata.rows[j].id)
              Object.assign(clodata.rows[j], temp)
            }else{
              const addnew = {
                id:"",
                checked: false,
                tqf3teachplan_id:Teachplan.rows[i].id,
                tqf3clo_id:clodata.rows[j].id}
              Object.assign(clodata.rows[j], addnew)
            }
            
          }
        }
        const add2 = {EvaCLO: clodata.rows}
        Object.assign(Teachplan.rows[i], add2)
      }
    }


    res.json(Teachplan.rows);
  } catch (err) {
    console.error(err.message);
  }
});
 

router.put("/update-clo/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("[weeksnote.js.js] update req.body:",req.body);
    const update2 = await pool.query('UPDATE tqf3 SET current_week = $2 WHERE id = $1', [id, req.body.current_week]);
    if(req.body.CLO.length > 0){
      for(var i = 0; i < req.body.CLO.length; i++){
        console.log("[weeksnote.js.js] update req.body:",req.body.CLO[i]);
        const update = await pool.query('UPDATE tqf3clo SET pass = $2, problem = $3 WHERE id = $1', 
            [req.body.CLO[i].id, req.body.CLO[i].pass, req.body.CLO[i].problem]);
      }
    }
    res.json("Updated!");
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update-teachplan/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("[weeksnote.js.js] update req.body:",req.body);
    // const update_Teachplan = await pool.query('UPDATE tqf3teachplan SET tqf3_id = $2, week = $3, title = $4, hour = $5, activity = $6, professorweek = $7, activity_note = $8 WHERE id = $1', 
    //         [req.body.Teachplan[i].id, req.body.Teachplan[i].tqf3_id, req.body.Teachplan[i].week, req.body.Teachplan[i].title,  req.body.Teachplan[i].hour,  req.body.Teachplan[i].activity, req.body.Teachplan[i].professorweek, req.body.Teachplan[i].activity_note]);
   
   
   
    if(req.body.length > 0){
      for(var i = 0; i < req.body.length; i++){
        console.log("[weeksnote.js.js] update req.body:",req.body[i].id);
        const update_Teachplan = await pool.query('UPDATE tqf3teachplan SET real_hour = $2, reason_note = $3, activity_note = $4, why_not_plan = $5, sol_not_plan = $6 WHERE id = $1', 
            [req.body[i].id, req.body[i].real_hour, req.body[i].reason_note, req.body[i].activity_note, req.body[i].why_not_plan, req.body[i].sol_not_plan]);

            if(req.body[i].Evaluations.length > 0){
              for(var j = 0; j < req.body[i].Evaluations.length; j++){
                // console.log("[weeksnote.js.js] update req.body:",req.body[i].Evaluations);
                
                if(req.body[i].Evaluations[j].id !== ''){ //. มี id แล้ว
                  const update = await pool.query('UPDATE weeksnote_evaluations SET tqf3teachplan_id = $2, tqf3evaluationplan_id = $3, checked = $4 WHERE id = $1', 
                    [req.body[i].Evaluations[j].id, req.body[i].Evaluations[j].tqf3teachplan_id, req.body[i].Evaluations[j].tqf3evaluationplan_id, req.body[i].Evaluations[j].checked]);
                }else{//. ยังไม่มี id สร้างใหม่
                  const newo = await pool.query('INSERT INTO weeksnote_evaluations ( tqf3teachplan_id, tqf3evaluationplan_id, checked ) VALUES ( $1, $2, $3 ) RETURNING *', 
                    [req.body[i].Evaluations[j].tqf3teachplan_id, req.body[i].Evaluations[j].tqf3evaluationplan_id, req.body[i].Evaluations[j].checked ]);
                }
              }
            }

            if(req.body[i].EvaCLO.length > 0){
              for(var j = 0; j < req.body[i].EvaCLO.length; j++){
                console.log("[weeksnote.js.js] update req.body:",req.body[i].EvaCLO);
                
                if(req.body[i].EvaCLO[j].id !== ''){ //. มี id แล้ว
                  const update = await pool.query('UPDATE weeksnote_eva_clo SET tqf3teachplan_id = $2, tqf3clo_id = $3, checked = $4 WHERE id = $1', 
                    [req.body[i].EvaCLO[j].id, req.body[i].EvaCLO[j].tqf3teachplan_id, req.body[i].EvaCLO[j].tqf3clo_id, req.body[i].EvaCLO[j].checked]);
                }else{//. ยังไม่มี id สร้างใหม่
                  const newo = await pool.query('INSERT INTO weeksnote_eva_clo ( tqf3teachplan_id, tqf3clo_id, checked ) VALUES ( $1, $2, $3 ) RETURNING *', 
                    [req.body[i].EvaCLO[j].tqf3teachplan_id, req.body[i].EvaCLO[j].tqf3clo_id, req.body[i].EvaCLO[j].checked ]);
                }
              }
            }
        
      }
    }
    res.json("Updated!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;











