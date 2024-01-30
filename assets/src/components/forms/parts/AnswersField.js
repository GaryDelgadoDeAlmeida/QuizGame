import React, { useEffect, useState } from "react";
import { generateCheckboxField, generateFormField, generateFormFieldInline, generateInput } from "../../utils/GenerateDomElement";
import { findParent } from "../../utils/DomControl";

export default function AnswersField({answerRowID, answers, updateCredentials}) {

    const [count, setCount] = useState(answers ? answers.length : 1)
    const [credentialAnswers, setCredentialAnswers] = useState(answers ?? [])

    const handleNewRow = (e) => {
        setCredentialAnswers({
            ...credentialAnswers,
            [count]: {
                rowID: count,
                answer: "",
                is_answer: false
            }
        })
        setCount(count + 1)
    }

    const handleChangeAnswers = (e, fieldName) => {
        let parent = findParent(e.currentTarget, "form-field-inline")
        let row = parent.id.substring(answerRowID.length)

        setCredentialAnswers({
            ...credentialAnswers,
            [row]: {
                ...credentialAnswers[row],
                [fieldName]: fieldName == "is_answer" 
                    ? e.currentTarget.checked 
                    : e.currentTarget.value
            }
        })
    }

    const handleRemoveRow = (e) => {
        let parent = findParent(e.currentTarget, "form-field-inline")
        let row = parent.id.substring(answerRowID.length)

        let answers = {...credentialAnswers}
        delete answers[row]

        setCredentialAnswers({
            ...answers
        })
    }

    const updateParentAnswers = () => {
        updateCredentials("answers", credentialAnswers)
    }

    useEffect(() => {
        updateParentAnswers()
    }, [credentialAnswers])

    return (
        <div className={"form-field"}>
            <label htmlFor={"answers"}>Answers</label>
            
            <div id={"answers"}>
                {Object.values(credentialAnswers).map((item, index) => (
                    <div key={index} id={`${answerRowID}${item.rowID}`} className={"form-field-inline"}>
                        <div className={"form-field"}>
                            <input 
                                type={"text"} 
                                value={item.answer} 
                                onChange={(e) => handleChangeAnswers(e, "answer")} 
                            />
                        </div>
                        <div className={"form-field"}>
                            <label>
                                <input 
                                    type={"checkbox"} 
                                    onChange={(e) => handleChangeAnswers(e, "is_answer")} 
                                    checked={item.is_answer} 
                                />
                                <span>Is answer</span>
                            </label>
                        </div>
                        <div className={"form-button force-txt-center m-tb-auto"}>
                            <button type={"button"} className={"btn btn-red"} onClick={(e) => handleRemoveRow(e)}>&minus;</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className={"form-button force-txt-left m-tb-auto"}>
                <button type={"button"} className={"btn btn-blue -inline-flex"} onClick={(e) => handleNewRow(e)}>
                    <img src={`${window.location.origin}/content/svg/plus-white.svg`} alt={""} />
                </button>
            </div>
        </div>
    )
}