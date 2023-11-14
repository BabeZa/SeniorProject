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
import AuthService from "../services/auth.service";


export default function LoginForm() {

    const { t } = useTranslation();
    const history = useHistory();

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { modalIsOpenLogin, setModalIsOpenLogin } = useContext(SelectContext);

    const [showPass, setShowPass] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
      });

    const { username, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value 
    });


    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            // const body = { username, password };

            // const res = PostgreURL.post("/auth/login", body)
            // res.then(result => {
            //     console.log(result);
            //     if (result.data.jwtToken) {
            //         localStorage.setItem("token", result.data.jwtToken);
            //         // setAuth(true);
            //         toast.success("Logged in Successfully");
            //       } else {
            //         // setAuth(false);
            //         toast.error(result.statusText);
            //       }
            // })

            // const response = await fetch(
            //     host+"/auth/login",
            //     {
            //       method: "POST",
            //       headers: {
            //         "Content-type": "application/json"
            //       },
            //       body: JSON.stringify(body)
            //     }
            // );
            // console.log(response);

            // const parseRes = await response.json();

            // if (parseRes.jwtToken) {
            //     localStorage.setItem("token", parseRes.jwtToken);
            //     setIsAuthenticated(true);
            //     setModalIsOpen(false);
            //     toast.success("Logged in Successfully");
            //     history.push('/professorHome');
            //     // window.location.reload();
            // } else {
            //     setIsAuthenticated(false);
            //     toast.error(parseRes);
            // }

            AuthService.login(username, password).then(
                () => {
                    setIsAuthenticated(true);
                    setModalIsOpenLogin(false);
                    toast.success("Logged in Successfully");

                    const user = AuthService.getCurrentUser();
                    // console.log("role.includes :", user.roles.includes("ROLE_ADMIN"));
                    if(user.roles.includes("ROLE_PROFESSOR")){
                        history.push("/professor");
                        window.location.reload();
                    }else if(user.roles.includes("ROLE_ADMIN")){
                        history.push("/admin");
                        window.location.reload();
                    }else if(user.roles.includes("ROLE_STAFF")){
                        history.push("/");
                        window.location.reload();
                    }else if(user.roles.includes("ROLE_STUDENT")){
                        history.push("/student");
                        window.location.reload();
                    }else{
                        history.push("/");
                        window.location.reload();
                    }
                    
                    
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString();
                    setIsAuthenticated(false);
                    toast.error(resMessage);
                }
              );
            
        } catch (err) {
          console.error(err.message);
        }
    };

    
return (
    <>
        <div className="modal-container">
            <div className="modal-cancel">
                <img src={ cancel } onClick={() => setModalIsOpenLogin(false)} className="modal-cancel-icon cancel-icon-rotate" />
            </div>
            <div className="modal-header">
                <h1>{t('login.title')}</h1>
            </div>
            <form onSubmit={onSubmitForm}>
                <div className="form-input">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                        className="form-control"
                        placeholder={t('login.username')}
                        required
                    />
                    <div className="V-line-login" />
                    <img src={ user } alt="logo" className="form-input-i" ></img>
                </div>
                <div className="form-input">
                    <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        className="form-control"
                        placeholder={t('login.password')}
                        required
                    />
                    <div className="V-line-login" />
                    <img src={ padlock } alt="logo"className="form-input-i"></img>
                    <img src={ showPass? visibility1 : visibility0 } alt="logo"className="form-input-ii" onClick={() => setShowPass(!showPass)}></img>
                </div>
                <div className="form-input">
                    {/* <a href="https://regis.kmutt.ac.th/nstudent/InternetAccount.php" target="_blank">{t('login.forgot')}</a> */}
                </div>
    
                <button className="login-button MyButton">{t('login.btn')}</button>
                
                
            </form>
        </div>
    </>
)
}