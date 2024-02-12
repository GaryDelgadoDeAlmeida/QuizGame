import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderUser from "../../components/parts/HeaderUser";
import Notification from "../../components/parts/Notification";
import PrivateResources from "../../components/utils/PrivateRessource";
import Answer from "../../components/parts/Answer";
import axios from "axios";
import FinalScore from "../../components/parts/FinalScore";

export default function GameStart({category, nbrQuestions}) {

    const storageUser = localStorage.getItem("user")
    const user = JSON.parse(storageUser ?? [])
    
    const [offset, setOffset] = useState(0)
    const [credentials, setCredentials] = useState({
        score: 0,
        good_answers: 0,
        bad_answers: 0,
        questions: []
    })
    const [answer, setAnswer] = useState("")
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/game/questions?category=${category}&nbr_questions=${nbrQuestions}`)
    
    useEffect(() => {
        load()
    }, [])

    // useEffect(() => {
    //     // If there is no more question then if the end of the game
    //     if(!items.results[offset]) {
    //         handleEndGame()
    //     }
    // }, [offset])

    const handleAnswer = (e) => {
        if(Object.keys(credentials[offset] ?? []).length > 0) {
            return
        }

        setAnswer(e.target.innerText)
    }

    const handleSubmit = (e) => {
        let current_score = credentials.score
        let bad_answers = credentials.bad_answers
        let good_answers = credentials.good_answers
        let currentAnswer = items.results[offset].answers.filter((item) => answer == item.answer)[0]

        if(currentAnswer.isAnswer) {
            good_answers++
            current_score++
        } else {
            bad_answers++
        }

        setCredentials({
            ...credentials,
            score: current_score,
            bad_answers: bad_answers,
            good_answers: good_answers,
            questions: {
                ...credentials.questions,
                [offset]: {
                    given_answer: answer,
                    question_id: e.target.getAttribute("data-questionid")
                }
            }
        })

        setAnswer("")
    }

    const handleNextQuestion = (e) => {
        setAnswer("")
        setOffset(offset + 1)
    }

    console.log(items.results)

    const handleEndGame = () => {
        axios
            .post(`${window.location.origin}/api/game`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/ld+json",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {})
            .catch((error) => {})
        ;
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <Link className={"btn btn-palette-four"} to={"/user/game"}>Return</Link>

                <div className={"mt-25"}>
                    {!loading && Object.keys(items.results ?? []).length > 0 ? (
                        items.results[offset] ? (
                            <div className={"question-section"}>
                                <div className={"question-wrapper"}>
                                    <div className={"question"}>
                                        <p>{items.results[offset].question}</p>
                                    </div>
                                    <div className={"answers"}>
                                        {items.results[offset].answers.map((item, index) => (
                                            <Answer 
                                                key={index}
                                                credentialsQuestion={credentials.questions[offset] ?? []}
                                                givenAnswer={answer}
                                                answer={item.answer}
                                                isAnswer={item.isAnswer}
                                                handleAnswer={handleAnswer}
                                            />
                                        ))}
                                    </div>
                                    <div className={"question-submit"}>
                                        <button 
                                            type={"button"} 
                                            className={"btn btn-palette-four"} 
                                            onClick={(e) => handleSubmit(e)}
                                            data-questionid={items.results[offset].id}
                                            disabled={answer != "" ? false : true}
                                        >Submit</button>

                                        {Object.keys(credentials.questions[offset] ?? []).length > 0 && (
                                            <button
                                                type={"button"}
                                                className={"btn btn-palette-four"} 
                                                onClick={(e) => handleNextQuestion(e)}
                                            >
                                                {items.results[offset + 1] == undefined ? "Fin" : "Next"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <FinalScore credentials={credentials} />
                        )
                    ) : (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}
                </div>
            </div>
        </HeaderUser>
    )
}