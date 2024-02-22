import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { findParent } from "../../components/utils/DomControl";
import axios from "axios";
import Pagination from "../../components/parts/Pagination";
import SearchQuestionForm from "../../components/forms/SearchQuestionForm";

export default function Quiz() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [offset, setOffset] = useState(1)
    const { loading, items: questions, load, error } = PrivateRessource(`${window.location.origin}/api/questions?offset=${offset}&search=${search}`)

    useEffect(() => {
        load()

        return () => {}
    }, [offset])

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
            .delete(`${window.location.origin}/api/question/${questionID}/remove`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token
                }
            })
            .then((response) => {
                questionItem.remove()
            })
            .catch((error) => {
                if(error.status == 401) {
                    navigate("/admin-login")
                    return
                }

                let errorMessage = "An error has been encountered. Please, retry later"
                if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                } else if(error.response.data.message) {
                    errorMessage = error.response.data.message
                }
                
                alert(errorMessage)
            })
        ;
    }

    const handleSearchFormChange = (value) => {
        setSearch(value)
        setOffset(1)
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/quiz/create"}>Add a question</Link>

            <div className={"mt-25"}>
                <SearchQuestionForm setSearch={handleSearchFormChange} />
            </div>

            <div className={"mt-25"}>
                {!loading ? (
                    <>
                        <table className={"table -palette-one"}>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Difficulty</th>
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
                                            <td className={"-difficulty"}>{itemQuestion.difficulty}</td>
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

                        <Pagination 
                            offset={offset} 
                            maxOffset={questions.maxOffset} 
                            setOffset={setOffset}
                        />
                    </>
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderAdmin>
    )
}