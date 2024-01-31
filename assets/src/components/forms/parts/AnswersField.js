import React, { useEffect, useRef, useState } from "react";
import { generateCheckboxField, generateFormField, generateFormFieldInline, generateInput } from "../../utils/GenerateDomElement";
import { findParent } from "../../utils/DomControl";

export default function AnswersField({answerRowID, answers, updateCredentials}) {

    const [credentialAnswers, setCredentialAnswers] = useState(answers ?? [])
    let keys = Object.keys(credentialAnswers)

    useEffect(() => {
        updateParentAnswers()
    }, [credentialAnswers])

    const handleNewRow = () => {
        let $max = 0
        keys.map((item) => {
            if($max < parseInt(item)) {
                $max = parseInt(item)
            }
        })
        $max += 1
        
        setCredentialAnswers({
            ...credentialAnswers,
            [$max]: {
                rowID: $max,
                answer: "",
                isAnswer: false
            }
        })
    }

    const handleChangeAnswers = (e, fieldName) => {
        let parent = findParent(e.currentTarget, "form-field-inline")
        let row = parent.id.substring(answerRowID.length)

        setCredentialAnswers({
            ...credentialAnswers,
            [row]: {
                ...credentialAnswers[row],
                [fieldName]: fieldName == "isAnswer" 
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
    return (
        <div className={"form-field"}>
            <label htmlFor={"answers"}>Answers</label>
            
            <div id={"answers"}>
                {Object.values(credentialAnswers).map((item, index) => (
                    <div key={index} id={`${answerRowID}${keys[index]}`} className={"form-field-inline"}>
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
                                    onChange={(e) => handleChangeAnswers(e, "isAnswer")} 
                                    checked={item.isAnswer} 
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
                <button type={"button"} className={"btn btn-blue -inline-flex"} onClick={handleNewRow}>
                    <img src={`${window.location.origin}/content/svg/plus-white.svg`} alt={""} />
                </button>
            </div>
        </div>
    )
}