import React, { useState } from "react";

export default function HistoryFilterForm({updateParentCredentials}) {

    const [credentials, setCredentials] = useState({
        date: "",
    })

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"form-field"}></div>
            <div className={"form-button"}></div>
        </form>
    )
}