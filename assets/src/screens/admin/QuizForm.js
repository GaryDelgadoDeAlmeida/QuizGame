import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
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
            {!loading ? (
                <div className={"card"}>
                    <div className={"-content"}>
                        <QuestionForm question={question.data} />
                    </div>
                </div>
            ) : (
                <Notification classname={"information"} message={"Loading . . ."} />
            )}
        </HeaderAdmin>
    )
}