import axios from "axios";
import React, { useRef, useState } from "react";
import Notification from "../parts/Notification";
import { Link, Navigate } from "react-router-dom";

export default function LoginForm({adminConnect = false}) {

    const [logged, setLogged] = useState(false)
    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        email: "",
        passowrd: ""
    })

    const handleChange = (e, fieldName) => {
        credentials.current = {
            ...credentials.current,
            [fieldName]: e.target.value
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/login_check`, credentials.current, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld"
                }
            })
            .then((response) => {
                localStorage.setItem("user", JSON.stringify({
                    time: Date.now(),
                    role: adminConnect ? "ROLE_ADMIN" : "ROLE_USER",
                    token: response.data.token
                }))
                setLogged(true)
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered"
                if(error.response.data) {
                    errorMessage = error.response.data
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {logged && (
                <Navigate to={adminConnect ? "/admin" : "/user"} />
            )}

            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
                {Object.keys(formResponse).length > 0 && (
                    <Notification {...formResponse} />
                )}
                <div className={"form-field"}>
                    <label htmlFor={"email"}>Username</label>
                    <input id={"email"} type={"email"} placeholder={"Your email"} onChange={(e) => handleChange(e, "email")} required />
                </div>
                <div className={"form-field"}>
                    <label htmlFor={"password"}>Password</label>
                    <input id={"password"} type={"password"} placeholder={"Your Password"} onChange={(e) => handleChange(e, "password")} required />
                </div>
                
                {!adminConnect && (
                    <div className={"form-information"}>
                        <p>Vous n'avez de pas ? Crééez-en un <Link to={"/register"}>ici</Link></p>
                    </div>
                )}

                <div className={"form-button"}>
                    <button type={"submit"} className={"btn btn-palette-four btn-space w-100px"}>Submit</button>
                </div>
            </form>
        </>
    )
}