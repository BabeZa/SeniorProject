const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");


//create ------------------------------------------
router.post("/create", async (req, res) =>{
	try {
		const { title, duedate, isshowed, createdate, createby } = req.body;
const newcalendar_event = await pool.query("INSERT INTO calendar_event ( title, duedate, isshowed, createdate, createby ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *", [ title, duedate, isshowed, createdate, createby ] );
		res.json(newcalendar_event.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

//update ------------------------------------------
router.put("/update/:id", async (req, res) =>{
	try {
		const { id } = req.params;
		const { title, duedate, isshowed, createdate, createby } = req.body;
		const updatecalendar_event = await pool.query("UPDATE calendar_event SET title = $2, duedate = $3, isshowed = $4, createdate = $5, createby = $6 WHERE id = $1 ", [ id, title, duedate, isshowed, createdate, createby ] );
		res.json("calendar_event was updated!"); 
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

//getbyid ------------------------------------------
router.get("/get/:id", async (req, res) =>{
	try {
		const { id } = req.params;
		const getcalendar_event = await pool.query("SELECT * FROM calendar_event WHERE id = $1", [id] );
		if (getcalendar_event.rows.length === 0) {return res.status(404).json("Not Found!");} 
		res.json(getcalendar_event.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

//getall ------------------------------------------
router.get("/getall", async (req, res) =>{
	try {
		const getcalendar_event = await pool.query("SELECT * FROM calendar_event " );
		if (getcalendar_event.rows.length === 0) {return res.status(404).json("Not Found!");} 
		res.json(getcalendar_event.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

//getallbydate ------------------------------------------
router.post("/getallbydate", async (req, res) =>{
	try {
    const { date } = req.body;
		const getcalendar_event = await pool.query("SELECT title, duedate, isshowed FROM calendar_event " );
		if (getcalendar_event.rows.length === 0) {return res.status(404).json("Not Found!");} 
		res.json(getcalendar_event.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

//deletebyid ------------------------------------------
router.delete("/delete/:id", async (req, res) =>{
	try {
		const { id } = req.params;
		const getcalendar_event = await pool.query("SELECT * FROM calendar_event WHERE id = $1", [id] );
		if (getcalendar_event.rows.length === 0) {return res.status(404).json("Not Found!");} 
		const deletecalendar_event = await pool.query("DELETE FROM calendar_event WHERE id = $1", [id] );
		res.json("calendar_event was deleted!"); 
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Error: "+err.message);
	}
});

module.exports = router;













