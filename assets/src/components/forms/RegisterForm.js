import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DomControl";
import Notification from "../parts/Notification";
import axios from "axios";

export default function RegisterForm() {

    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        birth_date: "",
        email: "",
        password: "",
        confirm_password: "",
        agreement: false
    })

    const handleChange = (e, fieldName) => {
        let fieldValue = e.target.value
        if(fieldName == "agreements") {
            fieldValue = e.target.checked
        }

        setCredentials({
            ...credentials,
            [fieldName]: fieldValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post(`${window.location.origin}/api/user`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": ""
                }
            })
            .then((response) => {
                console.log(
                    response,
                    response.data,
                )
                setFormResponse({classname: "success", message: "Your account has been successfully created"})
            })
            .catch((error) => {
                console.log(error.response.data)

                let errorMessage = "An error has been encountered"
                if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                } else if(error.response.data.message) {
                    errorMessage = error.response.data.message
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}
            
            <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
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
                        id={"birthDate"} 
                        type={"date"} 
                        placeholder={"Your birth date"} 
                        value={credentials.birth_date ? formatDate(credentials.birth_date) : ""}
                        onChange={(e) => handleChange(e, "birth_date")} 
                        required 
                    />
                    <small>Your birth date will only be used to dispatch player score in corresponding leagues age</small>
                </div>
                
                <div className={"form-field"}>
                    <input 
                        id={"email"} 
                        type={"email"} 
                        maxLength={255} 
                        placeholder={"Your email"} 
                        value={credentials.email}
                        onChange={(e) => handleChange(e, "email")} 
                        required 
                    />
                </div>
                
                <div className={"form-field-inline"}>
                    <div className={"form-field"}>
                        <input 
                            id={"password"} 
                            type={"password"} 
                            placeholder={"Your password"} 
                            minLength={8} 
                            maxLength={255} 
                            value={credentials.password}
                            onChange={(e) => handleChange(e, "password")} 
                            required 
                        />
                    </div>
                    <div className={"form-field"}>
                        <input 
                            id={"confirmPassword"} 
                            type={"password"} 
                            placeholder={"Confirm your password"} 
                            minLength={8} 
                            maxLength={255} 
                            value={credentials.confirm_password}
                            onChange={(e) => handleChange(e, "confirm_password")} 
                            required 
                        />
                    </div>
                </div>
                
                <div className={"form-field"}>
                    <label>
                        <input 
                            type={"checkbox"} 
                            onChange={(e) => handleChange(e, "agreements")} 
                            value={credentials.agreement}
                            required 
                        />
                        <span>I agree with the conditional terms of use</span>
                    </label>
                </div>

                <div className={"form-information"}>
                    <p>Vous avez déjà un compte ? <Link to={"/login"}>Connectez-vous ici</Link></p>
                </div>
                
                <div className={"form-button"}>
                    <button className={"btn btn-palette-four btn-space w-100px"}>Submit</button>
                </div>
            </form>
        </>
    )
}