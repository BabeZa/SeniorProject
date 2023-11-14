const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");


router.post("/create", authJwt.verifyToken, async (req, res) =>{
    try {
        const { name, createby, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code } = req.body;
        const newdocument = await pool.query(
            "INSERT INTO document (name, createby, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
          [name, req.user.id, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code ]
        );

        const newback_log = await pool.query(
          "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
          [ 'Create', 'document/create', 'Document [ID: '+newdocument.rows[0].id+'] was created', req.user.id ] );

        res.json(newdocument.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});
  
  
//   //get all document
  
// router.get("/", async (req, res) => {
//     try {
//       const alldocument = await pool.query("SELECT * FROM document");
//       res.json(alldocument.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
  
//get a document 
router.get("/get/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const document = await pool.query("SELECT * FROM document WHERE id = $1",
        [id] 
      );
      if (document.rows.length === 0) {
        return res.status(404).json("Not Found!");
      }  
  
      const add = {successful: true}
      Object.assign(document.rows[0], add)
      
      res.json(document.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  //update a document
  
router.put("/update/:id", authJwt.verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, createby, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code} = req.body;
      const updatedocument = await pool.query(
        "UPDATE document SET name = $2, documenttype_code = $3, isactive = $4, documentstatus_code = $5 WHERE id = $1",
        [id, name, documenttype_code, isactive, documentstatus_code]
      );
  
      const newback_log = await pool.query(
        "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
        [ 'Update', 'document/update', 'Document [ID: '+id+'] was updated', req.user.id ] );
      
      res.json("document was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
//delete a document
  
router.delete("/delete/:id", authJwt.verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const document = await pool.query("SELECT documentdata_id FROM document WHERE id = $1",[id]);
      if (document.rows.length === 0) {
        return res.status(404).json("Not Found!");
      } 
      const deletedocument = await pool.query("DELETE FROM document WHERE id = $1", [id]);
      const add = {successful: true,message: "document was deleted!"}
      Object.assign(document.rows[0], add);

      const newback_log = await pool.query(
        "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
        [ 'Delete', 'document/delete', 'Document [ID: '+id+'] was deleted!', req.user.id ] );

      res.status(200).json(document.rows[0]);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
});
  
//   // get all document modify
  
router.post("/allfilter", async (req, res) => {
    try {
      const { type, type2, search } = req.body;
      // console.log("[document.js] /allfilter: ",type, "-", search );
      const alldocument = await pool.query(
        "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code "+
        "FROM document d "+
        "JOIN documenttype dt ON dt.code = d.documenttype_code "+
        "JOIN users u ON u.id = d.createby "+
        "JOIN employee p ON u.id = p.users_id "+
        "WHERE dt.code LIKE '" + type + type2 + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') AND d.documentstatus_code LIKE 'FINISH'"+
        "ORDER BY d.createdate DESC "
      );
      res.json(alldocument.rows);
    } catch (err) {
      console.error("[document.js] /allfilter error: ",err.message);
    }
});

router.post("/profilter", authJwt.verifyToken, async (req, res) => {
  try {
    const { type, type2, search } = req.body;
    console.log("[document.js] /allfilter: ",type, "-",type2,"-", search );
    
    if(type2 === "assistant"){
      const alltqf3 = await pool.query(
        "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code, d.createby "+
        "FROM document d "+
        "JOIN documenttype dt ON dt.code = d.documenttype_code "+
        "JOIN users u ON u.id = d.createby "+
        "JOIN employee p ON u.id = p.users_id "+
        "JOIN tqf3_employee_match t3em ON t3em.tqf3_id = d.documentdata_id "+
        "WHERE t3em.employee_id = "+
          "(SELECT e.id FROM employee e JOIN users u ON u.id = e.users_id WHERE u.id = $1) "+
          "AND d.createby != $1 "+
          "AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
        "ORDER BY d.createdate DESC ", [req.user.id]
      );
      const alltqf5 = await pool.query(
        "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code, d.createby  "+
        "FROM document d  "+
        "JOIN documenttype dt ON dt.code = d.documenttype_code  "+
        "JOIN employee p ON d.createby = p.users_id  "+
        "JOIN tqf5 t5 ON t5.id = d.documentdata_id AND d.documenttype_code = 'TQF5' "+
        "JOIN tqf3_employee_match t3em ON t3em.tqf3_id = t5.tqf3_id "+
        "WHERE t3em.employee_id = "+
          "(SELECT e.id FROM employee e JOIN users u ON u.id = e.users_id WHERE u.id = $1) "+
          "AND d.createby != $1 "+
          "AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
        "ORDER BY d.createdate DESC ", [req.user.id]
      );
      
      // console.log("[document.js] alltqf3.rows: ",alltqf3.rows );
      // console.log("[document.js] alltqf5.rows: ",Object.values(alltqf5.rows));
      const combined1 = [].concat(alltqf3.rows, alltqf5.rows);
      // console.log("[document.js] alltqf3.rows: ", combined1 );
      return res.json(combined1);
      
    }else if(type2 === "leader"){
      const getroles = await pool.query("SELECT roles_id, level, note FROM users_roles ur WHERE ur.users_id = $1 AND ur.roles_id = 4 ", [req.user.id] );
      console.log("[document.js] getroles: ",getroles.rows[0].note.tqf2_id);
      if(getroles.rows[0].level >= 20){
        const alltqf3 = await pool.query(
          "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code, d.createby "+ 
          "FROM document d "+
          "JOIN documenttype dt ON dt.code = d.documenttype_code "+
          "JOIN employee p ON d.createby  = p.users_id "+
          "JOIN tqf3 t3 ON t3.id = d.documentdata_id AND d.documenttype_code = 'TQF3' "+
          "WHERE t3.tqf2program_id = $1 "+
            "AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
          "ORDER BY d.createdate DESC ", [getroles.rows[0].note.tqf2_id]
        );
        const alltqf5 = await pool.query(
          "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code, d.createby "+ 
          "FROM document d "+
          "JOIN documenttype dt ON dt.code = d.documenttype_code "+
          "JOIN employee p ON d.createby  = p.users_id "+
          "JOIN tqf5 t5 ON t5.id = d.documentdata_id "+
          "JOIN tqf3 t3 ON t3.id = t5.tqf3_id "+
          "WHERE t3.tqf2program_id = $1 "+
            "AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
          "ORDER BY d.createdate DESC ", [getroles.rows[0].note.tqf2_id]
        );
        const combined1 = [].concat(alltqf3.rows, alltqf5.rows);
        return res.json(combined1);
      }

    }else{
      const alldocument = await pool.query(
        "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.documentdata_id, d.isactive, d.documentstatus_code "+
        "FROM document d "+
        "JOIN documenttype dt ON dt.code = d.documenttype_code "+
        "JOIN users u ON u.id = d.createby "+
        "JOIN employee p ON u.id = p.users_id "+
        "WHERE u.id = $1 AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
        "ORDER BY d.createdate DESC ", [req.user.id]
      );
      return res.json(alldocument.rows);
    }
    
  } catch (err) {
    console.error("[document.js] /profilter error: ",err.message);
  }
});


router.post("/allprofessor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, type2, search } = req.body;
    const alldocument = await pool.query(
      "SELECT d.id, dt.engname as type, d.name, d.createdate, dt.path, d.documentdata_id, d.isactive, d.documentstatus_code "+
      "FROM document d "+
      "JOIN documenttype dt ON dt.code = d.documenttype_code "+
      "JOIN users u ON u.id = d.createby "+
      "JOIN employee e ON u.id = e.users_id "+
      "WHERE e.id = $1 AND dt.code LIKE '" + type + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
      "ORDER BY d.createdate DESC ",
      [id]
    );
    res.json(alldocument.rows);
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;