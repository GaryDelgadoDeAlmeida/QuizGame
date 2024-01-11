import React, { useRef, useState } from "react";
import Notification from "../parts/Notification";

export default function UserForm({user = null}) {
    const [formResponse, setFormResponse] = useState({})
    const credentials = useRef({
        lastname: user != null ? user.lastname : "",
        firstname: user != null ? user.firstname : "",
        username: user != null ? user.email : "",
        phone: user != null ? user.phone : ""
    })

    const handleChange = (e, fieldName) => {
        credentials.current = {
            ...credentials.current,
            [fieldName]: e.target.value
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field"}>
                <input type={"text"} placeholder={"Username"} onChange={(e) => handleChange(e, "username")} />
            </div>
            
            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <input type={"password"} placeholder={"Password"} onChange={(e) => handleChange(e, "password")} />
                </div>
                
                <div className={"form-field"}>
                    <input type={"password"} placeholder={"Confirm your password"} onChange={(e) => handleChange(e, "confirm_password")} />
                </div>
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}