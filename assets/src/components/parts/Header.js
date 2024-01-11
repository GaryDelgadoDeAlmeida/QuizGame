import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"header-menu"}>
                    <Link className={"logo"} to={"/"}>
                        <img src={`${window.location.origin}/content/img/logo.png`} alt={"QUIZ LOGO"} />
                    </Link>
                    <nav className={"menu"}>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><a href="/#about">About</a></li>
                        <li><a href="/#best-scores">Best scores</a></li>
                        <li><a href="/#contact">Contact</a></li>
                        <li><Link to={"/login"}>Login</Link></li>
                    </nav>
                </div>
                
                <div className={"header-mobile-menu"} hidden>
                    <input id={"menuField"} type={"checkbox"} hidden />
                    <label className={"d-flex"} htmlFor={"menuField"}>
                        <img src={`${window.location.origin}/content/svg/menu.svg`} alt={""} />
                    </label>
                    <div className={"mobile-menu"}>
                        <label className={"d-flex"} htmlFor={"menuField"}>
                            <img src={`${window.location.origin}/content/svg/close.svg`} alt={""} />
                        </label>
                        <nav className={"vertical-menu"}>
                            <li><Link to={"/"}>Home</Link></li>
                            <li><a href="/#about">About</a></li>
                            <li><a href="/#best-scores">Best scores</a></li>
                            <li><a href="/#contact">Contact</a></li>
                            <li><Link to={"/login"}>Login</Link></li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className={"page-content -anonymous"}>
                {props.children}
            </div>
            <div className={"page-footer"}>
                <div className={"footer-wrapper"}>
                    <div className={"footer-links"}>
                        <div className={"links-group"}>
                            <div className={"-header"}>
                                <img src={`${window.location.origin}/content/img/logo.png`} alt={"QUIZ LOGO"} />
                            </div>
                            <div className={"-content"}>
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
                        <div className={"links-group"}>
                            <div className={"-header"}>
                                <label className={"-title"}>Quick links</label>
                            </div>
                            <div className={"-content"}>
                                <a className={"-link"} href="/#about">About</a>
                                <a className={"-link"} href="/#contact">Contact</a>
                                <Link className={"-link"} to={"/login"}>Login</Link>
                            </div>
                        </div>
                        <div className={"links-group"}>
                            <div className={"-header"}>
                                <label className={"-title"}>Use condition</label>
                            </div>
                            <div className={"-content"}>
                                <Link className={"-link"} to={"/agreements"}>Agreements</Link>
                                <Link className={"-link"} to={"/legal-metions"}>Legal mentions</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"footer-copyright"}>
                        <p>Copyright &copy; {(new Date()).toLocaleDateString("en-US", {year: 'numeric'})} &minus; Quiz Game</p>
                    </div>
                </div>
            </div>
        </div>
    )
}