const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

// router.get("/getprofile", authJwt.verifyToken, async (req, res) => {
//     try {
//       const employee = await pool.query(
//         'SELECT e.* , p.path '+
//         'FROM employee e '+
//         'JOIN users u ON u.id = e.users_id '+
//         'JOIN photo p ON p.id = u.photo_id '+
//         'WHERE users_id = $1 ',
//         [req.user.id]
//       );
//       // console.log("[employee.js] getprofile",employee.rows[0]);
//       const add = {successful: true}
//       Object.assign(employee.rows[0], add) //. เพิ่ม successful: true 
//       // console.log("[employee.js] getprofile",employee.rows[0]);
//       res.json(employee.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
// });
router.post("/isme", authJwt.verifyToken, async (req, res) => {
      try {
        const { id } = req.body;
        // console.log("[permissions.js] isme body: ", req.body);
        // console.log("[permissions.js] isme id: ", req.user.id);
        if(id === req.user.id){
          // console.log("[permissions.js] isme: true");
          // res.send(200, {"result": true})
          // res.status(200).json({result:"ok"})
          return res.json(true);
        }else{
          // console.log("[permissions.js] isme: false");
          return res.json(false);
        }
         
      } catch (err) {
        console.error(err.message);
      }
});

router.post("/tqf3", authJwt.verifyToken, async (req, res) => {
  try {
    const { id,tqf3id } = req.body;
    const Professor = await pool.query(
      "SELECT t3em.employee_id, e.thainame, e.engname, e.users_id "+
      "FROM tqf3_employee_match t3em "+
      "JOIN employee e ON e.id = t3em.employee_id "+
      "WHERE t3em.tqf3_id = $1",
      [tqf3id]
    );
    // console.log("[permissions.js] tqf3 body: ", req.body);
    // console.log("[permissions.js] tqf3 id: ", req.user.id);
    // console.log("[permissions.js] tqf3 Professor:",Professor);
    for(var i = 0; i< Professor.rowCount; i++){
      // console.log("[permissions.js] tqf3 Professor:",Professor.rows[i].users_id);
      if(Professor.rows[i].users_id === req.user.id){return res.json(true);}
    }
    if(id === req.user.id){return res.json(true);}
    //   console.log("[permissions.js] tqf3: true");
    //   // res.send(200, {"result": true})
    //   // res.status(200).json({result:"ok"})
    //   return res.json(true);
    // }
      
    return res.json(false);
    
     
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/tqf3", authJwt.verifyToken, async (req, res) => {
  try {
    const { id,tqf3id } = req.body;
    const Professor = await pool.query(
      "SELECT t3em.employee_id, e.thainame, e.engname, e.users_id "+
      "FROM tqf3_employee_match t3em "+
      "JOIN employee e ON e.id = t3em.employee_id "+
      "WHERE t3em.tqf3_id = $1",
      [tqf3id]
    );
    // console.log("[permissions.js] tqf3 body: ", req.body);
    // console.log("[permissions.js] tqf3 id: ", req.user.id);
    // console.log("[permissions.js] tqf3 Professor:",Professor);
    for(var i = 0; i< Professor.rowCount; i++){
      // console.log("[permissions.js] tqf3 Professor:",Professor.rows[i].users_id);
      if(Professor.rows[i].users_id === req.user.id){return res.json(true);}
    }
    if(id === req.user.id){return res.json(true);}
    //   console.log("[permissions.js] tqf3: true");
    //   // res.send(200, {"result": true})
    //   // res.status(200).json({result:"ok"})
    //   return res.json(true);
    // }
      
    return res.json(false);
    
     
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;
  