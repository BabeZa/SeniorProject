const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");


router.post("/create", authJwt.verifyToken, async (req, res) =>{
    try {
        const { name, createby, createdate, documenttype_code, uploadfile_id, isactive, documentstatus_code } = req.body;
        const newdocument = await pool.query(
            "INSERT INTO document_upload (name, createby, createdate, documenttype_code, uploadfile_id, isactive, documentstatus_code ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
          [name, req.user.id, createdate, documenttype_code, uploadfile_id, isactive, documentstatus_code ]
        );
        res.json(newdocument.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

router.post("/supercreate", authJwt.verifyToken, async (req, res) =>{
  try {
      const { filename, mimetype, createdate } = req.body;
      const newfile = await pool.query(
        "INSERT INTO uploadfile (name, path, mimetype, createby, createdate) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [ filename, __pathfile+filename, mimetype, req.user.id, createdate]
      );

      const { docname, documenttype_code, isactive, documentstatus_code } = req.body;
      const newdocument_upload  = await pool.query(
          "INSERT INTO document_upload (name, createby, createdate, documenttype_code, uploadfile_id, isactive, documentstatus_code ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [docname, req.user.id, createdate, documenttype_code, newfile.rows[0].id, isactive, documentstatus_code ]
      );
      res.json(newdocument_upload.rows[0]);
  } catch (error) {
      console.error(error.message);
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
      const document = await pool.query("SELECT * FROM document_upload WHERE id = $1",
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
  
router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, createby, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code} = req.body;
      const updatedocument = await pool.query(
        "UPDATE document SET name = $2, createby = $3, createdate = $4, documenttype_code = $5, documentdata_id = $6 , isactive = $7, documentstatus_code = $8 WHERE id = $1",
        [id, name, createby, createdate, documenttype_code, documentdata_id, isactive, documentstatus_code]
      );
  
      
      res.json("document was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
//   //delete a document
  
// router.delete("/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedocument = await pool.query("DELETE FROM document WHERE id = $1", [
//         id
//       ]);
//       res.json("document was deleted!");
//     } catch (err) {
//       console.log(err.message);
//     }
//   });
  
//   // get all document modify
  
router.post("/allfilter", async (req, res) => {
    try {
      const { type, type2, search } = req.body;
      // console.log("[document.js] /allfilter: ",type, "-", search );
      const alldocument = await pool.query(
        "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.uploadfile_id, d.isactive, d.documentstatus_code ,uf.path as link "+
        "FROM document_upload d "+
        "JOIN documenttype dt ON dt.code = d.documenttype_code "+
        "JOIN users u ON u.id = d.createby "+
        "JOIN employee p ON u.id = p.users_id "+
        "JOIN uploadfile uf ON uf.id = d.uploadfile_id "+
        "WHERE dt.code LIKE '" + type + type2 + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
        "ORDER BY d.createdate DESC "
      );
      res.json(alldocument.rows);
    } catch (err) {
      console.error("[document.js] /allfilter error: ",err.message);
    }
});

router.post("/profilter/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, type2, search } = req.body;
    // console.log("[document.js] /allfilter: ",type, "-", search );
    const alldocument = await pool.query(
      "SELECT d.id, d.name, p.thainame as createbyth, p.engname as createbyeng, d.createdate, dt.code as type, dt.path, dt.color, d.uploadfile_id, d.isactive, d.documentstatus_code ,uf.path as link "+
      "FROM document_upload d "+
      "JOIN documenttype dt ON dt.code = d.documenttype_code "+
      "JOIN users u ON u.id = d.createby "+
      "JOIN employee p ON u.id = p.users_id "+
      "JOIN uploadfile uf ON uf.id = d.uploadfile_id "+
      "WHERE p.id = $1 AND dt.code LIKE '" + type + type2 + "%' AND LOWER(d.name) LIKE LOWER('%" + search + "%') "+
      "ORDER BY d.createdate DESC ", [id]
    );
    res.json(alldocument.rows);
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