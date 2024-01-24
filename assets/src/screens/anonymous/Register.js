import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { Link } from "react-router-dom";

export default function Register() {

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
                                    <label>Register</label>
                                </div>
                                <div className={"-content"}>
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}