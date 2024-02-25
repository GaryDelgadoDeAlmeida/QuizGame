import React, { useEffect } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import { Link, Navigate, useParams } from "react-router-dom";
import PrivateResources from "../../components/utils/PrivateRessource";
import WidgetCard from "../../components/parts/WidgetCard";

export default function HistoryDetail() {

    const { gameID } = useParams()
    if(isNaN(gameID)) {
        return <Navigate to={"/user/game-history"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/game/${gameID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <Link className={"btn btn-blue"} to={"/user/game-history"}>Return</Link>

                {!loading && Object.keys(items.results ?? []).length > 0 && (
                    <>
                        <div className={"mt-25"}>
                            <div className={"d-grid -col-4 -t-col-2 -col-1"}>
                                <WidgetCard number={items.results.goodAnswers} category={"Bonnes réponses"} />
                                <WidgetCard number={items.results.badAnswers} category={"Mauvaises réponses"} />
                                <WidgetCard number={items.results.game.gameDetails.length} category={"Questions répondues"} />
                                <WidgetCard number={items.results.game.score} category={"Scores"} />
                            </div>
                        </div>

                        <div className={"mt-25"}>
                            {Object.values(items.results.game.gameDetails).map((item, index) => (
                                <div key={index} className={"question-card"}>
                                    {console.log(item)}
                                    <div className={"question"}>
                                        <span>{item.givenQuestion.question}</span>
                                    </div>
                                    <div className={"answers"}>
                                        {item.givenQuestion.answers.map((answer, j) => (
                                            <li 
                                                key={j} 
                                                className={`${item.givenAnswer.answer == answer.answer && answer.isAnswer ? "-green" : "-red"}`}
                                            >{answer.answer} {item.givenAnswer.answer == answer.answer ? "(Given answer)" : null}</li>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </HeaderUser>
    )
}