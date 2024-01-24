import React, { useRef, useState } from "react";
import axios from "axios";
import Notification from "../parts/Notification";
import { Link } from "react-router-dom";

export default function RegisterForm() {

    const [formResponse, setFormResponse] = useState({})
    let credentials = useRef({
        firstname: "",
        lastname: "",
        birth_date: "",
        email: "",
        password: "",
        confirm_password: "",
        agreement: false
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
            .post(`${window.location.origin}/api/register`, credentials.current, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then((response) => {
                console.log(
                    response,
                    response.data,
                )
            })
            .catch((error) => {
                console.log(
                    error,
                    error.response,
                    error.response.data
                )
            })
        ;
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            
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
                <input id={"birthDate"} type={"date"} placeholder={"Your birth date"} onChange={(e) => handleChange(e, "birth_date")} required />
                <small>Your birth date will only be used to dispatch player score in corresponding leagues age</small>
            </div>
            
            <div className={"form-field"}>
                <input id={"email"} type={"email"} maxLength={255} placeholder={"Your email"} onChange={(e) => handleChange(e, "email")} required />
            </div>
            
            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <input id={"password"} type={"password"} placeholder={"Your password"} minLength={8} maxLength={255} onChange={(e) => handleChange(e, "password")} required />
                </div>
                <div className={"form-field"}>
                    <input id={"confirmPassword"} type={"password"} placeholder={"Confirm your password"} minLength={8} maxLength={255} onChange={(e) => handleChange(e, "confirm_password")} required />
                </div>
            </div>
            
            <div className={"form-field"}>
                <label>
                    <input type={"checkbox"} onChange={(e) => handleChange(e, "agreements")} required />
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
    )
}