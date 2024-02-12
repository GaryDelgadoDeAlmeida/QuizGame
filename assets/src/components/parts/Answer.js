import React from "react";

export default function Answer({credentialsQuestion, givenAnswer, answer, isAnswer, handleAnswer}) {

    let keys = Object.keys(credentialsQuestion)
    if(givenAnswer != "" || keys.length > 0) {
        console.log(
            answer,
            givenAnswer,
            answer == givenAnswer ? "-active" : "",
            keys.length,
            isAnswer,
            keys,
            credentialsQuestion,
            credentialsQuestion.given_answer == givenAnswer && isAnswer ? "-correct" : "-incorrect",
            keys.length > 0 && givenAnswer != "" ? (credentialsQuestion.given_answer == givenAnswer && isAnswer ? "-correct" : "-incorrect") : ""
        )
    }

    return (
        <span 
            className={`-answer ${answer == givenAnswer ? "-active" : ""} ${keys.length > 0 && isAnswer ? "-is-answer" : ""} ${credentialsQuestion.given_answer == answer && !isAnswer ? "-incorrect" : ""}`} 
            onClick={(e) => handleAnswer(e)}
        >{answer}</span>
    )
}