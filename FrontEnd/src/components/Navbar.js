import React, {useState, useEffect, useContext, useMemo} from 'react';
import { Link } from 'react-router-dom';
import Logo from './../assert/image/CPE.png';
import user from './../assert/image/user.png';
import th from './../assert/icon/th.svg';
import en from './../assert/icon/en.svg';
import userprofile from './../assert/icon/userprofile.svg';
import PostgreAPI from '../apis/PostgreAPI'
import Modal from 'react-modal';
import './Navbar.css';
import Dropdown from './Dropdown';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { AuthContext, SelectContext } from "../context/index";

import LoginForm from './LoginForm';
import ChangePass from './ChangePass'
import AuthService from "../services/auth.service";

function MyNavbar() {

    const { t } = useTranslation();
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(AuthContext);
    const [click, setClick] = useState(false);
    // const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [thumbnail, setThumbnail] = useState("");
    const [ user, setUser] = useState(null);
    const [ isLoaded, setIsLoaded] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    //? ------------------------------- login ------------------------------
    const { modalIsOpenLogin, setModalIsOpenLogin } = useContext(SelectContext);
    const { modalIsOpen2, setModalIsOpen2 } = useContext(SelectContext);

    //? ------------------------------- end login ------------------------------


    const changeLanguage = () => {
        if(i18next.languages[0] === 'en'){
            i18next.changeLanguage('th')
        } else {
            i18next.changeLanguage('en')
        }
        
    }
    
    useEffect(() => {
        
        console.log("[Navbar.js] useEffect");
        setLoading(false)
        AuthService.isAuth().then(
            response => {
                // console.log("[Navbar.js] : 1111");
                setUser(JSON.parse(localStorage.getItem('user')));
                setIsAuthenticated(true)
                PostgreAPI.get("/photo/getphoto").then((res) => {
                    // console.log("[Navbar.js] photo: ",res.data)
                    setThumbnail(res.data.thumb)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                setLoading(true);
            },
            error => {
                history.push("/");
                // console.log("[Navbar.js] : 0000");
                setIsAuthenticated(false);
                localStorage.removeItem("user");
                setLoading(true);
                setUser({"id":"0","name":"0","roles":["ROLE_GUEST"],"accessToken":"00"});
            }
        );
        setIsLoaded(true);


        
    }, []);

    
    // window.addEventListener('resize', showButton);


    const openModal = () => {
        setModalIsOpenLogin(true);
        closeMobileMenu();
    }

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
    };
    
    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(false);
        }
    };

    if (!isLoaded || user === null) {
        return <> <nav className="navbar"></nav> </>;
    }
    return (
        // console.log("[Navbar.js] render"),
        // console.log("[Navbar.js] user: ",JSON.stringify(user)),
        <>
            <Modal
                isOpen={modalIsOpenLogin}
                onRequestClose={() => setModalIsOpenLogin(false)}
                style={{
                    overlay:{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)',
                        borderRadius         : '60px'
                      }
                }}
            >   <LoginForm/>    </Modal>

            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={() => setModalIsOpen2(false)}
                style={{
                    overlay:{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)',
                        borderRadius         : '60px'
                      }
                }}
            >   <ChangePass/>   </Modal>

            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            <img src={ Logo } alt="logo" className="Logo"></img>
                        </Link>
                        <div className="navbar-lang" onClick={ changeLanguage }>
                            <img src={ i18next.languages[0] === 'th' ? th : en } alt="lang" className="lang"></img>
                        </div>
                    </div>
                    
                    <div className="menu-icon" onClick={ handleClick }>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        {user.roles.includes("ROLE_PROFESSOR") && <li className='nav-item'>
                            <Link to='/professor' className='nav-links' onClick={closeMobileMenu}>
                                <p>Home</p>
                            </Link>
                        </li>}

                        <li className='nav-item'>
                            <Link to='/curriculum' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.curriculum')}</p>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/course' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.course')}</p>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/personnel' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.personnel')}</p>
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link to='/student' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.student')}</p>
                            </Link>
                        </li> */}
                        <li className='nav-item'>
                            <Link to='/document' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.document')}</p>
                            </Link>
                        </li>
                        {user.roles.includes("ROLE_ADMIN") && <li className='nav-item'>
                            <Link to='/reactadmin' className='nav-links' onClick={closeMobileMenu}>
                                <p>Admin</p>
                            </Link>
                        </li>}
                        {/* <li className='nav-item'>
                            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                                <p>{t('navbar.contact')}</p>
                            </Link>
                        </li> */}
                        <li className='nav-item'  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <div className={isAuthenticated ? 'nav-links notshow' : 'nav-links'} onClick={openModal}>
                                <p>{t('navbar.login')}</p>
                            </div>
                            <div className={isAuthenticated ? 'nav-links' : 'nav-links notshow' }>
                                <img src={thumbnail === "" ? user : thumbnail} alt="logo" className="userprofile"></img>
                                {dropdown && <Dropdown />}
                            </div>
                            
                        </li>
                        
        
                        
                    </ul>
                </div>
            </nav>
        </>
    )
}


const Navbar = () => (
        <MyNavbar/>
)

export default Navbar
