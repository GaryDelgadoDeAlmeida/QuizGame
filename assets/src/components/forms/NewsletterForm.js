import React, { useState } from "react";

export default function NewsletterForm() {

    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input type={"email"} placeholder={"Your email"} maxLength={255} onChange={(e) => handleChange(e)} required />
            </div>
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-palette-four btn-rounded w-150px"}>Register</button>
            </div>
        </form>
    )
}