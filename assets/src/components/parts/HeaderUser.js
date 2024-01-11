import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderUser(props) {

    const [logged, setLogged] = useState(localStorage.getItem("token") != "" ? true : false)
    const handleLogout = (e) => {
        localStorage.setItem("token", "")
        setLogged(false)
    }

    return (
        <>
            {!logged && (
                <Navigate to={"/login"} />
            )}

            <div className={"page-user"}>
                <div className={"page-header"}>
                    <nav className={"vertical-menu"}>
                        <li><Link to={"/user"}>Home</Link></li>
                        <li><Link to={"/user/profile"}>Profile</Link></li>
                        <li><Link to={"/user/game"}>Start a game</Link></li>
                        <li><Link to={"/user/best-score"}>Best score</Link></li>
                        <li>
                            <button 
                                type={"button"} 
                                className={"btn btn-red"} 
                                onClick={(e) => handleLogout(e)}
                            >Logout</button>
                        </li>
                    </nav>
                </div>
                
                <div className={"page-content"}>
                    <div className={"page-banner"}>
                        <input id={"menubars"} className={"d-hidden"} type={"checkbox"} hidden />
                        <label htmlFor={"menubars"} className={"label-menubars"}>
                            <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                        </label>
                        
                        <div className={"mobile-menu"}>
                            <div className={"mobile-menu-widget"}>
                                <label htmlFor={"menubars"} className={"label-menubars"}>
                                    <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                                </label>
                                
                                <nav className={"menu"}>
                                    <li><Link to={"/user"}>Home</Link></li>
                                    <li><Link to={"/user/profile"}>Profile</Link></li>
                                    <li><Link to={"/user/game"}>Start a game</Link></li>
                                    <li><Link to={"/user/best-score"}>Best score</Link></li>
                                    <li>
                                        <button 
                                            type={"button"} 
                                            className={"btn btn-red"} 
                                            onClick={(e) => handleLogout(e)}
                                        >Logout</button>
                                    </li>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                    
                    <div className={"page-footer"}>
                        <div className={"footer-wrapper"}>
                            <div className={"footer-copyright"}>
                                <p>Copyright &copy; {(new Date()).toLocaleDateString("en-US", {year: 'numeric'})} &minus; Quiz Game</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}