import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";

export default function Login({admin = false}) {

    return (
        <div className={"page"}>
            <div className={"page-content p-0"}>
                <div className={"page-login"}>
                    <div className={"-left"}></div>
                    <div className={"-right"}>
                        <div className={"page-login-widget"}>
                            <Link className={"btn btn-palette-four"} to={"/"}>Return</Link>
                            
                            <div className={"card mt-25"}>
                                <div className={"-header"}>
                                    <label>Login</label>
                                </div>
                                <div className={"-content"}>
                                    <LoginForm adminConnect={admin}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}