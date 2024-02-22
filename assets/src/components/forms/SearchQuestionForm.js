import React, { useState } from "react";

export default function SearchQuestionForm({setSearch}) {

    const [credentials, setCredentials] = useState({
        search: ""
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            search: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(credentials.search)
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit('')}>
            <div className={"form-field-inline -force-g-0"}>
                <div className={"form-field"}>
                    <input 
                        type={"text"} 
                        placeholder={"Search a question"} 
                        value={credentials.search} 
                        onChange={(e) => handleChange(e)} 
                        required={false}
                    />
                </div>
                
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}