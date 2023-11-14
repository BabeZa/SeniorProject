const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");
  
router.get("/guest", async (req, res) => {
    res.status(200).send("ok");
});
  
router.get("/user", authJwt.verifyToken, (req, res) => {res.status(200).send("ok");});

router.get("/admin", authJwt.verifyToken, authJwt.isAdmin, (req, res) => {
    // console.log("[validrole.js] admin: done");
    res.status(200).send("ok");
});

router.get("/staff", authJwt.verifyToken, authJwt.isStaff, (req, res) => {res.status(200).send("ok");});

router.get("/professor", authJwt.verifyToken, authJwt.isProfessor, (req, res) => {res.status(200).send("ok");});

router.get("/student", authJwt.verifyToken, authJwt.isStudent, (req, res) => {res.status(200).send("ok");});

router.get("/professororadmin", authJwt.verifyToken, authJwt.isProfessorOrAdmin, (req, res) => {
    // console.log("[validrole.js] isProfessorOrAdmin: done");
    res.status(200).send("ok");
});

router.get("/professorleader", authJwt.verifyToken, authJwt.isProfessorLeader, (req, res) => {
    // console.log("[validrole.js] isProfessorOrAdmin: done");
    res.status(200).send("ok");
});


module.exports = router;