import React from "react";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import { Link } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";

export default function QuizCreate() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-palette-four"} to={"/admin/quiz"}>Return</Link>

            <div className={"mt-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Question</label>
                    </div>
                    <div className={"-content"}>
                        <QuestionForm />
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}