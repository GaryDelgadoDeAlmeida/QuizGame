import axios from "axios";
import React, { useRef, useState } from "react";

export default function ContactForm() {

    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        firstname: "",
        lastname: "",
        email: "",
        message: ""
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
            .post(`${window.location.origin}/api/contact`, credentials.current, {
                headers: {
                    "Accept": "application/json+ld",
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {})
            .catch((error) => {
                let errorMessage = "An error has been encountered."
                if(error.response.data) {
                    errorMessage = error.response.data
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <form className={"form form-contact"} onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <input id={"firstname"} type={"text"} maxLength={255} placeholder={"Firstname"} onChange={(e) => handleChange(e, "firstname")} required />
                </div>
                
                <div className={"form-field"}>
                    <input id={"lastname"} type={"text"} maxLength={255} placeholder={"Lastname"} onChange={(e) => handleChange(e, "lastname")} required />
                </div>
            </div>
            
            <div className={"form-field"}>
                <input id={"email"} type={"email"} maxLength={255} placeholder={"Email"} onChange={(e) => handleChange(e, "email")} required />
            </div>
            
            <div className={"form-field"}>
                <textarea id={"message"} className={"h-150px"} placeholder={"Your message"} onChange={(e) => handleChange(e, "message")} required></textarea>
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}