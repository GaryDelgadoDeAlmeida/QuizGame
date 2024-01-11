import React, { useEffect, useRef, useState } from "react";
import PrivateRessource from "../utils/PrivateRessource";
import { findParent } from "../utils/DomControl";

export default function QuestionForm({question = null}) {

    const [formResponse, setFormResponse] = useState("")
    let credentials = useRef({
        id: question ? question.id : null,
        question: question ? question.label : "",
        category: question ? question.category : "",
        answers: question ? {...question.answers} : {},
        difficulty: question ? question.difficulty : ""
    })

    const { loading, items: categories, load, error } = PrivateRessource(`${window.location.origin}/api/categories`)
    useEffect(() => {
        load()
    }, [])

    const handleNewRow = (e) => {
        let content = `
            <div className={"form-field-inline"}>
                <div className={"form-field"}>
                    <input type={"text"} maxLength={255} />
                </div>
                <div className={"form-field"}>
                    <label>
                        <input type={"checkbox"} />
                        <span>Answer</span>
                    </label>
                </div>
            </div>
        `

        let parent = findParent(e.currentTarget, "form-field")
        let answersDiv = parent.find("#answers")
    }

    const handleRemoveRow = (e) => {}

    const handleChange = (e, fieldName) => {}

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className={"form"} onClick={(e) => handleSubmit(e)}>
            <div className={"form-field"}>
                <input type={"text"} placeholder={"Question"} maxLength={255} onChange={(e) => handleChange(e, "question")} required />
            </div>
            
            <div className={"form-field"}>
                {!loading && (
                    <select onChange={(e) => handleChange(e, "category")} required>
                        <option value={""}>Select a category</option>
                        {Object.values(categories).map((category, index) => (
                            <option value={category.labelKey}>{category.label}</option>
                        ))}
                    </select>
                )}
            </div>
            
            <div className={"form-field"}>
                <select onChange={(e) => handleChange(e, "difficulty")} required>
                    <option value={""}>Select a difficulty</option>
                    <option value={"easy"}>Easy</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"hard"}>Hard</option>
                </select>
            </div>
            
            <div className={"form-field"}>
                <label htmlFor={"answers"}>Answers</label>
                
                <div id={"anwsers"}></div>
                
                <div className={""}>
                    <button type={"button"} className={"btn btn-blue -inline-flex"}>
                        <img src={`${window.location.origin}/content/svg/plus-white.svg`} alt={""} />
                    </button>
                </div>
            </div>
            
            <div className={"form-button"}>
                <button type={"submit"} className={"btn btn-blue"}>Submit</button>
            </div>
        </form>
    )
}