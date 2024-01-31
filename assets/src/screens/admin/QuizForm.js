import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import QuestionForm from "../../components/forms/QuestionForm";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function QuizForm() {
    const { quizID } = useParams()
    if(isNaN(quizID)) {
        return <Navigate to={"/admin/quiz"} />
    }

    const { load, items: question, loading, error } = PrivateRessource(`${window.location.origin}/api/question/${quizID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/quiz"}>Return</Link>

            <div className={"mt-25"}>
                {!loading && Object.keys(question).length > 0 ? (
                    <div className={"card"}>
                        <div className={"-header"}></div>
                        <div className={"-content"}>
                            <QuestionForm question={question} />
                        </div>
                    </div>
                ) : (
                    <Notification classname={"information"} message={"Loading . . ."} />
                )}
            </div>
        </HeaderAdmin>
    )
}