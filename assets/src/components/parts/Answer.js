import React from "react";

export default function Answer({credentialsQuestion, givenAnswer, answer, isAnswer, handleAnswer}) {

    let keys = Object.keys(credentialsQuestion)

    return (
        <span 
            className={`-answer ${answer == givenAnswer ? "-active" : ""} ${keys.length > 0 && isAnswer ? "-is-answer" : ""} ${credentialsQuestion.given_answer == answer && !isAnswer ? "-incorrect" : ""}`} 
            onClick={(e) => handleAnswer(e)}
        >{answer}</span>
    )
}