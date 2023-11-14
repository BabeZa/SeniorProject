import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import user from './../assert/icon/user.svg';
import padlock from './../assert/icon/padlock.svg';
import visibility0 from './../assert/icon/visibility0.svg';
import visibility1 from './../assert/icon/visibility1.svg';
import cancel from './../assert/icon/cancel.svg'
import './LoginForm.css';
import { toast} from "react-toastify";
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext, SelectContext } from "../context/index";
import PostgreAPI from "../apis/PostgreAPI";


export default function ChangePass() {

    const { t } = useTranslation();
    const history = useHistory();

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { modalIsOpen2, setModalIsOpen2 } = useContext(SelectContext);

    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);


    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        passwordc: ""
      });

    const { username, password, passwordc } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value 
    });


    const onSubmitForm = async e => {
        e.preventDefault(); 
        try {

            if(password === passwordc){
                const body = { password, username };

                console.log("[ChangePass.js] pass:",password );

                PostgreAPI.put("/auth/changepass",body)
                  .then((res) => {
                    toast.success("Change Password Successfully!");
                    setModalIsOpen2(false)
                  })
                  .catch((error) => {
                    toast.error(error);
                    console.error(error)
                  })
                // const response = await fetch(
                //     PostgreURL+"/auth/changepass/"+parseDataT.id,
                //     {
                //       method: "PUT",
                //       headers: {
                //         "Content-type": "application/json"
                //       },
                //       body: JSON.stringify(body)
                //     }
                // );

            }else{
                toast.error("Password Mismatch!");
            }
            
            
            
        } catch (err) {
          console.error(err.message);
        }
    };

    
return (
    <>
        <div className="modal-container">
            <div className="modal-cancel">
                <img src={ cancel } onClick={() => setModalIsOpen2(false)} className="modal-cancel-icon cancel-icon-rotate" />
            </div>
            <div className="modal-header">
                <h1 style={{color: "#EEA95C"}}>{t('changepass.title')}</h1>
            </div>
            <form onSubmit={onSubmitForm}>
            {/* <div className="form-input">
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => onChange(e)}
                    className="form-control"
                    placeholder={t('login.username')}
                />
                <div className="V-line-login" />
                <img src={ user } alt="logo" className="form-input-i" ></img>
            </div> */}
            <div className="form-input">
                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        className="form-control"
                        placeholder={t('changepass.password')}
                    />
                    <div className="V-line-login" />
                    <img src={ padlock } alt="logo"className="form-input-i"></img>
                    <img src={ showPass? visibility1 : visibility0 } alt="logo"className="form-input-ii" onClick={() => setShowPass(!showPass)}></img>
                </div>
                <div className="form-input">
                    <input
                        type={showPass2 ? "text" : "password"}
                        name="passwordc"
                        value={passwordc}
                        onChange={e => onChange(e)}
                        className="form-control"
                        placeholder={t('changepass.password2')}
                    />
                    <div className="V-line-login" />
                    <img src={ padlock } alt="logo"className="form-input-i"></img>
                    <img src={ showPass2? visibility1 : visibility0 } alt="logo"className="form-input-ii" onClick={() => setShowPass2(!showPass2)}></img>
                </div>
    
                <button className="login-button MyButton" style={{width: '280px' ,left: "calc( 50% - 140px )", backgroundColor: "#EEA95C", bottom: "50px"}}>{t('changepass.btn')}</button>
                
                
            </form>
        </div>
    </>
)
}