import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findParent } from "../utils/DomControl";
import Notification from "../parts/Notification";
import AnswersField from "./parts/AnswersField";
import CategoriesField from "./parts/CategoriesField";
import axios from "axios";
import DifficultyField from "./parts/DifficultyField";

export default function QuestionForm({question = null}) {

    const navigate = useNavigate()
    const answerRowID = "answer-row-"
    const user = JSON.parse(localStorage.getItem("user"))
    const [formResponse, setFormResponse] = useState("")
    const [credentials, setCredentials] = useState(question ?? {
        question: "",
        difficulty: "",
        multiple_answer: false,
        category: [],
        answers: []
    })

    const updateCredentials = (fieldName, value) => {
        setCredentials({
            ...credentials,
            [fieldName]: value
        })
    }

    const handleChange = (e, fieldName) => {
        setCredentials({
            ...credentials,
            [fieldName]: e.currentTarget.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(credentials)
        return

        axios
            .post(`${window.location.origin}/api/question`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                console.log(
                    response,
                    response.data
                )
            })
            .catch((error) => {
                if(error.status == 401) {
                    navigate(user.role == "ROLE_ADMIN" ? "/admin-login" : "/login")
                    return
                }

                let errorMessage = "An error has been encountered"
                if(error.response.data) {
                    errorMessage = error.response.data.message
                }

                setFormResponse({classname: "danger", message: errorMessage})
            })
    }

    return (
        <form className={"form"} onSubmit={(e) => handleSubmit(e)}>
            
            {Object.keys(formResponse).length > 0 && (
                <Notification {...formResponse} />
            )}

            <CategoriesField handleChange={handleChange} />
            
            <DifficultyField difficulty={credentials.difficulty} handleChange={handleChange} />
            
            <div className={"form-field"}>
                <input 
                    type={"text"} 
                    placeholder={"Question"} 
                    maxLength={255} 
                    onChange={(e) => handleChange(e, "question")} 
                    required 
                />
            </div>

            <div className={"form-field"}>
                <label>
                    <input type={"checkbox"} onChange={(e) => handleChange(e, "mulitple_answer")} />
                    <span>Allow muliple answer</span>
                </label>
            </div>
            
            <AnswersField answerRowID={answerRowID} updateCredentials={updateCredentials} />
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}