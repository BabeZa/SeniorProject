const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("[uploadPDF.js] file:", file);
        cb(null,__basedir + '/public/files/')
    },
    filename: function(req, file, cb){
        var filename = file.originalname
        var newfilename = filename.split(" ").join("+");;
        // console.log("[uploadPDF.js] filename:", newfilename);
        cb(null, Date.now() + "-" + newfilename);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 500000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    },
    onFileSizeLimit: function (file) {
        console.log('[uploadPDF.js] Failed: ' + file.originalname + ' is limited')
        fs.unlink(file.path)
    },
    onFileUploadData: function(file, data) {
        console.log('Got a chunk of data!');
    },
    onFileUploadComplete: function(file) {
        console.log('Completed file!');
    },
    onParseStart: function() {
        console.log('Starting to parse request!');
    },
    onParseEnd: function(req, next) {
        console.log('Done parsing!');
        next();
    },
    onError: function(e, next) {
        if (e) {
          console.log(e.stack);
        }
        next();
    }
}).single('myPDF');


function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: PDF Only!');
    }
}

const uploadStorage = multer({ storage: storage })
  
router.post("/upload", (req, res) =>{                   //. สร้างฟังก์ชั่นรับส่งข้อมูล
    upload(req, res, (err) => {                         //. เรียกใช้ upload ที่สร้างไว้แล้ว
        if (err instanceof multer.MulterError) {        //. ถ้า error ให้โชว์ error
            console.log("[uploadPDF.js] error: ",err.message);
        }else if(err){
            console.log("[uploadPDF.js] error: ",err.message);
            return res.status(401).json(err.message);
        }
        console.log("[uploadPDF.js] Request body ", req.body);
        console.log("[uploadPDF.js] Request file ", req.file);//Here you get file.
        // console.log("__dirname: " +__dirname);
        
        res.json(req.file);                             //. ส่งผลลัพธ์กลับไป
    });
});

module.exports = router;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log("[uploadPDF.js] step 4");
//         console.log("[uploadPDF.js] file:", file);
//         cb(null,__basedir + '/public/files/')
//     },
//     filename: function(req, file, cb){
//         // console.log("[uploadPDF.js] step 5");
//         var filename = file.originalname
//         var newfilename = filename.split(" ").join("+");;
//         // console.log("[uploadPDF.js] filename:", newfilename);
//         cb(null, Date.now() + "-" + newfilename);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 500000000},
//     fileFilter: function(req, file, cb){
//         // console.log("[uploadPDF.js] step 0");
//         checkFileType(file, cb);
//         // console.log("[uploadPDF.js] step 3");
//     },
//     onFileSizeLimit: function (file) {
//         console.log('[uploadPDF.js] Failed: ' + file.originalname + ' is limited')
//         fs.unlink(file.path)
//     },
//     onFileUploadData: function(file, data) {
//         console.log('Got a chunk of data!');
//     },
//     onFileUploadComplete: function(file) {
//         console.log('Completed file!');
//     },
//     onParseStart: function() {
//         console.log('Starting to parse request!');
//     },
//     onParseEnd: function(req, next) {
//         console.log('Done parsing!');
//         next();
//     },
//     onError: function(e, next) {
//         if (e) {
//           console.log(e.stack);
//         }
//         next();
//     }
// }).single('myPDF');


// function checkFileType(file, cb){
//     // Allowed ext
//     const filetypes = /pdf/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
//     if(mimetype && extname){
//         return cb(null,true);
//     } else {
//         cb('Error: PDF Only!');
//     }
// }

// const uploadStorage = multer({ storage: storage })
  
// router.post("/upload", (req, res) =>{
//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             console.error("[uploadPDF.js] error: ",err.message);
//         }else if(err){
//             console.error("[uploadPDF.js] error: ",err.message);
//             return
//         }
//         console.log("[uploadPDF.js] Request body ", req.body);
//         console.log("[uploadPDF.js] Request file ", req.file);//Here you get file.
//         // console.log("__dirname: " +__dirname);
        
//         res.json(req.file);
//     });
// });





// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,__basedir + '/public/files/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'file-' + Date.now() + '.' +
//         file.originalname.split('.')[file.originalname.split('.').length-1])}
// })

// const upload = multer({ storage: storage })

// router.post('/upload',upload.single('myPDF'),(req,res) => {
//     if (req.fileValidationError) {
//         console.log("[uploadPDF.js] error: ");
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.file) {
//         console.log("[uploadPDF.js] error: ");
//         return res.send('Please select an image to upload');
//     }
//     else if (err instanceof multer.MulterError) {
//         console.log("[uploadPDF.js] error: ");
//         return res.send(err);
//     }
//     else if (err) {
//         console.log("[uploadPDF.js] error: ");
//         return res.send(err);
//     }
//     console.log("[uploadPDF.js] Request body ", req.body);
//     console.log("[uploadPDF.js] Request file ", req.file);//Here you get file.
//     res.json(req.file);
// })