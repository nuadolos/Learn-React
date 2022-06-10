import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import cl from "./Navbar.module.css";
import { AuthContext } from '../../../context/index'
import MyButton from '../button/MyButton'

const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__links}>
                <div className={cl.navbar__link}>
                    <Link to='/about'>О сайте</Link>
                </div>
                <div className={cl.navbar__link}>
                    <Link to='/posts'>Посты</Link>
                </div>
                <MyButton onClick={() => logout()}>Выход</MyButton>
            </div>
        </div>
    );
}

export default Navbar;