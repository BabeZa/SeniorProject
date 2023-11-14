const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

router.post("/create", authJwt.verifyToken, async (req, res) =>{
  try {
      console.log("[tqf2.js] create:",req.body);
      const { program_name, program_depart, program_year, program_code, program_thainame, program_engname, full_thai, mini_thai, full_eng, mini_eng, major, allcredit, createdate, createby, documentstatus_code } = req.body;
      const newo = await pool.query(
        "INSERT INTO tqf2 ( program_name, program_depart, program_year, program_code, program_thainame, program_engname, full_thai, mini_thai, full_eng, mini_eng, major, allcredit, createdate, createby, documentstatus_code ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 ) RETURNING *",
        [program_name, program_depart, program_year, program_code, program_thainame, program_engname, full_thai, mini_thai, full_eng, mini_eng, major, allcredit, createdate, req.user.id, documentstatus_code]
      );
      console.log("[tqf2.js] create newo:",newo.rows[0].id);
 
      // const new1 = await pool.query(
      //   "INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 )",
      //   [ newo.rows[0].id, 1, null, null, null, null ]);
  
      // const new2 = await pool.query(
      //   "INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek ) VALUES ( $1, $2, $3, $4, $5, $6 )",
      //   [ newo.rows[0].id, 1, null, null, null, null ]);

      // const new3 = await pool.query(
      //   "INSERT INTO tqf3outcome ( tqf3_id, no, text ) VALUES ( $1, $2, $3 )",
      //   [ newo.rows[0].id, 1, null ]);

      // if(req.body.Evaluationplan.length > 0){
      //   for (var i = 0; i < req.body.Evaluationplan.length; i++) {
      //     pool.query('INSERT INTO tqf3evaluationplan ( tqf3_id, evaactivity, evaoutcome, howeva, evaweek, evaratio ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *', [newo.rows[0].id, req.body.Evaluationplan[i].evaactivity, req.body.Evaluationplan[i].evaoutcome, req.body.Evaluationplan[i].howeva, req.body.Evaluationplan[i].evaweek, req.body.Evaluationplan[i].evaratio ], 
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
  
      // if(req.body.Teachplan.length > 0){
      //   for (var i = 0; i < req.body.Teachplan.length; i++) {
      //     pool.query('INSERT INTO tqf3teachplan ( tqf3_id, week, title, hour, activity, professorweek ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *', [newo.rows[0].id, req.body.Teachplan[i].week, req.body.Teachplan[i].title,  req.body.Teachplan[i].hour,  req.body.Teachplan[i].activity, req.body.Teachplan[i].professorweek ], 
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

      // if(req.body.Professor.length > 0){
      //   // console.log("[tqf3.js] outcome.length:", req.body.outcome.length);
      //   for (var i = 0; i < req.body.Professor.length; i++) {
      //     pool.query('INSERT INTO tqf3_employee_match ( tqf3_id, employee_id, role ) VALUES ( $1, $2, $3 ) RETURNING *', [newo.rows[0].id, req.body.Professor[i].employee_id, "main" ], 
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
  
      res.json(newo.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM tqf2");
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query("SELECT * FROM tqf2 WHERE id = $1", [id]);
    if (get.rows.length === 0) {
      return res.status(404).json("Not Found!"); 
    }  

    const get2 = await pool.query("SELECT * FROM tqf2course WHERE tqf2_id = $1 ORDER BY index ASC ", [id]);
    // console.log("[tqf2.js] course:",get2.rows);
  
    for (var i = 0; i < get2.rowCount; i++) {
      // console.log("[tqf2.js] course :",get2.rows[i]);
      const get3 = await pool.query("SELECT * FROM tqf2course_clo WHERE tqf2course_id = $1 ORDER BY index ASC ", [get2.rows[i].id]);
      // console.log("[tqf2.js] course:",get2.rows);
      const add3 = {course_expectlearningoutcome: get3.rows}
      Object.assign(get2.rows[i], add3)
    }

    const add2 = {course: get2.rows}
    Object.assign(get.rows[0], add2)
    
    const adds = {
      successful: true,
      course_delete:[],
      course_expectlearningoutcome_delete:[]
    }
    Object.assign(get.rows[0], adds)
    res.json(get.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("[tqf2.js] updata: ",req.body);

    const { program_name, program_depart, program_year, program_code, program_thainame, program_engname, full_thai, mini_thai, full_eng, mini_eng, major, allcredit, createdate, createby, documentstatus_code } = req.body;
    const update = await pool.query(
      "UPDATE tqf2 SET program_name = $2, program_depart = $3, program_year = $4, program_code = $5, program_thainame = $6, program_engname = $7, full_thai = $8, mini_thai = $9, full_eng = $10, mini_eng = $11, major = $12, allcredit = $13, createdate = $14, createby = $15, documentstatus_code = $16 WHERE id = $1",
      [id, program_name, program_depart, program_year, program_code, program_thainame, program_engname, full_thai, mini_thai, full_eng, mini_eng, major, allcredit, createdate, createby, documentstatus_code]
    );

    if(req.body.course_expectlearningoutcome_delete.length > 0){
      for (var i = 0; i < req.body.course_expectlearningoutcome_delete.length; i++) {
        console.log("[tqf2.js] update delete clo: ",req.body.course_expectlearningoutcome_delete[i].course_expectlearningoutcome_id);
        pool.query('DELETE FROM tqf2course_clo WHERE tqf2course_id = $1 ',[req.body.course_expectlearningoutcome_delete[i].course_expectlearningoutcome_id], 
          (error, results) => {
            if (error) {
              console.error(error.message);
            }
          }
        );
      }
    }
    
    if(req.body.course_delete.length > 0){
      for (var i = 0; i < req.body.course_delete.length; i++) {
        console.log("[tqf2.js] update delete c: ",req.body.course_delete[i].course_id);
        pool.query('DELETE FROM tqf2course_clo WHERE tqf2course_id = $1 ',[req.body.course_delete[i].course_id], 
          (error, results) => {
            if (error) {
              console.error(error.message);
            }
          }
        );
        pool.query('DELETE FROM tqf2course WHERE id = $1 ',[req.body.course_delete[i].course_id], 
          (error, results) => {
            if (error) {
              console.error(error.message);
            }
          }
        );
      }
    }


    const updateCLO = async (course, course_id) => {
          // console.log("[tqf2.js] updata clo course_id : ",course_id);
          // console.log("[tqf2.js] updata clo course : ",course);
          if(course.course_expectlearningoutcome.length > 0){
            for (var i = 0; i < course.course_expectlearningoutcome.length; i++) {
              // console.log("[tqf2.js] updata course_expectlearningoutcome : ",course.course_expectlearningoutcome[i].id);
              if(course.course_expectlearningoutcome[i].id !== ''){ //. มี id แล้ว
                const update_clo= await pool.query(
                  "UPDATE tqf2course_clo SET tqf2course_id = $2, index = $3, value = $4 WHERE id = $1",
                  [course.course_expectlearningoutcome[i].id, course.course_expectlearningoutcome[i].tqf2course_id, course.course_expectlearningoutcome[i].index, course.course_expectlearningoutcome[i].value]
                );
              }else{
                const new_clo= await pool.query(
                  "INSERT INTO tqf2course_clo ( tqf2course_id, index, value ) VALUES ( $1, $2, $3 ) RETURNING *",
                  [ course_id, course.course_expectlearningoutcome[i].index, course.course_expectlearningoutcome[i].value]
                );
              }
            }
          }

    }

    if(req.body.course.length > 0){
      for (var i = 0; i < req.body.course.length; i++) {
        // console.log("[tqf2.js] updata course : ",req.body.course[i].id);
        var course_id = ""
        if(req.body.course[i].id !== ''){ //. มี id แล้ว
          const update_tqf2course = await pool.query(
            "UPDATE tqf2course SET tqf2_id = $2, index = $3, course_code = $4, course_thainame = $5, course_engname = $6, course_credit = $7, course_prerequi = $8, course_describtion = $9 WHERE id = $1",
            [req.body.course[i].id, req.body.course[i].tqf2_id, req.body.course[i].index, req.body.course[i].course_code, req.body.course[i].course_thainame, req.body.course[i].course_engname, req.body.course[i].course_credit, req.body.course[i].course_prerequi, req.body.course[i].course_describtion]
          );
          course_id = req.body.course[i].id;
        }else{//. ยังไม่มี id สร้างใหม่
          const new_tqf2course = await pool.query(
            "INSERT INTO tqf2course ( tqf2_id, index, course_code, course_thainame, course_engname, course_credit, course_prerequi, course_describtion ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id",
            [req.body.id, req.body.course[i].index, req.body.course[i].course_code, req.body.course[i].course_thainame, req.body.course[i].course_engname, req.body.course[i].course_credit, req.body.course[i].course_prerequi, req.body.course[i].course_describtion]
          );
          course_id = new_tqf2course.rows[0].id
        }
        // console.log("[tqf2.js] updata course_id : ",course_id);
        updateCLO(req.body.course[i], course_id);

      }
    }

    
    

    // console.log("[tqf3.js] data:",req.body);
    res.json("tqf2 was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteobj = await pool.query("DELETE FROM tqf2 WHERE id = $1", 
//       [id]
//     );
//     res.json("tqf2 was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });


router.get("/gettqf2course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query("SELECT * FROM tqf2course WHERE id = $1", [id]);
    if (get.rows.length === 0) {
      return res.status(404).json("Not Found!"); 
    }

    res.json(get.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.post("/allfilter", async (req, res) => {
  try {
    const { type, type2, search } = req.body;
    const all = await pool.query(
      "SELECT t2.id, t2.program_thainame, t2.program_engname, t2.file_id, t2.degrees_code, t2.program_year_detail_th, t2.program_year_detail_en, t2.program_year, t2.program_type_th, t2.program_type_en, uf.path as link "+
      "FROM tqf2 t2 "+
      "JOIN uploadfile uf ON uf.id = t2.uploadfile_id "+
      "WHERE t2.degrees_code LIKE '" + type + "%' AND ( LOWER(t2.program_thainame) LIKE LOWER('%" + search + "%') OR LOWER(t2.program_engname) LIKE LOWER('%" + search + "%') ) AND t2.status_code NOT LIKE 'HIDE'"+
      "ORDER BY t2.createdate ASC "
    );
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;













