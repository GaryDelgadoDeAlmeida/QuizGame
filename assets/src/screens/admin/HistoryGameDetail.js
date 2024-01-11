import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PrivateResources from "../../components/utils/PrivateRessource";
import HeaderAdmin from "../../components/parts/HeaderAdmin";

export default function HistoryGameDetail() {
    const { gameID } = useParams()
    if(isNaN(gameID)) {
        return <Navigate to={"/admin/history-games"} />
    }

    const { loading, items: game, load, error } = PrivateResources(`${window.location.origin}/api/game/${gameID}`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            <div className={"d-column"}>
                {!loading ? (
                    Object.keys(game.data ?? []).length > 0 ? (
                        Object.values(game.data.gameDetails).map((game_detail, index) => (
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <div className={"-question"}>{game_detail.given_question.question}</div>
                                    <div className={"-difficulty"}>{game_detail.given_question.difficulty}</div>
                                    <div className={"-answer"}>{game_detail.given_answer.label} ({game_detail.is_answer ? "Correct" : "Incorrect"})</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Navigate to={"/admin/history-games"} />
                    )
                ) : (
                    <p>Loading ...</p>
                )}
            </div>
        </HeaderAdmin>
    )
}