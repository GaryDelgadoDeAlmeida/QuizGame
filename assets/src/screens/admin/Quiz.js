import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import axios from "axios";

export default function Quiz() {

    const [offset, setOffset] = useState(1)
    const { loading, items: questions, load, error } = PrivateRessource(`${window.location.origin}/api/questions?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])
    
    const handlePagination = (e) => {
        setOffset(parseInt(e.target.innerHTML))
    }

    const handleRemove = (e) => {
        const questionItem = findParent(e.currentTarget, "questionItem")
        if(!questionItem) {
            alert("")
            return
        }

        const questionID = e.currentTarget.getAttribute("data-questionid")
        if(isNaN(questionID)) {
            alert("An error has been encountered with the question identifier")
            return
        }

        axios
            .delete(`${window.location.origin}/api/question/${questionID}/remove`)
            .then((response) => {
                // 
            })
            .catch((error) => {})
        ;
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/quiz/create"}>Add a question</Link>

            <div className={"mt-25"}>
                {!loading ? (
                    <>
                        <table className={"table -palette-one"}>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Category</th>
                                    <th>Answers</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(questions.results ?? []).length > 0 ? (
                                    Object.values(questions.results).map((itemQuestion, index) => (
                                        <tr className={"questionItem"} key={index}>
                                            <td className={"-question"}>{itemQuestion.question}</td>
                                            <td className={"-category"}>{itemQuestion.category.label}</td>
                                            <td className={"-answers txt-left"}>
                                                {itemQuestion.answers.map((questionChoice, answerIndex) => (
                                                    <li key={answerIndex} data-answerid={questionChoice.id}>
                                                        {questionChoice.answer} {questionChoice.isAnswer ? "(Correct answer)" : null}
                                                    </li>
                                                ))}
                                            </td>
                                            <td className={"-actions"}>
                                                <Link 
                                                    className={"btn btn-orange -inline-flex"} 
                                                    to={"/admin/quiz/" + itemQuestion.id}
                                                >
                                                    <img src={`${window.location.origin}/content/svg/pencil-white.svg`} alt={"edit"} />
                                                </Link>
                                                
                                                <button 
                                                    className={"btn btn-red -inline-flex"} 
                                                    data-questionid={itemQuestion.id}
                                                    onClick={(e) => handleRemove(e)}
                                                >
                                                    <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={"trash"} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className={"-message"} colSpan={4}>There is no question registered</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {offset > 0 && offset <= questions.maxOffset && questions.maxOffset > 1 && (
                            <div className={"pagination"}>
                                {offset - 1 > 0 && (
                                    <button className={"item"} onClick={(e) => handlePagination(e)}>{offset - 1}</button>
                                )}
                                
                                <button className={"item current-page"}>{offset}</button>
                                
                                {offset + 1 <= questions.maxOffset && (
                                    <button className={"item"} onClick={(e) => handlePagination(e)}>{offset + 1}</button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderAdmin>
    )
}