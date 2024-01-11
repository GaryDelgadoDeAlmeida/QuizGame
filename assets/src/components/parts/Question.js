import React from "react";

export default function Question({question, answers, answer}) {

    const handleClick = (e) => {
        e.preventDefault()
    }

    return (
        <div className={"quiz-question"}>
            <div className={"-header"}>
                <label>{question}</label>
            </div>
            <div className={"-content"}>
                {answers.map((item, index) => (
                    <div key={index} className={"-choice"} onClick={(e) => handleClick(e)}>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}