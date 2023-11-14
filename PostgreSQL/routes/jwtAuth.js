const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authJwt = require("../middleware/authJwt");

//authorizeentication
// router.post("/register", validInfo, async (req, res) => {
router.post("/register", async (req, res) => {
  const {username, name, password, photo_id, isactive} = req.body;
  
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (username, name, password, photo_id, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, name, bcryptPassword, photo_id, isactive]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/changepass", authJwt.verifyToken, async (req, res) => {
  const { password, username } = req.body;
  
  try {

    console.log("password "+password);
    console.log("username "+username);

    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [
      req.user.id
    ])

    var newusername = ""
    if(username === ""){
      newusername = user.rows[0].username
    }else {
      newusername = username
    }
    const name = user.rows[0].name
    const photo_id = user.rows[0].photo_id
    const isactive = user.rows[0].isactive

    // console.log("id "+id);
    // console.log("user "+user.rows[0].id);

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "UPDATE users SET username = $2, name = $3, password = $4, photo_id = $5, isactive = $6 WHERE id = $1",
      [req.user.id, newusername, name, bcryptPassword, photo_id, isactive ]
    );

    
    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'ChangePassword', 'jwtAuth/changepass', user.rows[0].name+' are successfully Changed Password', req.user.id ] );
    res.json("professor was updated!");

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
    ]);
    // console.log("User: "+ user.id);
    // if (user.rows.length === 0) {
    //   return res.status(401).json("Invalid Credential");
    // }
    if (user.rows.length === 0) {
      // return res.status(404).send({ message: "User Not found." });
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
      user.rows[0].id
    ]);
    // console.log("Role: "+ JSON.stringify(roles.rows[0]));
    var authorities = [];
    for (let i = 0; i < roles.rowCount; i++) {
      // console.log("Role: "+ JSON.stringify(roles.rows[i]e));
      authorities.push("ROLE_" + roles.rows[i].name.toUpperCase()); 
    }
    

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      const newback_log = await pool.query(
        "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
        [ 'Login-Failed', 'jwtAuth/login', user.rows[0].name+' try to login with an incorrect password', null ] );
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const jwtToken = jwtGenerator(user.rows[0].id);

    //return res.json({ jwtToken });
    const newback_log = await pool.query(
      "INSERT INTO back_log ( event_type, source, message, createby ) VALUES ( $1, $2, $3, $4 )", 
      [ 'Login', 'jwtAuth/login', user.rows[0].name+' are successfully logged in', user.rows[0].id ] );
    
    res.status(200).send({
      id: user.rows[0].id,
      name: user.rows[0].name,
      roles: authorities,
      accessToken: jwtToken
    }); //.ส่งต่ากลับ เอาไปใส่ใน local storage
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/verify", authJwt.verifyToken, (req, res) => {
  // try {
  //   res.json(true);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
  // console.log("[jwtAuth.js] verify: done");
  res.status(200).send("ok");
});

// router.post("/verify", authJwt.verifyToken, (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });


// แปลง token เป้น user id
router.post("/tokentoid", authJwt.verifyToken, async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT id, name FROM users WHERE id = $1",
        [req.user.id] 
      ); 
      
    //if would be req.user if you change your payload to this:
      
    //   function jwtGenerator(user_id) {
    //   const payload = {
    //     user: user_id
    //   };
      
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.post("/registerpro", async (req, res) => {
  const {username, engname, password, photo_id, isactive, thainame, type, email, phone, website, faculty_id, department_id, level} = req.body;
  
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
    ]);


    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (username, name, password, photo_id, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, engname, bcryptPassword, photo_id, isactive]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id);

    const employee = await pool.query("INSERT INTO employee ( thainame, engname, type, email, phone, website, faculty_id, department_id, level, users_id, isactive ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *", 
    [ thainame, engname, type, email, phone, website, faculty_id, department_id, level, newUser.rows[0].id, isactive]);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;


// //.. login
// router.post("/login", validInfo, async (req, res) => {
//   const { username, password } = req.body;          //. ดึงค่าจากใน req.body มาใส่ตัวแปลแต่ละตัวตามชื่อ
//   try {
//     const user = await pool.query(                  //. ดึงข้อมูล users จากฐานข้อมูล ด้วย username
//       "SELECT * FROM users WHERE username = $1", [username] );
//     if (user.rows.length === 0) {                   //. ถ้าไม่เจอให้ส่ง error กลับไป
//       return res.status(404).send({ message: "User Not found." }); }

//     const roles = await pool.query(                 //. ดึงข้อมูลของ user นั้นพร้องกับ role
//       "SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur "+
//       "JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", 
//       [ user.rows[0].id ]);

//     var authorities = [];
//     for (let i = 0; i < roles.rowCount; i++) {      //. สร้าง role เพื่อให้นำไปใช้ต่อได้
//       authorities.push("ROLE_" + roles.rows[i].name.toUpperCase()); 
//     } //.. เปลียนจาก "admin" เป็น "ROLE_ADMIN"
    
//     const validPassword = await bcrypt.compare(     //. เปรียบเทียบรหัสที่กรอกเข้ามากับที่อยู่ในฐานข้อมูล
//       password, user.rows[0].password );

//     if (!validPassword) {                           //. ถ้า password ไม่ถูกต้องให้ส่ง error กลับไป
//       return res.status(401).send({ message: "Invalid Password!" }); }
      
//     const jwtToken = jwtGenerator(user.rows[0].id); //. สร้าง token 
//     res.status(200).send({                          //. ส่งค่ากลับ เอาไปใส่ใน local storage
//       id: user.rows[0].id,
//       name: user.rows[0].name,
//       roles: authorities,
//       accessToken: jwtToken
//     }); 
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });