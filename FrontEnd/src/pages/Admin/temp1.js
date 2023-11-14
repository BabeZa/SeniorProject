import React,{useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {PostgreURL} from "../../apis/PostgreAPI";
import PostgreAPI from "../../apis/PostgreAPI";

export default function Temp1() {
    const [file, setFile] = useState({}) 
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [photoid, setPhotoid] = useState(0)

    const handleUploadImage = (e) => { 
        
        const file = e.target.files[0]; // เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.readAsDataURL(file);
        reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            console.log("----");
            setFile(file);
            setImagePreviewUrl(reader.result);
        };
        
    }
    
    const show = (e) => { 
        // console.log("imagePreviewUrl ",imagePreviewUrl);
        console.log("file: ",file);
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
        formData.append('myImage', file) 
        console.log("[admin/temp.js] formData: ",formData);
        const uploadImg = await axios({ 
            method: 'post',
            url: PostgreURL+'/image/upload',
            data: formData
        })
        // console.log('uploadImg ',uploadImg);  
        // console.log('uploadImg ',uploadImg.data.filename);  
        const path2 = uploadImg.data.destination.replace("/app",PostgreURL);
        const img = {
            filename: uploadImg.data.filename, 
            path: path2, 
            mimetype: uploadImg.data.mimetype, 
            size: undefined, 
            thumbnail: undefined
        };
        await photocreate(img)
        console.log(photoid);

    }




    useEffect(()=>{
        console.log("file2 ",file);
    }, [file])


    const test = (e) => { 
        const data = [
            {
                fname: 'test10',
                lname: 'tehezathh',
                age: 7657
            },
            {
                fname: 'test11',
                lname: null,
                age: null
            }
            ,
            {
                fname: null,
                lname: null,
                age: null
            }
        ];
        const res = PostgreAPI.post('/test/sscreate', data)
        
    }
    
return (
    <>

        <div>
            <Link to='/admin' >BACK</Link>

            <img src={imagePreviewUrl ? imagePreviewUrl : "https://dcvta86296.i.lithium.com/t5/image/serverpage/image-id/14321i0011CCD2E7F3C8F8/image-size/large?v=1.0&px=999"}
                style={{width: 'auto', height: "300px"}} /> 
            <input  
                type="file" 
                onChange={handleUploadImage} 
            />
            <button onClick={onClickUpload}> Upload </button>
            <button onClick={show} > Show </button>
        </div>
        <button onClick={test} > test </button>
    </>
)}