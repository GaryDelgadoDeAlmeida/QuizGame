import axios from "axios";
import React, { useState } from "react";
import Notification from "../parts/Notification";

export default function ContactForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: ""
    })

    const resetContactFields = () => {
        setCredentials({
            firstname: "",
            lastname: "",
            email: "",
            message: ""
        })
    }

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials, 
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/contact`, credentials, {
                headers: {
                    "Accept": "application/json+ld",
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                setFormResponse({classname: "success", message: "Thanks for your message ! We'll answer you as quickly as possible."})
                resetContactFields()
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later."
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
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
                    <input 
                        id={"firstname"} 
                        type={"text"} 
                        maxLength={255} 
                        placeholder={"Firstname"} 
                        value={credentials.firstname} 
                        onChange={(e) => handleChange(e, "firstname")} 
                        required 
                    />
                </div>
                
                <div className={"form-field"}>
                    <input 
                        id={"lastname"} 
                        type={"text"} 
                        maxLength={255} 
                        placeholder={"Lastname"} 
                        value={credentials.lastname}
                        onChange={(e) => handleChange(e, "lastname")} 
                        required 
                    />
                </div>
            </div>
            
            <div className={"form-field"}>
                <input 
                    id={"email"} 
                    type={"email"} 
                    maxLength={255} 
                    placeholder={"Email"} 
                    value={credentials.email}
                    onChange={(e) => handleChange(e, "email")} 
                    required 
                />
            </div>
            
            <div className={"form-field"}>
                <textarea
                    id={"message"} 
                    className={"h-150px"} 
                    placeholder={"Your message"} 
                    value={credentials.message}
                    onChange={(e) => handleChange(e, "message")} 
                    required
                ></textarea>
            </div>
            
            <div className={"form-button force-txt-center"}>
                <button type={"submit"} className={"btn btn-palette-four btn-rounded btn-space w-150px"}>Submit</button>
            </div>
        </form>
    )
}