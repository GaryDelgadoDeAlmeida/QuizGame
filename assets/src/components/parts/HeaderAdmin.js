import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const [logged, setLogged] = useState(localStorage.getItem("token") != "" ? true : false)
    const handleLogout = (e) => {
        localStorage.setItem("token", "")
        setLogged(false)
    }

    return (
        <>
            {!logged && (
                <Navigate to={"/admin-login"} />
            )}

            <div className={"page-admin"}>
                <div className={"page-header"}>
                    <nav className={"vertical-menu"}>
                        <li>
                            <Link to={"/admin"}>
                                {/* <img src={`${window.location.origin}/content/svg/home-house-white.svg`} alt={""} /> */}
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/admin/profile"}>
                                {/* <img src={`${window.location.origin}/content/svg/avatar-white.svg`} alt={""} /> */}
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li><Link to={"/admin/user"}>Users</Link></li>
                        <li><Link to={"/admin/history-games"}>Games history</Link></li>
                        <li><Link to={"/admin/quiz"}>Question</Link></li>
                        <li><Link to={"/admin/contact"}>Contact</Link></li>
                        <li>
                            <button className={"btn btn-red"} onClick={(e) => handleLogout(e)}>Logout</button>
                        </li>
                    </nav>
                </div>
                <div className={"page-content"}>
                    <div className={"page-banner"}>
                        <label htmlFor={"menubars"} className={"label-menubars"}>
                            <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                        </label>
                        <input id={"menubars"} type={"checkbox"} hidden />
                        
                        <div className={"mobile-menu"}>
                            <div className={"mobile-menu-widget"}>
                                <label htmlFor={"menubars"} className={"label-menubars"}>
                                    <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                                </label>

                                <nav className={"menu"}>
                                    <li><Link to={"/admin"}>Home</Link></li>
                                    <li><Link to={"/admin/profile"}>Profile</Link></li>
                                    <li><Link to={"/admin/user"}>Users</Link></li>
                                    <li><Link to={"/admin/history-games"}>Games history</Link></li>
                                    <li><Link to={"/admin/quiz"}>Question</Link></li>
                                    <li><Link to={"/admin/contact"}>Contact</Link></li>
                                    <li>
                                        <button className={"btn btn-red"} onClick={(e) => handleLogout(e)}>Logout</button>
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