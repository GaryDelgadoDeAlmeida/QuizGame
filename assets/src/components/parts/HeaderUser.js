import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderUser(props) {

    const storageUser = localStorage.getItem("user") ?? []
    const [logged, setLogged] = useState(storageUser.length ? true : false)
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.setItem("user", "")
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
                        <li>
                            <Link to={"/user"}>
                                <img src={`${window.location.origin}/content/svg/home-house-white.svg`} alt={""} />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user/profile"}>
                                <img src={`${window.location.origin}/content/svg/avatar-white.svg`} alt={""} />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user/best-score"}>
                                <img src={`${window.location.origin}/content/svg/stars-white.svg`} alt={""} />
                                <span>Best score</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user/game"}>
                                <img src={`${window.location.origin}/content/svg/controller-joystick-white.svg`} alt={""} />
                                <span>Game</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user/competition"}>
                                <img src={`${window.location.origin}/content/svg/competition-white.svg`} alt={""} />
                                <span>Competition</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} onClick={(e) => handleLogout(e)}>
                                <img src={`${window.location.origin}/content/svg/logout-white.svg`} alt={""} />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </nav>
                </div>
                
                <div className={"page-content"}>
                    <div className={"page-banner"}>
                        <input id={"menubars"} className={"d-hidden"} type={"checkbox"} hidden />
                        <label htmlFor={"menubars"} className={"label-menubars"}>
                            <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                        </label>
                        
                        <div className={"mobile-menu"}>
                            <div className={"mobile-menu-widget"}>
                                <label htmlFor={"menubars"} className={"label-menubars"}>
                                    <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                                </label>
                                
                                <nav className={"menu"}>
                                    <li>
                                        <Link to={"/user"}>
                                            <img src={`${window.location.origin}/content/svg/home-house-white.svg`} alt={""} />
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/user/profile"}>
                                            <img src={`${window.location.origin}/content/svg/avatar-white.svg`} alt={""} />
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/user/best-score"}>
                                            <img src={`${window.location.origin}/content/svg/stars-white.svg`} alt={""} />
                                            <span>Best score</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/user/game"}>
                                            <img src={`${window.location.origin}/content/svg/controller-joystick-white.svg`} alt={""} />
                                            <span>Game</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/user/competition"}>
                                            <img src={`${window.location.origin}/content/svg/competition-white.svg`} alt={""} />
                                            <span>Competition</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"#"} onClick={(e) => handleLogout(e)}>
                                            <img src={`${window.location.origin}/content/svg/logout-white.svg`} alt={""} />
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </nav>
                            </div>
                        </div>
                    </div>
                    
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}