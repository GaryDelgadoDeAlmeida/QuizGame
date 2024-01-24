import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"header-menu"}>
                    <Link className={"logo"} to={"/"}>
                        {/* <img src={`${window.location.origin}/content/img/logo.png`} alt={"QUIZ LOGO"} /> */}
                        QUIZ LOGO
                    </Link>
                    <nav className={"menu"}>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><a href="/#service">Service</a></li>
                        <li><a href="/#best-scores">Scores</a></li>
                        <li><a href="/#contact">Contact</a></li>
                        <li><Link to={"/login"}>Login</Link></li>
                    </nav>
                </div>
                
                <div className={"header-mobile-menu"}>
                    <input id={"menuField"} type={"checkbox"} hidden />
                    <label className={"labelBars"} htmlFor={"menuField"}>
                        <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                    </label>
                    <div className={"mobile-menu"}>
                        <div className={"mobile-menu-widget"}>
                            <label className={"labelBars"} htmlFor={"menuField"}>
                                <img src={`${window.location.origin}/content/svg/bars-white.svg`} alt={""} />
                            </label>
                            <nav className={"vertical-menu"}>
                                <li><Link to={"/"}>Home</Link></li>
                                <li><a href="/#service">Service</a></li>
                                <li><a href="/#best-scores">Scores</a></li>
                                <li><a href="/#contact">Contact</a></li>
                                <li><Link to={"/login"}>Login</Link></li>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={"page-content"}>
                {props.children}
            </div>
            
            <div className={"page-footer"}>
                <div className={"footer-links"}>

                    {/* Col 1 */}
                    <div className={"links-group"}>
                        <div className={"-header"}>
                            <label className={"-title"}>About</label>
                        </div>
                        <div className={"-content"}>
                            <Link className={"-link"} to={"/download-app"}>Download app</Link>
                            <div className={"social-links"}>
                                <a className={"-social-link"} href={"#"} target={"_blank"}>
                                    <img src={`${window.location.origin}/content/svg/facebook-white.svg`} alt={""} />
                                </a>
                                <a className={"-social-link"} href={"#"} target={"_blank"}>
                                    <img src={`${window.location.origin}/content/svg/instagram-white.svg`} alt={""} />
                                </a>
                                <a className={"-social-link"} href={"#"} target={"_blank"}>
                                    <img src={`${window.location.origin}/content/svg/twitter-white.svg`} alt={""} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className={"links-group"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Quick links</label>
                        </div>
                        <div className={"-content"}>
                            <Link className={"-link"} to={"/"}>Home</Link>
                            <a className={"-link"} href="/#about">About</a>
                            <a className={"-link"} href="/#contact">Contact</a>
                            <Link className={"-link"} to={"/login"}>Login</Link>
                        </div>
                    </div>

                    {/* Col 3 */}
                    <div className={"links-group"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Help</label>
                        </div>
                        <div className={"-content"}>
                            <Link className={"-link"} to={"/help"}>Help</Link>
                            <Link className={"-link"} to={"/terms-and-agreements"}>Terms & Agreements</Link>
                            <Link className={"-link"} to={"/policy"}>Policy</Link>
                        </div>
                    </div>
                </div>
                <div className={"footer-copyright"}>
                    <p>&copy; Copyright {(new Date()).toLocaleDateString("en-US", {year: 'numeric'})} &minus; Quiz Game</p>
                </div>
            </div>
        </div>
    )
}