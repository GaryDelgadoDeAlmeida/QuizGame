import React, { useRef, useState } from "react";
import Notification from "../parts/Notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryForm({category = null}) {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [formResponse, setFormResponse] = useState({})
    const [credentials, setCredentials] = useState(category ?? {
        label: "",
        labelKey: ""
    })

    const handleChange = (e, fieldName) => {
        console.log(fieldName, e.target.value)
        
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let url = category 
            ? `${window.location.origin}/api/category/${category.id}/update`
            : `${window.location.origin}/api/category`
        ;

        axios
            .post(url, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                let successMessage = `The category '${credentials.label}' has been successfully created`
                if(category) {
                    successMessage = `The category '${category.label}' has been successfully updated`
                }

                setFormResponse({classname: "success", message: successMessage})
            })
            .catch((error) => {
                if(error.status == 401) {
                    navigate("/admin-login")
                    return
                }

                let errorMessage = "An error has been encountered"
                if(error.response.data) {
                    console.log(error.response.data)
                    errorMessage = error.response.data.message
                }
                setFormResponse({classname: "danger", message: errorMessage})
            })
        ;
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <div className={"form-field"}>
                <label htmlFor={"category"}>Category</label>
                <input id={"category"} type={"text"} maxLength={255} value={credentials.label} onChange={(e) => handleChange(e, "label")} required />
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"category_key"}>Category key</label>
                <input id={"category_key"} type={"text"} maxLength={255} value={credentials.labelKey} onChange={(e) => handleChange(e, "labelKey")} required />
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-radient-four"}>Submit</button>
            </div>
        </form>
    )
}