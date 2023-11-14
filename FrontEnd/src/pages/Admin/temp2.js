import React,{useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {PostgreURL} from "../../apis/PostgreAPI";
import PostgreAPI from "../../apis/PostgreAPI";

export default function Temp2() {
    const [file, setFile] = useState({}) 
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [photoid, setPhotoid] = useState(0)

    const handleUploadImage = (e) => { 
        try {
            const file = e.target.files[0]; // เก็บไว้ setState ลงใน file
            const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
            reader.readAsDataURL(file);
            reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
                console.log("----");
                setFile(file);
            };
        } catch (error) {
            console.error(error);
        }
        
        
    }
    
    const show = (e) => { 
        // console.log("imagePreviewUrl ",imagePreviewUrl);
        console.log("file: ",file);
        const p = 'The quick brown dog jumps over the lazy dog. If the dog reacted, was it really lazy?';
        console.log(p.replaceAll('dog', 'monkey'));
    }
    

    const photocreate = async (body) => {
        try {
            const response = await fetch(PostgreURL+"/photo/supercreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                setPhotoid(data.id);
                // console.log("photo: "+data.id);
            }).catch(err => {
                console.log('caught it!',err);
            })
        } catch (err) {
          console.error(err.message);
        }
    };
    
    const photoupdate = async (id,bodyu) => {
  

        try {
        
            const path2 = bodyu.path.replace("/app",PostgreURL);
            console.log("path2:  "+path2);
            const body = {
                name: "img-"+bodyu.filename, 
                path: path2+"img-"+bodyu.filename,  
                mimetype: bodyu.mimetype, 
                size: bodyu.size, 
                thumbnail: id+1
            };
      
            console.log("body : "+body.thumbnail);
            const response = await fetch(PostgreURL+"/photo/update/"+id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                console.log("update ");
            }).catch(err => {
                console.log('caught it!',err);
            })
        } catch (err) {
          console.error(err.message);
        }
    };

    const onClickUpload = async () => {
        const formData = new FormData() 
        formData.append('myPDF', file) 
        console.log("[admin/temp2.js] formData: ",formData);

        PostgreAPI.post("/pdf/upload", formData)
        .then((res) => {
            // const path2 = res.data.destination.replace("/app",PostgreURL);
            console.log("[admin/temp2.js] pdf:",res.data);
        })
        .catch((error) => {
            console.error(error)
        });

        // const uploadImg = await axios({ 
        //     method: 'post',
        //     url: PostgreURL+'/image/upload',
        //     data: formData
        // })
        // // console.log('uploadImg ',uploadImg);  
        // // console.log('uploadImg ',uploadImg.data.filename);  
        // const path2 = uploadImg.data.destination.replace("/app",PostgreURL);
        // const img = {
        //     filename: uploadImg.data.filename, 
        //     path: path2, 
        //     mimetype: uploadImg.data.mimetype, 
        //     size: undefined, 
        //     thumbnail: undefined
        // };
        // await photocreate(img)
        // console.log(photoid);

    }




    useEffect(()=>{
        console.log("file2 ",file);
    }, [file])

    
return (
    <>

        <div>
            <Link to='/admin' >BACK</Link>
            <input  
                type="file" 
                onChange={handleUploadImage} 
            />
            <button onClick={() => onClickUpload()}> Upload </button>
            <button onClick={show} > Show </button>
        </div>
    </>
)}