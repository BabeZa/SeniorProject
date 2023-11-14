const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const gm = require('gm');
const sizeOf = require('image-size');


const storage = multer.diskStorage({            //. จัดการเกี่ยวกับไฟล์
  destination: function (req, file, cb) {       //. สร้างปลายทางเอาไว้เก็ไฟล์
      cb(null,__basedir + '/public/images/')      
  },
  filename: function(req, file, cb){            //. สร้างชื่อของไฟล์
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

function checkFileType(file, cb){               //. ฟังก์ชั่นเช็คประเภทไฟล์
  //.. กำหนดประเภทไฟล์
  const filetypes = /jpeg|jpg|png|gif/;
  //.. เช็คว่าประเภทไฟล์ตรงกับที่กำหนดไว้ใน filetypes ไหม
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //.. เช็คว่านามสกุลไฟล์ตรงกับที่กำหนดไว้ใน filetypes ไหม
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){                      //. เช็คว่าประเภทไฟล์และนามสกุลไฟล์ ถูกต้อง
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({                         //. สร้างตัว upload  
  storage: storage,                             //. เรียกใช้ จัดการเกี่ยวกับไฟล์ ที่สร้างไว้แล้ว
  limits:{fileSize: 10000000},                  //. กำหนดขนาดไฟล์สูงสุดไว้ที่ 10 mb
  fileFilter: function(req, file, cb){          //. Filter ไฟล์
    checkFileType(file, cb);                    //. เรียกใช้
  },
  onFileSizeLimit: function (file) {            //. ถ้าขนาดไฟล์เกิน
      fs.unlink(file.path)                      //. ให้ลบไฟล์นั้น
    }
}).single('myImage');

// router.post("/upload", (req, res) =>{                 //. สร้างฟังก์ชั่นรับส่งข้อมูล
//   upload(req, res, (err) => {                         //. เรียกใช้ upload ที่สร้างไว้แล้ว
//       if (err instanceof multer.MulterError) {        //. ถ้า error ให้โชว์ error
//           return res.status(401).json(err.message);
//       }
//       res.json(req.file);                             //. ส่งผลลัพธ์กลับไป
//   });
// });


router.post("/upload", async (req, res) =>{
    try {
      upload(req, res, (err) => {
        // console.log("[uploadImage.js] Request body ", req.body);
        // console.log("[uploadImage.js] Request file ", req.file);
        if(err){
            return res.status(200).send("Error: Server error");
        }else {
            if(req.file == undefined){
                return res.status(400).send("Error: No File Selected!"); 
            }
              const dimensions = sizeOf(__basedir +'/public/images/'+req.file.filename);
              const width = dimensions.width;
              const height = dimensions.height;
            

              if(width >= height){
                gm(__basedir +'/public/images/'+req.file.filename)
                  .resize(height, height, '^')
                  .gravity('Center')
                  .crop(height, height)
                  .write(__basedir +'/public/images/img-'+req.file.filename, function (err) {
                    if (err) {
                      // console.log('[uploadImage.js] gm error: '+ err);
                  }else{
                    // console.log('[uploadImage.js] gm done! '+height);
                  }
                });
              }else{
                gm(__basedir +'/public/images/'+req.file.filename)
                  .resize(width, width, '^')
                  .gravity('Center')
                  .crop(width, width)
                  .write(__basedir +'/public/images/img-'+req.file.filename, function (err) {
                    if (err) {
                      console.log('[uploadImage.js] gm error: '+ err);
                  }else{
                    // console.log('[uploadImage.js] gm done! '+width);
                  }
                });
              }

              gm(__basedir +'/public/images/'+req.file.filename)
                .resize('64', '64', '^')
                .gravity('Center')
                .crop('64', '64')
                .write(__basedir +'/public/images/thumbnail-'+req.file.filename, function (err) {
                  if (err) {
                    console.log('[uploadImage.js] gm error: '+ err);
                }else{
                  // console.log('[uploadImage.js] gm done! thumbnail');
                  fs.unlinkSync(__basedir +'/public/images/'+req.file.filename);
                }
              });

        }
        res.json(req.file);
      });
    } catch (error) {
        console.error(err.message);
    }
});

  




module.exports = router;


// router.post("/upload", async (req, res) =>{     //. 
//   try {
//     upload(req, res, (err) => {                 //. เรียกใช้ upload ที่สร้างไว้แล้ว
//       if(err){  return res.status(200).send("Error: Server error"); }   //. ถ้า error ให้โชว์ error
//       else{                                     //. ถ้าไม่ error ให้
//           if(req.file == undefined){  return res.status(400).send("Error: No File Selected!"); }
//           const dimensions = sizeOf(__basedir +'/public/images/'+req.file.filename);
//           const width = dimensions.width;
//           const height = dimensions.height;
        
//           if(width >= height){
//             gm(__basedir +'/public/images/'+req.file.filename)
//               .resize(height, height, '^').gravity('Center').crop(height, height)
//               .write(__basedir +'/public/images/img-'+req.file.filename, function (err) {
//                 if (err) {  console.error('[uploadImage.js] gm error: '+ err);  }   });
//           }else{
//             gm(__basedir +'/public/images/'+req.file.filename)
//               .resize(width, width, '^').gravity('Center').crop(width, width)
//               .write(__basedir +'/public/images/img-'+req.file.filename, function (err) {
//                 if (err) {  console.error('[uploadImage.js] gm error: '+ err);  }   });
//           }

//           gm(__basedir +'/public/images/'+req.file.filename)
//             .resize('64', '64', '^').gravity('Center').crop('64', '64')
//             .write(__basedir +'/public/images/thumbnail-'+req.file.filename, function (err) {
//               if (err) {  console.error('[uploadImage.js] gm error: '+ err);  }
//               else{ fs.unlinkSync(__basedir +'/public/images/'+req.file.filename);  }
//             });
//       }
//       res.json(req.file);
//     });
//   } catch (err) { console.error(err.message); }
// });